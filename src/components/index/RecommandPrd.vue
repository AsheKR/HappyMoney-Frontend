<template>
  <div id="recommandPrd">
    <h2>추천 제휴 상품</h2>
    <div class="recommandPrdList" v-if="show">
      <div v-for="prd in prdLimit" :key="prd.id" class="prdWrap">
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
        return this.prdList.slice(0, 6);
      },
    },
    created() {
      const url = this.hostname + '/apis/giftcards/?hot=hot';
      this.$http.get(url).then(
        response => {
          if (response.status == '200') {
            this.prdList = response.data;
          }
          this.show = !this.show;
        },
        error => {
          console.log(error);
        });
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
      height: 100%;
      object-fit: cover;
    }

    > .recommandPrdList {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 0.8rem;

      .prdWrap {
        background-color: #fff;
        border: 1px solid #e3e3e3;

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

  @media only screen and (max-width: 800px) {
    .recommandPrdList {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }

</style>
