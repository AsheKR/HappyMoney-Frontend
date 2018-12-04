<template>
  <div class="categoryFilter">
    <div class="categoryFilterWrap" :style="{ 'background-image': 'url('+require('@/assets/css/images/joinStore/bgSeachBox.png')+')' }">

      <div class="categoryForm">
        <div class="cateogryFilter_name">
          <p><span class="joinStoreSearch icoSearch search_1"> <p>카테고리</p> </span></p>
        </div>
        <div class="categories">
          <span>
            <input type="checkbox" name="" value="" checked> 전체
          </span>
          <span v-for="category in categories" :key="category.id">
            <input type="checkbox" :name="category.id" checked> {{ category.name }}
          </span>
        </div>
        <div class="JoinStoreFilter_name">
          <p><span class="joinStoreSearch icoSearch search_4"> <p>사용처명</p> </span></p>
        </div>
        <div class="joinStoreFilter_input">
          <span>
            <input type="text" name="" value="" placeholder="온라인 사용처를 조회해 보세요.">
          </span>
        </div>
        <div class="joinStoreFilter_rank">
          <span class="joinStoreSearch icoSearch tickerWrap"></span>
          <span class="joinStoreRank">
            <transition :name="transitionName" mode="out-in">
              <div class="joinStoreRankWrap" :key="current" v-if="show">
                <span class="num_font">{{ current+1 }}</span>
                <span class="joinStoreRank_title">{{ topFive[current].name }}</span>
              </div>
            </transition>
          </span>
        </div>
      </div>

      <div class="joinStroeFilter_input_desc">
        <p>※ 일부 사용처의 경우 수수료가 부과될 수 있습니다.</p>
      </div>
      <div class="buttonWrap">
        <button type="button" name="button">
          <span class="joinStoreSearch icoSearch btnSubmit"></span>
          <span>조회</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['hostname'],
    data() {
      return {
        current: 0,
        transitionName: "fade",

        topFive: undefined,
        categories: undefined,
        onlinJoinStore: undefined,
        show: false
      }
    },
    methods: {
      getAPIUsePointCategoryLists() {
        const url = this.hostname + '/apis/use-point/category';
        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.categories = response.data;
            }
          },
          error => {
            console.log(error);
          });
      },
      getAPIUsePointCategoryTopFiveLists() {
        const url = this.hostname + '/apis/use-point/?point=online&ordering=-like_users_count&page_size=5';
        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.topFive = response.data.results;
              this.show = !this.show;
            }
          },
          error => {
            console.log(error);
          });
      },
      slide(dir) {
        this.direction = dir;
        dir === 1
          ? (this.transitionName = "slide-next")
          : (this.transitionName = "slide-prev");
        var len = this.topFive.length;
        this.current = (this.current + dir % len + len) % len;
      },
    },
    created() {
      this.getAPIUsePointCategoryLists();
      this.getAPIUsePointCategoryTopFiveLists();
      setInterval(() => {
        this.slide(1);
      }, 1000)
    }
  }
</script>

<style lang="scss">
  /* FADE IN */
  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-enter {
    opacity: 0;
  }

  /* GO TO NEXT SLIDE */
  .slide-next-enter-active,
  .slide-next-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .slide-next-enter {
    transform: translateY(100%);
  }
  .slide-next-leave-to {
    transform: translateY(-100%);
  }

  /* GO TO PREVIOUS SLIDE */
  .slide-prev-enter-active,
  .slide-prev-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  .slide-prev-enter {
    transform: translateY(-100%);
  }
  .slide-prev-leave-to {
    transform: translateY(100%);
  }

  .num_font {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #fec524;
    color: #675b52;
    font-weight: bold;
    text-align: center;
    font-size: 0.9em;
  }

  .categoryFilter {
    background-color: #685a50;
    color: white;

    > .categoryFilterWrap {
      min-height: 280px;
      background: 100% 100% no-repeat;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > .categoryForm {
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        > .cateogryFilter_name {
          grid-row: 1;
          grid-column: 1;

          > p {
            > span {
              > p {
                margin: 0;
              }
            }
          }
        }

        > .categories {
          grid-row: 1;
          grid-column: 2 / 5;
          align-self: center;
          text-align: left;
        }

        > .JoinStoreFilter_name {
          grid-row: 2;
          grid-column: 1;

          > p {
            > span {
              > p {
                margin: 0;
              }
            }
          }
        }

        > .joinStoreFilter_input {
          grid-row: 2;
          grid-column: 2 / 4;
          align-self: center;
          text-align: left;

          > span {
            display: block;
            width: 100%;
            background-color: white;
            padding: 7px;
            text-align: left;
            vertical-align: middle;

            > input {
              border: none;
              width: 100%;
            }
          }
        }

        > .joinStoreFilter_rank {
          grid-row: 2;
          grid-column: 4 / 5;
          align-self: center;
          display: grid;
          grid-template-columns: 1fr 2fr;

          > span.tickerWrap {
            align-self: center;
            justify-self: center;
          }

          > span.joinStoreRank {
            overflow: hidden;

            > div.joinStoreRankWrap {
              display: flex;
              justify-content: center;
              align-items: center;

              > span.num_font {
                margin-right: auto;
              }
              > span.joinStoreRank_title {
                display: inline-block;
              }
            }
          }
        }
      }

      > .joinStroeFilter_input_desc {
        font-size: 0.7em;
      }

      > .buttonWrap {

        > button {
          border: 1px solid #d54e1f;
          background-color: #f35923;
          color: white;
          text-align: center;
          font-weight: bold;

          padding: 10px 30px;
        }
      }
    }
  }
</style>
