<template>
  <div class="customerInquiry">
    <div class="inquiry" v-if="inquiry_or_list == 'inquiry'">
      <div class="title">
        <span class="csIcon inquiry"></span>
        <span>1:1 문의 작성</span>
      </div>
      <div class="content" v-if="show">
        <div class="table_wrap">
          <table>
            <tr>
              <td>이름</td>
              <td>
                {{ userInfo.name }}
              </td>
              <td>이메일</td>
              <td>
                {{ userInfo.email }}
              </td>
              <td>
                <span>
                  정보변경
                </span>
              </td>
            </tr>
            <tr>
              <td>문의 유형</td>
              <td colspan="3">
                <select v-model="nowfaqCategory" :class="{ hasError: errors.has('nowfaqCategory')}">
                  <option value="">선택</option>
                  <option v-for="cate in faqCategoryList" :key="cate.name" :value="cate.name">{{ cate.name }}</option>
                </select>
                <select v-model="nowSubfaqCategory" :class="{ hasError: errors.has('nowSubfaqCategory')}">
                  <option value="">선택</option>
                  <option v-for="cate in getSubCategoryList" :key="cate.id" :value="cate.id">{{ cate.name }}</option>
                </select>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>제목</td>
              <td colspan="3">
                <input type="text" name="title" v-validate.bails="'required'" v-model="title" :class="{ hasError: errors.has('title')}">
              </td>
              <td></td>
            </tr>
            <tr>
              <td>문의내용</td>
              <td colspan="3">
                <textarea name="content" rows="8" v-validate.bails="'required'" v-model="content" :class="{ hasError: errors.has('content')}"></textarea>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>파일첨부</td>
              <td>
                <input type="file" @change="processFile($event)" name="file" v-validate.bails="'ext:jpeg,jpg,png|size:5000'">
              </td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td></td>
              <td colspan="3" class="desc">
                <span class="desc">* 이미지 파일(jpg, jpeg, gif, png)을 기준으로 최대 5M이하, 최대 5개까지 첨부가능합니다.</span>
                <span class="desc">* 훼손된 상품권에 대한 핀번호 확인을 위해서는 상품권 앞/뒤 사진파일을 첨부하여 주시면 빠른 확인이 가능합니다.</span>
              </td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="button_wrap">
        <div class="signUpDetailStep2__button">
          <div class="signUpDetailStep2__button--reset" @click.prevent="createAPIFAQInquiry()">
            <a href="#"><span>등록</span></a>
          </div>
          <div class="signUpDetailStep2__button--agree" @click.prevent="$router.go(-1)">
            <a href="#"><span>취소</span></a>
          </div>
        </div>
      </div>
    </div>
    <div class="list" v-if="inquiry_or_list == 'list'">
      <div class="title">
        <span class="csIcon inquiryList"></span>
        <span>문의내역 작성</span>
      </div>
      <div class="csCenterNotice__contentWrap" v-if="show">
        <div class="csCenterNotice__content csCenterNotice__content--desc">
          <div class="csCenterNotice__content--numbering">
            <span> <strong>번호</strong> </span>
          </div>
          <div class="csCenterNotice__content--cate">
            <span> <strong>유형</strong> </span>
          </div>
          <div class="csCenterNotice__content--title">
            <span> <strong>제목</strong> </span>
          </div>
          <div class="csCenterNotice__content--date">
            <span> <strong>등록일</strong> </span>
          </div>
          <div class="csCenterNotice__content--date">
            <span> <strong>답변현황</strong> </span>
          </div>
          <div class="csCenterNotice__content--show">
            <span> <strong></strong> </span>
          </div>
        </div>
        <div class="csCenterNotice__content" v-for="inquiry in inquiryList" :key="inquiry.id" @click="clickContent(inquiry.id)">
          <div class="csCenterNotice__content--numbering">
            <span> {{ inquiry.id }} </span>
          </div>
          <div class="csCenterNotice__content--cate">
            <span> {{ inquiry.category.name }} </span>
          </div>
          <div class="csCenterNotice__content--title">
            <span> <strong>{{ inquiry.title }}</strong> </span>
          </div>
          <div class="csCenterNotice__content--date">
            <span>{{ inquiry.created_at }} </span>
          </div>
          <div class="csCenterNotice__content--date">
            <span v-if="inquiry.is_answered == false">답변중</span>
            <span v-else>답변완료</span>
          </div>
          <div class="csCenterNotice__content--show">
            <span> <span class="csIcon csIconDownArrow"></span> </span>
          </div>
          <div class="csCenterNotice--contentWrap">
            <transition name="contentFade">
              <div class="csCenterNotice--content" v-if="inquiry_now_active == inquiry.id">
                <span v-html="inquiry.content"></span>
                <span>
                  <img :src="inquiry.file" alt="">
                </span>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="nowEvent__pagination">
        <a @click.prevent="getAPINoticeList(pre)" v-if="pre"><</a>
        <a @click.prevent="getAPINoticeList(page[1])" v-for="page in pageList" :class="{ active: page[2] }">
          <span v-if="page[1] == null">...</span>
          <span v-else>{{ page[1] }}</span>
        </a>
        <a @click.prevent="getAPINoticeList(next)" v-if="next">></a>
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
      inquiry_or_list: 'inquiry',
      faqCategoryList: [],
      userInfo: undefined,
      show: false,

      nowfaqCategory: '',
      nowSubfaqCategory: '',
      title: '',
      content: '',
      file: '',

      inquiry_now_active: -1,
      inquiryList: [],
      pageList: [],
      next: null,
      pre: null,
    }
  },
  computed: {
    getSubCategoryList() {
      this.nowSubfaqCategory = '';
      if (this.nowfaqCategory == '') {
        return []
      } else {
        return this.faqCategoryList[Object.keys(this.faqCategoryList).find(key => this.faqCategoryList[key].name === this.nowfaqCategory)].sub_category;
      }
    },
  },
  watch: {
    inquiry_or_list() {
      if (this.inquiry_or_list == 'inquiry') {
        this.getAPIUserProfileInfo();
        this.getAPIFAQSubCategoryLists();
      } else if (this.inquiry_or_list == 'list') {
        this.getAPInquiryLists();
      }
    }
  },
  methods: {
    clickContent(itemId) {
      if (this.inquiry_now_active == itemId) {
        this.inquiry_now_active = -1;
      } else {
        this.inquiry_now_active = itemId;
      }
    },
    getAPIUserProfileInfo() {
      const url = this.hostname + '/apis/members/get/';
      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.userInfo = response.data;
          }
        },
        error => {

        });
    },
    getAPIFAQSubCategoryLists() {
      const url = this.hostname + '/apis/posts/faq-category/';

      this.$http.get(url).then(
        response => {
          if (response.status == '200') {
            this.faqCategoryList = response.data;
            this.show= true;
          }
        },
        error => {

        });
    },
    getAPInquiryLists() {
      const url = this.hostname + '/apis/posts/inquiry/';
      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.inquiryList = response.data.results;
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
            this.show = true;
          }
        },
        error => {

        });
    },
    createAPIFAQInquiry() {
      if (this.nowfaqCategory == '' | this.nowSubfaqCategory == '') {
        alert("카테고리를 선택해주세요");
        return false;
      }
      this.$validator.validateAll()
      .then(valid => {
        if (valid) {
          const url = this.hostname + '/apis/posts/inquiry/';
          const Authorization = this.$cookie.get('Authorization');

          var formData = new FormData();
          if (this.file) {
            formData.append('image', this.file);
          }
          formData.append('title', this.title);
          formData.append('content', this.content);
          formData.append('category', this.nowSubfaqCategory);

          this.$http.post(url, formData, {headers: {'Authorization': Authorization}}).then(
            response => {
              this.inquiry_or_list = 'list';
            },
            error => {
              console.log(error.data);
            });
        } else {
          alert(this.errors.items[0].msg);
        }
      })
    },
    processFile(event) {
      this.file = event.target.files[0]
    }
  },
  created() {
    if (this.inquiry_or_list == 'inquiry') {
      this.getAPIUserProfileInfo();
      this.getAPIFAQSubCategoryLists();
    } else if (this.inquiry_or_list == 'list') {
      this.getAPInquiryLists();
    }
    EventBus.$on('CSCenterInquiry', () => {
      if (this.inquiry_or_list == 'list') {
        this.inquiry_or_list = 'inquiry'
      } else {
        this.inquiry_or_list = 'list'
      }
    })
  }
}
</script>

<style lang="scss">
  .customerInquiry {
    max-width: 1200px;
    width: 100%;
    margin: auto;

    .hasError {
      border: 1px solid #f35923;;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 1.2em;
      margin-bottom: 20px;

        span:last-child {
          margin-left: 10px;
        }
    }

    .content {

      > div {
        border: 1px solid #dcdcdc;
        border-top: 1px solid #666;
        padding: 0 20px;

        > table {
          border-spacing: 0;
          font-size: 0.8em;
          font-weight: bold;
          text-align: left;

          span {
            display: block;
          }

          > tr {

            > td {
              border-bottom: 1px solid #dcdcdc;
              padding: 15px 0;
              width: 10%;

              &:nth-child(1) {
                padding-right: 30px;
              }

              &:nth-child(2) {
                padding-left: 15px;
              }

              > span.desc {
                font-size: 0.6rem;
                font-weight: normal;
              }

              > input[type="text"] {
                padding: 10px 0 12px;
                font-size: 14px;
                text-indent: 16px;
                width: 100%;
              }

              > select {
                background-color: white;
                padding: 10px 0 12px;
                margin-right: 10px;
              }

              > textarea {
                width: 100%;
              }
            }

            &:last-child {

              > td {
                  border-bottom: none;
                  padding-bottom: 50px;
              }
            }
          }
        }
      }
    }

    .button_wrap {
      margin-top: 100px;

      > .signUpDetailStep2__button {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 10px;
        margin-bottom: 90px;

        > div {
          width: 100%;
          height: 48px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          > a {
            color: #fff;
          }
        }

        > .signUpDetailStep2__button--reset {
          grid-column: 2 / 3;
          border: 1px solid #454545;
          background-color: #4f4f4f;
        }

        > .signUpDetailStep2__button--agree {
          grid-column: 3 / 4;
          background-color: white;
          border: 1px solid #454545;

          a {
            color: #4f4f4f;
          }
        }
      }
    }

    .csCenterNotice__contentWrap {
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

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .nowEvent__pagination {
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
