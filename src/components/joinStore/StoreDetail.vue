<template>
 <div class="storeDetail">
   <div class="storeDetail__desc">
     <span>* 해피머니는 통신판매 중개자로서 판매(서비스)되는 모든 재화나 용역에 대해서는 아래의 매장에서 책임하에 운영되고 있습니다.</span>
   </div>
   <div class="storeDetailWrap">
     <div class="storeDetail__siteImage">
       <span class="imgWrap">
         <img :src="joinStoreInfo.shop_image" alt="이미지">
       </span>
       <a href="#">
         <div class="storeDetail__siteImage--button">
           <span>쇼핑몰로 바로가기</span>
         </div>
       </a>
       <span class="joinStoreSearch icoSearch feeIcon"></span>
       <strong class="joinStoreSearch icoSearch storeLab"></strong>
     </div>
     <div class="storeDetail__sitePurchaseDetail">
       <div class="storeDetail__sitePurchaseDetail--title">
         <div class="storeDetail__sitePurchaseDetail--title--name">
           <span>{{ joinStoreInfo.name }}</span>
         </div>
         <div class="storeDetail__sitePurchaseDetail--title--cate">
           <span>{{ joinStoreInfo.category.name }}</span>
         </div>
         <div class="storeDetail__sitePurchaseDetail--title--button">
           <span>{{  }}</span>
           <button type="button" name="button" @click.prevent="createLikeUsePoint(joinStoreInfo)" :class="{ 'like-on': joinStoreInfo.is_liked }">
             <span class="joinStoreSearch icoSearch" :class="{ 'like': joinStoreInfo.is_liked, 'btnLike': !joinStoreInfo.is_liked }"></span>
             <span>{{ joinStoreInfo.like_users_count }}</span>
           </button>
         </div>
       </div>
       <div class="storeDetail__sitePurchaseDetail--limit">
         <div class="storeDetail__sitePurchaseDetail--limit--title">
           <span>월 결제 한도</span>
         </div>
         <div class="storeDetail__sitePurchaseDetail--limit--amount">
           <span>{{ numberToLocaleString(joinStoreInfo.where_to_use.month_pay_limit) }} 원</span>
         </div>
       </div>
       <div class="storeDetail__sitePurchaseDetail--myLimitDesc">
         <span>내 결제 가능 금액</span>
       </div>
       <div class="storeDetail__sitePurchaseDetail--myLimit">
         <span class="login_required">로그인 하시면 확인 가능합니다.</span>
       </div>
       <div class="storeDetail__sitePurchaseDetail--button">
         <div class="storeDetail__sitePurchaseDetail--button--content">
           <span>해피캐시 충전하기</span>
         </div>
       </div>
     </div>
   </div>
   <div class="storeDetailBeforePage">
     <a href="#"><span>이전페이지</span></a>
   </div>
   <div class="storeDetailCheckList">
     <h3>쇼핑 전 체크리스트!</h3>
     <div class="storeDetailCheckListWrap">
       <div class="storeDetailCheckItem">
         <div class="storeDetailCheckItem__imgWrap">
           <img :src="require('@/assets/css/images/joinStore/check_1.png')" alt="">
         </div>
         <div class="storeDetailCheckItem__section1">
           <span>해피머니+온라인 사용처</span>
         </div>
         <div class="storeDetailCheckItem__section2">
           <span>회원가입하기</span>
         </div>
         <div class="storeDetailCheckItem__section3">
           <span>해피머니와 온라인 사용처 두 곳 모두 </span>
           <span>회원가입 하셔야 결제 가능</span>
         </div>
         <div class="storeDetailCheckItem__button">
           <a href="#">
             <span>해피머니 회원가입</span>
           </a>
         </div>
       </div>
       <div class="storeDetailCheckItem">
         <div class="storeDetailCheckItem__imgWrap">
           <img :src="require('@/assets/css/images/joinStore/check_2.png')" alt="">
         </div>
         <div class="storeDetailCheckItem__section1">
           <span>현금처럼 사용가능한</span>
         </div>
         <div class="storeDetailCheckItem__section2">
           <span>해피캐시 충전하기</span>
         </div>
         <div class="storeDetailCheckItem__section3">
           <span>해피머니 상품권 또는 실결제를 통해 </span>
           <span>충전 후 온라인 사용처에서 현금처럼 사용</span>
           <span>입력 후 결제하세요!</span>
         </div>
         <div class="storeDetailCheckItem__button">
           <a href="#">
             <span>해피캐시 충전하기</span>
           </a>
         </div>
       </div>
       <div class="storeDetailCheckItem">
         <div class="storeDetailCheckItem__imgWrap">
           <img :src="require('@/assets/css/images/joinStore/check_3.png')" alt="">
         </div>
         <div class="storeDetailCheckItem__section1">
           <span>비밀번호 보호하기</span>
         </div>
         <div class="storeDetailCheckItem__section2">
           <span>결제비밀번호서비스</span>
         </div>
         <div class="storeDetailCheckItem__section3">
           <span>결제비밀번호서비스 이용회원은</span>
           <span>회원비밀번호 대신 결제비밀번호 </span>
           <span>입력 후 결제하세요!</span>
         </div>
         <div class="storeDetailCheckItem__button">
           <a href="#">
             <span>결제비밀번호서비스 이용하기</span>
           </a>
         </div>
       </div>
       <div class="storeDetailCheckItem">
         <div class="storeDetailCheckItem__imgWrap">
           <img :src="require('@/assets/css/images/joinStore/check_4.png')" alt="">
         </div>
         <div class="storeDetailCheckItem__section1">
           <span>간편충전 고객은 꼭 확인하세요!</span>
         </div>
         <div class="storeDetailCheckItem__section2">
           <span>간편충전 이용불가 사용처</span>
         </div>
         <div class="storeDetailCheckItem__section3">
           <span>간편 충전 시 쇼핑몰, 도서구매, </span>
           <span>네이버게임, MVPOINT 이용불가</span>
         </div>
         <div class="storeDetailCheckItem__button">
           <a href="#">
             <span>간편충전 이용불가 사용처</span>
           </a>
         </div>
       </div>
     </div>
   </div>
   <div class="storeDetailSecret">
     <div :style="{ 'background-image': 'url('+ require('@/assets/css/images/joinStore/bgPayPassword.gif')+')'}"></div>
   </div>

 </div>
</template>

<script>
export default {
  props: ['hostname'],
  data() {
    return {
      joinStoreDetailID: null,
      joinStoreInfo: undefined,
      show: false
    }
  },
  methods: {
    getAPIUsePointRetrieve() {
      const Authorization = this.$cookie.get('Authorization');
      const url = this.hostname + '/apis/use-point/'+this.joinStoreDetailID;

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.joinStoreInfo = response.data;
            this.show = true;
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
    },
    numberToLocaleString(value) {
      if (value !== null) {
        return value.toLocaleString()
      }
      return 0;
    }
  },
  created() {
    if ('id' in this.$route.params) {
      this.joinStoreDetailID = this.$route.params.id;
      this.getAPIUsePointRetrieve();
    }else {
      // 잘못된 접근
    }
  }

}
</script>

<style lang="scss">

  .storeDetail {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 50px;

    > .storeDetail__desc {
      text-align: center;
      background: #f3f3f3;
      border: 1px solid #e2e2e2;
      padding: 15px 200px;
      margin-bottom: 30px;

      > span {
        font-size: 0.9em;
        color: #666;
      }
    }

    > .storeDetailWrap {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;

        > .storeDetail__siteImage {
          position: relative;
          text-align: center;
          width: 100%;
          border: 1px solid #dcdcdc;
          display: flex;
          flex-direction: column;

          > span.imgWrap {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }

          .storeLab {
            position: absolute;
            top: 0;
            left: 0;
            width: 79px;
            height: 79px;
            background-position: 0 -295px;
          }

          .feeIcon {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 44px;
            height: 44px;
            background-position: -74px -205px;
          }

          > a {
            > .storeDetail__siteImage--button {
              border-top: 1px solid #dcdcdc;
              background-color: #f8f8f8;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 58px;

              > span {
                display: block;
                font-weight: bold;
                font-size: 0.8em;
              }
            }
          }
        }

        > .storeDetail__sitePurchaseDetail {
          display: grid;

          > .storeDetail__sitePurchaseDetail--title {
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              margin-bottom: 10px;

              > .storeDetail__sitePurchaseDetail--title--name {
                font-weight: bold;
                font-size: 1.4em;
                margin-bottom: 5px;
              }

              > .storeDetail__sitePurchaseDetail--title--cate {
                font-size: 0.7em;
                color: #666;
              }

              > .storeDetail__sitePurchaseDetail--title--button {
                position: absolute;
                top: 0;
                right: 0;

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
          }

          > .storeDetail__sitePurchaseDetail--limit {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 14px;
            border-top: 1px solid black;

            > .storeDetail__sitePurchaseDetail--limit--title {
              justify-self: flex-start;
              font-size: 0.8em;
              color: #666;
            }

            > .storeDetail__sitePurchaseDetail--limit--amount {
              justify-self: end;
              font-weight: bold;
              letter-spacing: 2px;
              font-size: 1.1em;
            }
          }

          > .storeDetail__sitePurchaseDetail--myLimitDesc {
            display: grid;
            padding: 14px;
            border-top: 1px solid #ededed;
            border-bottom: 1px solid #ededed;

            > span {
              justify-self: flex-start;
              font-size: 0.8em;
              color: #666;
            }
          }

          > .storeDetail__sitePurchaseDetail--myLimit {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px 0;

            border-bottom: 1px solid #dcdcdc;
            background-color: #f8f8f8;

            > span.login_required {
              font-size: 0.8em;
              color: #666;
            }
          }

          > .storeDetail__sitePurchaseDetail--button {
            display: flex;
            padding: 15px 0;
            justify-content: flex-end;

            > .storeDetail__sitePurchaseDetail--button--content {
              > span {
                border: 1px solid #d54e1f;
                background-color: #f35923;
                color: #fff;
                font-size: 0.8em;
                font-weight: bold;
                padding: 10px 20px;
              }
            }
          }

        }
    }

    > .storeDetailBeforePage {
      padding-top: 40px;
      margin-top: 50px;
      padding-bottom: 70px;
      border-top: 1px solid #ececec;
      border-bottom: 1px solid black;

      > a {
        padding: 12px 20px;
        border: 1px solid black;

        > span {

          font-weight: bold;
          font-size: 0.9em;
        }
      }
    }

    > .storeDetailCheckList {
      display: flex;
      flex-direction: column;

      > h3 {
        display: block;
        padding: 20px 10px;
        align-self: flex-start;
        margin: 0;

        padding-top: 1px solid black;
      }

      > .storeDetailCheckListWrap {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-top: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
        padding: 40px 0;

        > .storeDetailCheckItem {
          display: grid;
          grid-template-rows: 1fr repeat(8, 0.2fr) 0.5fr 0.5fr;
          border-right: 1px solid #ececec;

          &:last-child{
            border: none;
          }

          > .storeDetailCheckItem__imgWrap {
            grid-row: 1 / 4;
            padding-bottom: 10px;

          }

          > .storeDetailCheckItem__section1 {
            grid-row: 4 / 5;

            > span {
              display: block;
              font-size: 0.8em;
              font-weight: bold;
            }
          }

          > .storeDetailCheckItem__section2 {
            grid-row: 5 / 7;
            padding-bottom: 10px;

            > span {
              display: block;
              font-weight: bold;
              color: #f35923;
            }
          }

          > .storeDetailCheckItem__section3 {
            grid-row: 7 / 11;

            > span {
              display: block;
              font-size: 0.8em;
              color: #777;
            }
          }
          > .storeDetailCheckItem__button {
            grid-row: 11 / 13;
            align-self: center;

            > a {
              padding: 10px 20px;
              border: 1px solid #454545;
              background-color: #4f4f4f;
              color: #fff;

              > span {
                font-weight: bold;
              }
            }
          }
        }

      }
    }

    > .storeDetailSecret {
      height: 500px;
      margin-top: 50px;

      > div {
        width:100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }
    }


  }

  @media only screen and (max-width: 970px) {
    .storeDetailCheckListWrap {
      grid-template-columns: repeat(2, 1fr) !important;

      > .storeDetailCheckItem {
        &:nth-child(3), &:nth-child(4) {
          margin-top: 50px;
        }
      }
    }
  }

</style>
