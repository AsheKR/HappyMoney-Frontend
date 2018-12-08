<template>
  <div class="nowEvent">
    <div class="nowEvent__submenu">
      <a href="#" v-for="(value, key) in eventCategory" @click.prevent="getAPIEventList(key, 1)" :class="{ active: key == nowCate }"><div><span>{{ value }}</span></div></a>
    </div>
    <div class="nowEvent__content">
      <a href="#" class="nowEvent__content__item" v-for="event in eventList" :key="event.id">
        <div class="nowEvent__content__item--img">
          <img :src="event.general_image" alt="">
        </div>
        <div class="nowEvent__content__item--desc">
          <span>{{ event.title }}</span>
          <span>{{ event.start }} ~ {{ event.end }}</span>
        </div>
        <span class="tag" :style="getTagClass(event.tag)">{{ event.tag }}</span>
      </a>
    </div>
    <div class="nowEvent__pagination">
      <a @click.prevent="getAPIEventList(nowCate, pre)" v-if="pre"><</a>
      <a @click.prevent="getAPIEventList(nowCate, page[1])" v-for="page in pageList" :class="{ active: page[2] }">
        <span v-if="page[1] == null">...</span>
        <span v-else>{{ page[1] }}</span>
      </a>
      <a @click.prevent="getAPIEventList(nowCate, next)" v-if="next">></a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['hostname'],
    data() {
      return {
        eventCategory: {
          '': '전체',
          'happy': '해피머니 이벤트',
          'join': '참여 이벤트',
          'invite': '초대 이벤트',
          'cashback': '캐시백 이벤트',
          'alliance': '제휴 이벤트',
          'entry': '응모 이벤트',
          'comment': '댓글 이벤트'
        },
        eventList: undefined,
        pageList: [],
        next: null,
        pre: null,
        nowCate: '',
      }
    },
    methods: {
      getAPIEventList(cate, page) {
        if (page == null) {
          return false;
        }

        const now_date = new Date().toISOString().slice(0,10);

        const url = this.hostname + '/apis/event/?category=' + cate+"&page="+page+"&end__gte="+now_date;
        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.eventList = response.data.results;
              if (response.data.next !== null) {
                this.next = response.data.next.split('&page=')[1];
              } else {
                this.next = null;
              }
              if (response.data.previous !== null) {
                this.pre = response.data.previous.split('&page=')[1];
                if (this.pre == null) {
                  this.pre = 1;
                }
              } else {
                this.pre = null;
              }
              this.pageList = response.data.page_links;
              this.nowCate = cate;
            }
          },
          error => {
            console.log(error);
          });
      },
      getTagClass(tag) {
        if (tag == '제휴') {
          return {
            'background-color': '#07b8c8'
          }
        } else if (tag == '증정') {
          return {
            'background-color': '#e8754c'
          }
        } else if (tag == '초대') {
          return {
            'background-color': '#0e986f'
          }
        } else if (tag == '상시') {
          return {
            'background-color': '#725699'
          }
        }
      },
    },
    created() {
      this.getAPIEventList(this.nowCate, 1);
    }
  }
</script>

<style lang="scss">
  .nowEvent {

    > .nowEvent__submenu {
      display: flex;
      justify-content: center;
      margin: 50px 0;

      > a {
        padding: 10px 20px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;

        &.active {
          border-bottom: 2px solid #f15922;
          color: #f15922;
        }

        span {
          font-size: 0.8em;
          font-weight: bold;
        }
      }
    }

    > .nowEvent__content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-gap: 10px;

      > a.nowEvent__content__item {
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        > .nowEvent__content__item--desc {
          border-bottom: 1px solid #ddd;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
          padding: 10px 0;
          background-color: #f9f9f9;

          > span {
            text-align: left;
            display: block;
            font-size: 0.8em;
            padding: 5px 0 5px 20px;

            &:first-child {
              font-size: 0.9em;
              font-weight: bold;
            }
          }
        }

        > .tag {
          position: absolute;
          top: 0;
          left: 0;

          padding: 7px 10px;
          color: white;
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
</style>
