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
      <div class="faqcategory__form">
        <div class="faqcategory__form--title">FAQ빠른검색</div>
        <div class="faqcategory__form--form">
          <span>
            <span class="faqcategory__form--form--inputbox"><input type="text" v-model="vsearchItem" placeholder="검색어를 입력하세요"></span>
            <span class="faqcategory__form--form--button" @click="clickFilteringFAQCategory()">조회</span>
          </span>
        </div>
        <div class="faqcategory__keyword">
          <span class="title">키워드</span>
          <span>결제 비밀번호</span>
          <span>온라인상품권 교환쿠폰</span>
          <span>상품권 유효기간</span>
          <span>결제실패</span>
          <span>아이디/비밀번호</span>
        </div>
      </div>
      <div class="faqcategory__list">
        <div class="faqcategory__list--title">
          <span>카테고리</span>
          <span class="csFAQCategoryListIcon"></span>
        </div>
        <div class="faqcategory__list--items">
          <span class="faqcategory__list--item">
            <input type="checkbox" id="faqcategory_all" v-model="faqcheckedSubCategoryAll">
            <label for="faqcategory_all">전체</label>
          </span>
          <span class="faqcategory__list--item" v-for="(cate, index) in faqSubCategory" :key="cate.name">
            <input type="checkbox" :id="'faqcategory_'+index" :checked="cate.sub_category.find(subCategory => subCategory.checked)" @click="clickParentFAQSubCategory(cate)">
            <label :for="'faqcategory_'+index">{{ cate.name }}</label>
            <span class="csIcon csIconCategoryArrowDown" @click="cate.show = !cate.show"></span>
            <div class="faqcategory__list__subListWrap" v-show="cate.show" :class="{ active: cate.show }">
              <div class="faqcategory__list__subList">
                <p class="faqcategory__list__subList--title">{{ cate.name }}</p>
                <span class="faqcategory__list__subItem" v-for="subcate in cate.sub_category" :key="subcate.id">
                  <input type="checkbox" :id="'faqcategory_sub_'+subcate.id" :value="subcate.name" v-model="subcate.checked">
                  <label :for="'faqcategory_sub_'+subcate.id">{{ subcate.name }}</label>
                </span>
                <span class="csIconCategoryClose" @click="cate.show = !cate.show"></span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="faqList">
      <div class="faqListOrdering">
        <div @click="clickOrderingFAQCategory('-view', 1)" :class="{ active: checkFAQOrdering(1)}"> <span>조회순</span> <span class="joinStoreSearch csIconDownSmallArrow"></span></div>
        <div @click="clickOrderingFAQCategory('-id', 2)" :class="{ active: checkFAQOrdering(2)}"> <span>등록순</span> <span class="joinStoreSearch csIconDownSmallArrow"></span></div>
      </div>
      <div class="faqList_list">
        <div class="faqList__item" v-for="item in faqList" :key="item.id" @click="clickContent(item.id)" :class="{ active: nowActive == item.id }">
          <div class="faqList__item--cate">
            <span>{{ item.category.name }}</span>
          </div>
          <div class="faqList__item--title">
            <span class="csIcon csIconQuestion"></span>
            <span>{{ item.title }}</span>
            <span class="csIcon csIconDownArrow"></span>
          </div>
          <div class="faqList__item--contentWrap">
            <transition name="contentFade">
              <div class="faqList__item--content" v-if="nowActive == item.id">
                <span class="csIcon csIconAnswer"></span>
                <span v-html="item.content"></span>
              </div>
            </transition>
          </div>
        </div>
      </div>
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
        ordering: '-view',

        faqSubCategory: [],
        faqcheckedSubCategoryAll: true,

        vsearchItem: '',
        searchItem: '',

        faqList: [],
        FAQOrdering: 1,
      }
    },
    watch: {
      faqcheckedSubCategoryAll: function() {
        var checkAllOrNot = false;
        if (this.faqcheckedSubCategoryAll == true) {
          checkAllOrNot = true;
        }

        this.faqSubCategory.forEach(mainCategory => {
          mainCategory.checked = checkAllOrNot;

          mainCategory.sub_category.forEach(subCategory => {
            subCategory.checked = checkAllOrNot;
          })
        })
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

      getAPIFAQCategoryLists(page) {
        var category__names = encodeURIComponent(this.faqSubCategory.map((mainCategory) => {
          return mainCategory.sub_category.map((subCategory) => {
            if (subCategory.checked == true) {
              return subCategory.name;
            }
          }).join(",")
        }).join(","));

        const url = this.hostname + '/apis/posts/faq/?ordering='+this.ordering
              +'&contain_contents='+this.searchItem
              +'&category__names='+category__names+'&page='+page;

        console.log(url);

        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.faqList = response.data.results;
            }
          },
          error => {
            console.log(error);
          });
      },
      clickFilteringFAQCategory() {
        this.searchItem = encodeURIComponent(this.vsearchItem);
        this.getAPIFAQCategoryLists(1);
      },
      clickOrderingFAQCategory(ordering, view) {
        this.ordering = ordering;
        this.FAQOrdering = view;
        this.getAPIFAQCategoryLists(1);
      },
      checkFAQOrdering(itemId) {
        if (this.FAQOrdering == itemId) {
          return true;
        }
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
      },

      getAPIFAQSubCategoryLists() {
        const url = this.hostname + '/apis/posts/faq-category/';

        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.faqSubCategory = response.data;
              this.faqSubCategory.forEach(mainCategory => {
                this.$set(mainCategory, 'checked', true);
                this.$set(mainCategory, 'show', false);

                mainCategory.sub_category.forEach(subCategory => {
                  this.$set(subCategory, 'checked', true);
                })
              })
            }
          },
          error => {
            console.log(error);
          });
      },
      clickParentFAQSubCategory(mainCategory) {
        if (mainCategory.sub_category.find(subCategory => subCategory.checked)) {
          mainCategory.sub_category.forEach(subCategory => subCategory.checked = false);
        } else {
          mainCategory.sub_category.forEach(subCategory => subCategory.checked = true);
        }
      }
    },
    created() {
      this.getAPITop10FAQCategoryLists('-view', 1);
      this.getAPIFAQSubCategoryLists();
      this.getAPIFAQCategoryLists(1);
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
    flex-direction: column;
    width: 1200px;
    margin-bottom: 50px;

    > .top10faq {
      display: grid;
      grid-template-columns: 1fr 4fr;
      border: 1px solid #ccc;
      margin-bottom: 40px;

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

    > .faqcategory {

      > .faqcategory__form {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: auto auto;
        align-items: center;
        border: 1px solid #ddd;
        background-color: #eee;
        padding: 20px 0;

        > .faqcategory__form--title {
          grid-column: 1 / 3;
          justify-self: end;
          font-size: 1.2em;
          font-weight: bold;
          padding-right: 30px;
        }

        > .faqcategory__form--form {
          grid-column: 3 / -1;
          justify-self: start;

          > span {
            display: grid;
            grid-template-columns: 5fr 1fr;
            align-items: center;

            > .faqcategory__form--form--inputbox {
              height: 100%;
              background-color: white;
              border: 1px solid black;
              text-align: left;
              display: flex;
              padding-left: 20px;

              > input {
                border: none;
                width: 100%;
              }
            }

            > .faqcategory__form--form--button {
              padding: 12px 35px;
              border: 1px solid #454545;
              background-color: #4f4f4f;
              color: #fff;
              cursor: pointer;
            }
          }
        }

        > .faqcategory__keyword {
          grid-column: 3 / -1;
          justify-self: start;
          margin-top: 10px;

          > span {
            font-size: 0.85em;
            color: #666;
            padding: 0 10px;
            border-right: 1px solid #ccc;

            &:last-child {
              border-right: none;
            }
          }

          > span.title {
            font-weight: bold;
            color: black;
            padding: 0 10px 0 0;
            border-right: none;
          }
        }
      }

      > .faqcategory__list {
        display: grid;
        grid-template-columns: repeat(7, 1fr);

        > .faqcategory__list--title {
          justify-self: center;
          align-self: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border: 1px solid #ccc;
          border-top: none;
          padding-bottom: 20px;

          > span {
            font-weight: bold;
            font-size: 1.2em;
          }
        }

        > .faqcategory__list--items {
          grid-column: 2 / 8;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 10px;
          font-size: 0.85em;
          text-align: left;
          grid-row-gap: 15px;
          padding-bottom: 20px;
          padding-top: 20px;
          border-right: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          position: relative;

          > .faqcategory__list--item {
            display: grid;
            grid-template-columns: 30px auto auto;
            align-items: center;

            > span.csIcon.csIconCategoryArrowDown {
              cursor: pointer;
            }

            > .faqcategory__list__subListWrap {
              position: relative;
              grid-column: 1 / 4;
              > .faqcategory__list__subList {
                position: absolute;
                display: flex;
                flex-direction: column;
                background-color: white;
                top: -20px;
                width: 100%;

                border: 1px solid black;
                padding: 10px;

                > p.faqcategory__list__subList--title {
                  padding-bottom: 10px;
                  margin: 0;
                  font-weight: bold;
                  border-bottom: 1px solid #ccc;
                }

                > span.csIconCategoryClose {
                  cursor: pointer;
                  position: absolute;
                  top: 15px;
                  right: 15px;
                }

                > .faqcategory__list__subItem {
                  padding: 10px 0;
                }
              }
            }
          }
        }

      }

    }

    > .faqList {

      > .faqListOrdering {
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

      > .faqList_list {
        margin-top: 20px;
        border-top: 1.2px solid black;

        > .faqList__item {
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

          > .faqList__item--cate {

          }

          > .faqList__item--title {
            display:grid;
            grid-template-columns: 17px auto 50px;
            align-items: center;
            font-weight: bold;

            > span.csIcon.csIconDownArrow {

            }
          }

          > .faqList__item--contentWrap {
            grid-column: 2 / 3;
            overflow: hidden;

            > .faqList__item--content {
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
