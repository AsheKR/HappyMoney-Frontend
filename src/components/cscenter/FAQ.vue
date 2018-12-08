<template>
  <div class="faq">
    <div class="top10faq">
      <div class="top10faq__ordering">
        <span class="csTop10Icon"></span>
        <span>자주 묻는 질문</span>
        <span>TOP 10</span>
        <div class="top10faq__ordering--order">
          <div @click="getAPITop10FAQCategoryLists('-view', 1)" :class="{ active: checkTop10FAQOrdering(1)}"> <span>조회순</span> <span class="joinStoreSearch csIconDownSmallArrow"></span></div>
          <div @click="getAPITop10FAQCategoryLists('-id', 2)" :class="{ active: checkTop10FAQOrdering(2)}"> <span>등록순</span> <span class="joinStoreSearch csIconDownSmallArrow"></span></div>
        </div>
      </div>
      <div class="top10faq_list">
        <div class="top10faq__item" v-for="item in top10faq" :key="item.id" @click="clickContent(item.id)" :class="{ active: nowActive == item.id }">
          <div class="top10faq__item--cate">
            <span>{{ item.category.name }}</span>
          </div>
          <div class="top10faq__item--title">
            <span class="csIcon csIconQuestion"></span>
            <span>{{ item.title }}</span>
            <span class="csIcon csIconDownArrow"></span>
          </div>
          <div class="top10faq__item--contentWrap">
            <transition name="contentFade">
              <div class="top10faq__item--content" v-if="nowActive == item.id">
                <span class="csIcon csIconAnswer"></span>
                <span v-html="item.content"></span>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="faqcategory">

    </div>
    <div class="faqlist">

    </div>
  </div>
</template>

<script>
  export default {
    props: ['hostname'],
    data() {
      return {
        top10faq: undefined,
        top10OrderingActive: 0,
        nowActive: 0,
      }
    },
    methods: {
      clickContent(itemId) {
        if (this.nowActive == itemId) {
          this.nowActive = -1;
        } else {
          this.nowActive = itemId;
        }
      },
      getAPIFAQCategoryLists(cate, ordering, page) {
        const url = this.hostname + '/apis/posts/faq/?ordering='+ordering;
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
            console.log(error);
          });
      },
      getAPITop10FAQCategoryLists(ordering, view) {
        const url = this.hostname + '/apis/posts/faq/?ordering='+ordering+'&page_size=10';

        this.top10OrderingActive = view;

        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.top10faq = response.data.results;
            }
          },
          error => {
            console.log(error);
          });
      },
      checkTop10FAQOrdering(itemId) {
        if (this.top10OrderingActive == itemId) {
          return true;
        }
      }
    },
    created() {
      this.getAPITop10FAQCategoryLists('-view', 1);
    }
  }
</script>

<style lang="scss">

  .contentFade-enter-active, .contentFade-leave-active {
    transition: .5s;
  }

  .contentFade-enter, .contentFade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-100%);
  }

  .faq {
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    margin-bottom: 50px;

    > .top10faq {
      display: grid;
      grid-template-columns: 1fr 4fr;
      border: 1px solid #ccc;

      > .top10faq__ordering {
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 12px 0;

        > span {
          display: block;
          margin-bottom: 5px;

          &:not(.csTop10Icon) {
            font-weight: bold;
          }
        }

        > .csTop10Icon {
          margin-bottom: 10px;
        }

        > .top10faq__ordering--order {
          margin-top: 30px;
          display: flex;

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
      }

      > .top10faq_list {
        margin-left: 30px;

        > .top10faq__item {
          display: grid;
          grid-template-columns: 1fr 4fr;
          grid-template-rows: 1fr auto;
          border-bottom: 1px solid #eaeaea;
          padding: 15px 0 15px 20px;
          cursor: pointer;

          &.active {
            background-color: #f9f9f9;
          }

          > div {
            font-size: 0.75em;
            text-align: left;
          }

          > .top10faq__item--cate {

          }

          > .top10faq__item--title {
            display:grid;
            grid-template-columns: 17px auto 50px;
            align-items: center;
            font-weight: bold;

            > span.csIcon.csIconDownArrow {

            }
          }

          > .top10faq__item--contentWrap {
            grid-column: 2 / 3;
            overflow: hidden;

            > .top10faq__item--content {
              display: grid;
              grid-template-columns: 17px auto 50px;
              align-items: baseline;
            }
          }
        }

      }

    }
  }

</style>
