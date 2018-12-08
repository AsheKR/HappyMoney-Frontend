<template>
  <div class="preEvent">
    <div class="preEvent__searchForm">
      <div class="preEvent__searchForm--title">
        <span>종료된 이벤트 총<strong>{{ count }}</strong>건</span>
      </div>
      <div class="preEvent__searchForm--form">
        <span>
          <span class="preEvent__searchForm--form--inputbox"><input type="text" v-model="vsearchItem" placeholder="검색어를 입력하세요"></span>
          <span class="preEvent__searchForm--form--button" @click="setSearchItem()">조회</span>
        </span>
      </div>
    </div>
    <div class="preEvent__contentWrap">
      <div class="preEvent__content preEvent__content--desc">
        <div class="preEvent__content--numbering">
          <span> <strong>번호</strong> </span>
        </div>
        <div class="preEvent__content--title">
          <span> <strong>제목</strong> </span>
        </div>
        <div class="preEvent__content--date">
          <span> <strong>기간</strong> </span>
        </div>
      </div>
      <div class="preEvent__content" v-for="event in eventList" :key="event.id">
        <div class="preEvent__content--numbering">
          <span>{{ event.id }}</span>
        </div>
        <div class="preEvent__content--title">
          <span>{{ event.title }}</span>
        </div>
        <div class="preEvent__content--date">
          <span>{{ event.start }} ~ {{ event.end }}</span>
        </div>
      </div>
    </div>
    <div class="nowEvent__pagination">
      <a @click.prevent="getAPIEventList(pre)" v-if="pre"><</a>
      <a @click.prevent="getAPIEventList(page[1])" v-for="page in pageList" :class="{ active: page[2] }">
        <span v-if="page[1] == null">...</span>
        <span v-else>{{ page[1] }}</span>
      </a>
      <a @click.prevent="getAPIEventList(next)" v-if="next">></a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['hostname', ],
    data() {
      return {
        vsearchItem: '',
        searchItem: '',
        count: 0,
        eventList: undefined,
        pageList: [],
        next: null,
        pre: null,
      }
    },
    methods: {
      getAPIEventList(page) {
        const now_date = new Date().toISOString().slice(0,10);

        const url = this.hostname + '/apis/event/?&page='+page+"&end__gte="+now_date+'&title__contains='+this.searchItem;
        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              console.log(response.data);
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
              this.count = response.data.count;
            }
          },
          error => {
            console.log(error);
          });
      },
      setSearchItem() {
        this.searchItem = this.vsearchItem;
        this.getAPIEventList(1);
      }
    },
    created() {
      this.getAPIEventList(1, '');
    }
  }
</script>

<style lang="scss">

  .preEvent {
    margin-top: 25px;

    > .preEvent__searchForm {
      border: 1px solid #ddd;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      padding: 30px;
      margin-bottom: 30px;

      > .preEvent__searchForm--title {
        font-weight: bold;

        strong {
          color: #f35923;
        }
      }

      > .preEvent__searchForm--form {
        margin-left: auto;

        > span {
          display: grid;
          grid-template-columns: 3fr 1fr;
          align-items: center;

          > .preEvent__searchForm--form--inputbox {
            height: 100%;
            background-color: white;
            border: 1px solid black;
            text-align: left;
            display: flex;
            padding-left: 20px;

            > input {
              border: none;
            }
          }

          > .preEvent__searchForm--form--button {
            padding: 12px 35px;
            border: 1px solid #454545;
            background-color: #4f4f4f;
            color: #fff;
          }
        }
      }
    }

    > .preEvent__contentWrap {
      display: grid;

      > .preEvent__content {
        display: grid;
        grid-template-columns: 1.5fr 8fr 3fr;
        border-bottom: 1px solid #eee;
        align-items: center;

        > div {
          padding: 10px 0;
          font-size: 0.9em;
          color: #666;
        }

        &:first-child {
          border-top: 1px solid black;
          background-color: #f5f5f5;

          > div {
            color: black !important;
            text-align: center;
          }
        }

        > .preEvent__content--numbering {

        }

        > .preEvent__content--title {
          text-align: left;
          padding-left: 30px;
        }

        > .preEvent__content--date {

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
