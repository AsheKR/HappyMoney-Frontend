<template>
  <div class="csCenterNotice">
    <div class="csCenterNotice__category" v-show="show">
      <a :style="activeCSS('')" @click.prevent="clickCategory('')">
        <div class="csCenterNotice__menu" :class="{ active: nowCategory == '' }">
          <span>전체</span>
        </div>
      </a>
      <slot v-for="category in notice_categoryList">
        <a :key="category.id" :style="activeCSS(category.name)" @click.prevent="clickCategory(category.name)">
          <div class="csCenterNotice__menu" :class="{ active: nowCategory == category.name }">
            <span>{{ category.name }}</span>
          </div>
        </a>
    </slot>
    </div>
    <div class="csCenterNotice">
      <div class="csCenterNoticeOrdering">
        <div @click="ordering='-view'"> <span>조회순</span> <span class="joinStoreSearch csIconDownSmallArrow"></span></div>
        <div @click="ordering='id'"> <span>등록순</span> <span class="joinStoreSearch csIconDownSmallArrow"></span></div>
      </div>
      <div class="csCenterNotice__contentWrap">
        <div class="csCenterNotice__content csCenterNotice__content--desc">
          <div class="csCenterNotice__content--numbering">
            <span> <strong>번호</strong> </span>
          </div>
          <div class="csCenterNotice__content--cate">
            <span> <strong>구분</strong> </span>
          </div>
          <div class="csCenterNotice__content--title">
            <span> <strong>제목</strong> </span>
          </div>
          <div class="csCenterNotice__content--date">
            <span> <strong>등록일</strong> </span>
          </div>
          <div class="csCenterNotice__content--date">
            <span> <strong>조회수</strong> </span>
          </div>
          <div class="csCenterNotice__content--show">
            <span> <strong></strong> </span>
          </div>
        </div>
        <div class="csCenterNotice__content" v-for="notice in noticeList" :key="notice.id" @click="clickContent(notice.id)">
          <div class="csCenterNotice__content--numbering">
            <span> {{ notice.id }} </span>
          </div>
          <div class="csCenterNotice__content--cate">
            <span> {{ notice.category.name }} </span>
          </div>
          <div class="csCenterNotice__content--title">
            <span> <strong>{{ notice.title }}</strong> </span>
          </div>
          <div class="csCenterNotice__content--date">
            <span>{{ notice.created_at }} </span>
          </div>
          <div class="csCenterNotice__content--date">
            <span>{{ notice.view }}</span>
          </div>
          <div class="csCenterNotice__content--show">
            <span> <span class="csIcon csIconDownArrow"></span> </span>
          </div>
          <div class="csCenterNotice--contentWrap">
            <transition name="contentFade">
              <div class="csCenterNotice--content" v-if="notice_now_active == notice.id">
                <span v-html="notice.content"></span>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="nowEvent__pagination">
        <a @click.prevent="getAPINoticeList(pre, nowCategory)" v-if="pre"><</a>
        <a @click.prevent="getAPINoticeList(page[1], nowCategory)" v-for="page in pageList" :class="{ active: page[2] }">
          <span v-if="page[1] == null">...</span>
          <span v-else>{{ page[1] }}</span>
        </a>
        <a @click.prevent="getAPINoticeList(next, nowCategory)" v-if="next">></a>
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
        show: false,

        nowCategory: '',

        searchItem: '',
        ordering: 'id',

        notice_categoryList: [],
        noticeList: [],
        notice_now_active: 0,

        pageList: [],
        next: null,
        pre: null,
      }
    },
    watch: {
      ordering: function() {
        this.getAPINoticeList(1, this.nowCategory);
      },
      nowCategory: function() {
        this.getAPINoticeList(1, this.nowCategory);
      },
      searchItem: function() {
        this.getAPINoticeList(1, this.nowCategory);
      }
    },
    methods: {
      getAPINoticeCategoryList() {
        const url = this.hostname + '/apis/posts/notice-category/';

        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.notice_categoryList = response.data;
            }
          },
          error => {
            
          });
      },

      clickContent(itemId) {
        if (this.notice_now_active == itemId) {
          this.notice_now_active = -1;
        } else {
          this.notice_now_active = itemId;
        }
      },
      clickCategory(itemName) {
        this.nowCategory = itemName;
      },
      getAPINoticeList(page, category) {
        const url = this.hostname + '/apis/posts/notice/?&page='+page+'&contain_contents='+this.searchItem+'&category__names='+category+'&ordering='+this.ordering;
        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.noticeList = response.data.results;
              if (response.data.next !== null) {
                this.next = response.data.next.split('&page=')[1].slice(0, 1);
              } else {
                this.next = null;
              }
              if (response.data.previous !== null) {
                this.pre = response.data.previous.split('&page=')[1];
                if (this.pre == null) {
                  this.pre = 1;
                } else {
                  this.pre = this.pre.slice(0, 1);
                }
              } else {
                this.pre = null;
              }
              this.pageList = response.data.page_links;
              this.count = response.data.count;
            }
          },
          error => {
            ;
          });
      },
      getAllCategory() {
        var category__names = encodeURIComponent(this.notice_categoryList.map((category) => {
          return category.name
        }).join(","));

        return category__names;
      },
      activeCSS(now) {
        const activeStyle = {
          'background': '50% 100% no-repeat',
          'background-image': 'url('+require('@/assets/css/images/event/bgTab.png')+')',
          'padding-bottom': '5px'
        }

        if (now == this.nowCategory) {
          return activeStyle;
        }
      }
    },
    created() {
      this.getAPINoticeCategoryList();
      this.show = true;
      EventBus.$on('CSCenterSearch', (vsearchItem) => {
        this.searchItem = vsearchItem;
      })
      if (this.$route.params.id) {
        this.notice_now_active = this.$route.params.id;
      }
    },
    mounted() {
      this.getAPINoticeList(1, this.getAllCategory());
    }
  }
</script>

<style lang="scss">

  .csCenterNotice {
    max-width: 1200px;

    > .csCenterNotice__category {
      display: grid;
      grid-template-columns: repeat(5, 1fr);

      > a {
        cursor: pointer;

        > .csCenterNotice__menu {
          border: 1px solid #e6e6e6;
          background-color: #f5f5f5;
          font-size: 14px;
          font-weight: bold;
          color: #666;
          padding: 10px 0;

          &.active {
            border: 1px solid #4a4a4a;
            background-color: #555;
            font-weight: bold;
            color: #fff;
          }
        }
      }
    }

    > .csCenterNotice {

      > .csCenterNoticeOrdering {
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;

        > div {
          display: inline-block;
          border: 1px solid #ccc;
          background-color: white;
          font-size: 0.9em;
          padding: 5px 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;

          font-size: 0.8em;
          color: #666;

          &.active {
            border: 1px solid #454545;
            background-color: #4f4f4f;
            color: #fff;
          }

          > span:last-child {
            margin-left: 15px;
          }
        }
      }

      > .csCenterNotice__contentWrap {
        display: grid;

        > .csCenterNotice__content {
          display: grid;
          grid-template-columns: 1fr 1fr 4fr 1fr 1fr 1fr;
          grid-template-rows: auto auto;
          border-bottom: 1px solid #eee;
          align-items: center;
          cursor: pointer;

          &.csCenterNotice__content--desc {
            cursor: default;
          }

          > div {
            padding: 15px 0;
            font-size: 0.9em;

            &.csCenterNotice--contentWrap {
              padding: 0;
            }
          }

          &:first-child {
            border-top: 1px solid black;

            > div {
              color: black !important;
              text-align: center;
            }
          }

          > .csCenterNotice__content--numbering {

          }

          > .csCenterNotice__content--title {
            text-align: left;
            padding-left: 30px;
          }

          > .csCenterNotice__content--date {

          }

          > .csCenterNotice--contentWrap {
            grid-column: 3 / 4;
            overflow: hidden;

            > .csCenterNotice--content {
              display: grid;
              align-items: baseline;
              text-align: left;
            }
          }
        }
      }

      > .nowEvent__pagination {
        margin-top: 50px;

        > a {
          display: inline-block;
          padding: 7px 11px;
          background-color: white;
          border: 1px solid #ccc;
          cursor: pointer;

          &.active {
            background-color: black;
            color: white;
            border: 1px solid black;
          }
        }
      }

    }

  }

</style>
