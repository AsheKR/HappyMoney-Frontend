<template>
  <div class="categoryFilter">
    <div class="categoryFilterWrap" :style="{ 'background-image': 'url('+require('@/assets/css/images/joinStore/bgSeachBox.png')+')' }">

      <div class="categoryForm">
        <div class="cateogryFilter_name">
          <p><span class="joinStoreSearch icoSearch search_1"> <p>카테고리</p> </span></p>
        </div>
        <div class="categories">
          <span>
            <input type="checkbox" id="joinStoreSearchall" @click="filterAllCategory()" v-model="joinStoreFilterAll">
            <label for="joinStoreSearchall">전체</label>
          </span>
          <span v-for="category in categories" :key="category.id">
            <input type="checkbox" :id="'joinStoreFilter_'+category.id" :value="category.name" v-model="checkedCategory">
            <label :for="'joinStoreFilter_'+category.id">{{ category.name }}</label>
          </span>
        </div>
        <div class="JoinStoreFilter_name">
          <p><span class="joinStoreSearch icoSearch search_4"> <p>사용처명</p> </span></p>
        </div>
        <div class="joinStoreFilter_input">
          <span>
            <input type="text" v-model="joinStoreSearchInput" placeholder="온라인 사용처를 조회해 보세요.">
          </span>
        </div>
        <div class="joinStoreFilter_rank">
          <span class="joinStoreSearch icoSearch tickerWrap"></span>
          <span class="joinStoreRank">
            <transition :name="transitionName" mode="out-in">
              <div class="joinStoreRankWrap" :key="current" v-if="show" @click="routeNextPage()">
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
      <div class="buttonWrap" @click="clickJoinFilterSearch()">
        <button type="button" name="button">
          <span class="joinStoreSearch icoSearch btnSubmit"></span>
          <span>조회</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '../common/EventBus.js';

  export default {
    props: ['hostname'],
    data() {
      return {
        current: 0,
        transitionName: "fade",

        joinStoreFilterAll: true,
        checkedCategory: [],
        joinStoreSearchInput: '롯데',

        topFive: undefined,
        categories: undefined,
        show: false,

        online: true,
      }
    },
    watch: {
      '$route.path': function() {
        const is_online = this.$route.fullPath.split('/')[2].split('Store')[0]
        if (is_online !== 'online') {
          this.online = false
        }else if (is_online !== 'offline') {
          this.online = true
        }

        this.checkedCategory = [];
        this.getAPIUsePointCategoryLists();
        this.getAPIUsePointCategoryTopFiveLists();
      },
    },
    methods: {
      getAPIUsePointCategoryLists() {
        const url = this.hostname + '/apis/use-point/category/?usepoint__is_online='+this.online;
        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.categories = response.data;
              for ( var cate in this.categories) {
                this.checkedCategory.push(this.categories[cate].name);
              }
            }
          },
          error => {
            ;
          });
      },
      getAPIUsePointCategoryTopFiveLists() {
        var online = 0;

        if (this.online === true) {
          online = 2;
        } else if (this.online === false) {
          online = 3;
        }

        const url = this.hostname + '/apis/use-point/?is_online='+online+'&ordering=-like_users_count&page_size=5'
        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.topFive = response.data.results;
              this.show = true;
            }
          },
          error => {
            ;
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
      routeNextPage() {
        if (!this.topFive[this.current].site) {
          // Detail 페이지로 이동
        }else {
          window.location = this.topFive[this.current].site;
        }
      },
      filterAllCategory() {
        this.joinStoreFilterAll = !this.joinStoreFilterAll;
        if (this.joinStoreFilterAll === true) {
          for ( var cate in this.categories) {
            this.checkedCategory.push(this.categories[cate].name);
          }
        } else {
          this.checkedCategory = [];
        }
      },
      clickJoinFilterSearch() {
        var category = this.checkedCategory;
        EventBus.$emit('joinStoreFilterSearch', { category: this.checkedCategory, name: this.joinStoreSearchInput });
      }
    },
    created() {
      const is_online = this.$route.fullPath.split('/')[2].split('Store')[0]
      if (is_online !== 'online') {
        this.online = false
      }
      this.getAPIUsePointCategoryLists();
      this.getAPIUsePointCategoryTopFiveLists();
      setInterval(() => {
        this.slide(1);
      }, 5000)
    },
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
          justify-self: start;

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

          > span {
            margin-right: 10px;
          }
        }

        > .JoinStoreFilter_name {
          grid-row: 2;
          grid-column: 1;
          justify-self: start;

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
              cursor: pointer;

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
          cursor: pointer;

          padding: 10px 30px;
        }
      }
    }
  }
</style>
