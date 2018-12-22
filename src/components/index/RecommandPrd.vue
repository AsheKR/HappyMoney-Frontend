<template>
  <div id="recommandPrd">
    <h2>추천 제휴 상품</h2>
    <div class="recommandPrdList" v-if="show">
      <div v-for="prd in prdLimit" :key="prd.id" class="prdWrap">
        <div class="prddim"></div>
        <a href="#">
          <div class="prdContentWrap">
            <img :src="prd.mall_category.shop_image" alt="">
            <span class="prdText">
              <span>판매금액</span>
              <strong><span class="prdAmount">{{ toLocalStringLocales(prd.amount) }}</span>원</strong>
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['hostname'],
    data() {
      return {
        windowWidth: 0,
        prdList: [],
        show: false
      }
    },
    methods: {
      toLocalStringLocales(value) {
        return Number(value).toLocaleString()
      }
    },
    computed: {
      prdLimit() {
        if (this.windowWidth < 800) {
          return this.prdList.slice(0, 6);
        } else {
          return this.prdList.slice(0, 5);
        }
      },
    },
    created() {
      const url = this.hostname + '/apis/giftcards/';
      this.$http.get(url).then(
        response => {
          if (response.status == '200') {
            this.prdList = response.data;
          }
          this.show = !this.show;
        },
        error => {
          
        });
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.windowWidth = window.innerWidth;
        })
      })
    }
  }
</script>

<style lang="scss">

  #recommandPrd {
    padding: 40px 0 70px;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      object-fit: cover;
    }

    > .recommandPrdList {
      display: grid;
      grid-auto-flow: column;
      cursor: pointer;
      max-width: 1200px;
      margin: auto;

      .prdWrap {
        background-color: #fff;
        border: 1px solid #e3e3e3;
        position: relative;

        &:hover {
          > .prddim {
            display: block;
          }
        }

        > .prddim {
          position: absolute;
          background-color: black;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.3;
          z-index: 1;
          display: none;
        }

        > a {
          display: block;
          height: 100%;

          > .prdContentWrap {
            display: grid;
            grid-auto-flow: row;
            height: 100%;

            .prdText {
              display: flex;
              font-size: 0.87rem;
              padding: 5px 10px;

              > span {
                margin-right: auto;
              }

              > strong {
                > .prdAmount {
                  color: red;
                }
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 800px) {
    .recommandPrdList {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }

</style>
