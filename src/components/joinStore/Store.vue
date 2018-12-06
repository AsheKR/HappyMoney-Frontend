<template lang="html">
  <div class="store">
    <CategoryFilter :hostname="hostname"/>
    <div class="storeSection">
      <div class="store_ordering">
        <div class="store_ordering_button store_ordering_recent" @click="getAPIOrderUsePointLists('-created_at', 0)" :class="{ active: now_active == 0 }">
          <p>최신순</p>
          <span class="joinStoreSearch icoSearch btnSort"></span>
        </div>
        <div class="store_ordering_button store_ordering_like" @click="getAPIOrderUsePointLists('-like_users_count', 1)" :class="{ active: now_active == 1 }">
          <p>좋아요순</p>
          <span class="joinStoreSearch icoSearch btnSort"></span>
        </div>
        <div class="store_ordering_button store_ordering_name" @click="getAPIOrderUsePointLists('name', 2)" :class="{ active: now_active == 2 }">
          <p>가나다순</p>
          <span class="joinStoreSearch icoSearch btnSort"></span>
        </div>
        <div class="store_show_1 active">
          <span class="joinStoreSearch icoSearch btnList_1 active"></span>
        </div>
      </div>
      <div class="storeItems" v-show="show">
        <div class="storeItem" v-for="store in storeList" :key="store.id">
          <span class="storeItemThumb">
            <img :src="store.shop_image" alt="" v-if="store.shop_image">
            <img src="" alt="기본" v-else>
          </span>
          <div class="storeItemInfo">
            <a href="#">{{ store.name }}</a>
            <span class="cate">{{ store.category.name }}</span>
            <button type="button" name="button" @click.prevent="createLikeUsePoint(store)" :class="{ 'like-on': store.is_liked }">
              <span class="joinStoreSearch icoSearch" :class="{ 'like': store.is_liked, 'btnLike': !store.is_liked }"></span>
              <span>{{ store.like_users_count }}</span>
            </button>
          </div>
          <!-- 사이트 없으면 디테일 페이지로 이동하게 -->
          <a :href="store.site">
            <span class="storeItemsBtn">
              <a v-if="store.site">바로가기 <span class="joinStoreSearch icoSearch btnGo"></span> </a>
              <a href="#" v-else>이용안내 <span class="joinStoreSearch icoSearch btnGo"></span> </a>
            </span>
          </a>
          <span class="joinStoreSearch icoSearch feeIcon" v-if="is_where_to_use(store.where_to_use, 'fee')"></span>
          <strong class="joinStoreSearch icoSearch storeLab" v-if="is_where_to_use(store.where_to_use)"></strong>
        </div>
      </div>
      <div class="storeMore">
        <a href="#" @click.prevent v-if="!next">( {{ fullCount }} )</a>
        <a href="#" @click.prevent="getAPIUsePointLists(next)" v-else>더보기 ( <span class="joinStoreLength">{{ storeList.length }}</span> /<strong>{{ fullCount }}</strong>개) <span class="joinStoreSearch icoSearch btnMore"></span> </a>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryFilter from './CommonCategorySearch.vue'
  import { EventBus } from '../common/EventBus.js';

  export default {
    props: ['hostname'],
    data() {
      return {
        storeList: [],
        next: '',
        fullCount: 0,
        show: false,
        online: 2,

        now_active: 1,
      }
    },
    components: {
      CategoryFilter
    },
    watch: {
      '$route.path': function() {
        this.createdMethod(true);
      },
    },
    methods: {
      getAPIUsePointLists(url) {
        const Authorization = this.$cookie.get('Authorization');
        this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
          response => {
            if (response.status == '200') {
              if ( this.storeList.length == 0 ) {
                this.storeList = response.data.results;
                this.next = response.data.next;
                this.fullCount = response.data.count;
                this.show = true;
              } else {
                this.storeList.push.apply(this.storeList, response.data.results);
                this.next = response.data.next;
              }
            }
          },
          error => {
            console.log(error);
          });
      },
      is_where_to_use(where_to_use, fee_or_import) {
        if (!where_to_use) {
          return false;
        } else {

          if (fee_or_import == 'fee') {
            if (where_to_use.is_fee) {
              return true;
            }
          } else {
            if (where_to_use.is_import_point) {
              return true;
            }
          }
        }
      },
      createdMethod(is_refresh) {
        const is_online = this.$route.fullPath.split('/')[2].split('Store')[0]

        if (is_refresh === true) {
          this.storeList.length = 0;
          this.show = false;
        }

        if (is_online === 'online') {
          this.online = 2;
        } else if (is_online === 'offline') {
          this.online = 3;
        }

        this.getAPIUsePointLists(this.hostname + '/apis/use-point/?is_online='+this.online);
      },
      getAPIOrderUsePointLists(ordering, number) {
        const Authorization = this.$cookie.get('Authorization');
        const url = this.hostname + '/apis/use-point/?is_online='+this.online + '&ordering='+ordering;

        this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
          response => {
            if (response.status == '200') {
              this.storeList = response.data.results;
              this.next = response.data.next;
              this.fullCount = response.data.count;

              this.now_active = number;
            }
          },
          error => {
            console.log(error);
          });
      },
      getAPIFilterUsePointLists(category, name) {
        const Authorization = this.$cookie.get('Authorization');
        const url = this.hostname + '/apis/use-point/?is_online='+this.online + '&category__names='+category+'&name__contains='+name;

        this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
          response => {
            if (response.status == '200') {
              this.storeList = response.data.results;
              this.next = response.data.next;
              this.fullCount = response.data.count;
            }
          },
          error => {
            console.log(error);
          });
      },
      createLikeUsePoint(usepoint){
        const Authorization = this.$cookie.get('Authorization');
        const url = this.hostname + '/apis/use-point/like/';

        const data = {
          'usepoint_pk': usepoint.id
        }

        this.$http.post(url, data, {headers: {'Authorization': Authorization}}).then(
          response => {
            if (response.status == '200') {
              usepoint.is_liked = !usepoint.is_liked
              if (response.data.status == 'created') {
                usepoint.like_users_count += 1;
              }else {
                usepoint.like_users_count -= 1;
              }
            }
          },
          error => {
            alert(error.details);
          });
      }
    },
    created() {
      this.storeList.length = 0;
      this.createdMethod(false);

      EventBus.$on('joinStoreFilterSearch', (searchKeyword) => {
        const category = searchKeyword.category.join(',');
        const name = searchKeyword.name;
        this.getAPIFilterUsePointLists(category, name);
      })
    }
  }
</script>

<style lang="scss">
  .store {
    > .storeSection {
      display: grid;
      padding-top: 50px;
      margin: 0 10px;

      > .store_ordering {
        display: grid;
        justify-self: end;
        grid-template-columns: repeat(3, 3fr) repeat(1, 1fr);
        grid-column-gap: 10px;
        margin-bottom: 30px;

        > div {
          align-self: stretch;
          border: 1px solid #ccc;
          padding: 2px 0 0;
          cursor: pointer;

          &:nth-child(4), &:nth-child(5) {
            padding: 0;
          }

          &.active {
            border: 1px solid #454545;
            background-color: #4f4f4f;

            > p {
              color: #fff;
            }
          }
        }

        p {
          display: inline-block;
          margin: 0;
          padding-right: 10px;
          color: #666;
          font-size: 0.8em;
        }
      }

      > .storeItems {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;

        > .storeItem {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-gap: 5px;
          border: 1px solid #ddd;

          > span.feeIcon {
            position: absolute;
            right: 10px;
            top: 10px;
          }

          > strong.storeLab {
            position: absolute;
          }

          > .storeItemThumb {
            padding-top: 20px;
            padding-left: 10px;
          }

          > .storeItemInfo {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-top: 20px;

            > a {
              font-weight: bold;
              font-size: 0.9em;
              margin-bottom: 5px;
            }

            > span {
              font-size: 0.7em;
              color: #888;
              margin-bottom: 10px;
            }

            > button {
              border-radius: 12px;
              border: 1px solid #ddd;
              background-color: white;
              padding: 5px 15px;
              cursor: pointer;

              &.like-on {
                border: 1px solid #d6445f;
                background-color: #f54e6d;
                color: #fff;
              }

              > span {
                margin-right: 5px;
              }
            }
          }

          img {
            border: 1px solid #ddd;
          }

          > a {
            padding: 5px 0 10px;
            border-top: 1px solid #ddd;
            grid-column: 1 / 3;
            background-color: #f8f8f8;
            > .storeItemsBtn {
              a {
                color: #666;
                font-size: 0.8em;
                font-weight: bold;
              }
            }
          }
        }
      }

      > .storeMore {
        border: 1px solid #ddd;
        margin: 20px 0;
        padding: 10px 0;

        span.joinStoreLength {
          color: #f35923;
        }

        > a {
          display: inline-block;
          height: 100%;
          font-weight: bold;
          color: #666;
        }
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    .storeItems {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
</style>
