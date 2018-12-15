<template>
  <div class="myBoxHome">
    <div class="myBoxHome__section">
      <div class="myBoxHome__rating">
        <div class="myBoxHome__rating__user">
          <div class="myBoxHome__rating__user--img">
            <img :src="require('@/assets/css/images/mybox/mem_0.png')" alt="">
          </div>
          <div class="myBoxHome__rating__user--desc">
            <span>{{ userInfo.name }} 님은 <strong>{{ userInfo.rating.name }} 회원</strong> 이십니다.</span>
            <span>Biz Site 접속 ></span>
          </div>
          <div class="myBoxHome__rating__user--benefit">
            <div class="myBoxHome__rating__user--button">
              <span class="happyBoxRatingBenefit"></span>
              <span>등급별혜택</span>
            </div>
          </div>
        </div>
        <div class="myBoxHome__rating__cash">
          <div class="myBoxHome__rating__cash--cash happy">
            <div class="myBoxHome__rating__cash--title">
              <span class="happyBoxMemInfo myBoxHC"></span>
              <span>해피캐시</span>
            </div>
            <div class="myBoxHome__rating__cash--amount">
              <span> <strong>{{ userInfo.happy_cash }}</strong> 원</span>
            </div>
          </div>
          <div class="myBoxHome__rating__cash--cash hammer">
            <div class="myBoxHome__rating__cash--title">
              <span class="happyBoxMemInfo myBoxHM"></span>
              <span>보유해머</span>
            </div>
            <div class="myBoxHome__rating__cash--amount">
              <span> <strong>{{ userInfo.hammer }}</strong> 톤</span>
            </div>
          </div>
          <div class="myBoxHome__rating__cash--cash giftcard">
            <div class="myBoxHome__rating__cash--title">
              <span class="happyBoxMemInfo myBoxGift"></span>
              <span>상품권 주문</span>
            </div>
            <div class="myBoxHome__rating__cash--amount">
              <span> <strong>0</strong> 건</span>
            </div>
          </div>
          <div class="myBoxHome__rating__cash--cash coupon">
            <div class="myBoxHome__rating__cash--title">
              <span class="happyBoxMemInfo myBoxCoupon"></span>
              <span>보유쿠폰</span>
            </div>
            <div class="myBoxHome__rating__cash--amount">
              <span> <strong>0</strong> 건</span>
            </div>
          </div>
        </div>
      </div>
      <div class="myBoxHome__recent">
        <div class="myBoxHome__recent__ordering">
          <h4>최근 이용현황</h4>
          <div><span>상품권 주문내역</span></div>
          <div><span>해피캐시 내역</span></div>
        </div>
        <div class="myBoxHome__recentWrap">
          <div class="myBoxHome__recent myBoxHome__recent--desc">
            <div class="myBoxHome__recent--item">
              <span> <strong>충전/승인번호</strong> </span>
            </div>
            <div class="myBoxHome__recent--item">
              <span> <strong>주문일</strong> </span>
            </div>
            <div class="myBoxHome__recent__item">
              <span> <strong>충전/사용 내용</strong> </span>
            </div>
            <div class="myBoxHome__recent__item">
              <span> <strong>선물주기/받기(원)</strong> </span>
            </div>
            <div class="myBoxHome__recent__item">
              <span> <strong>사용캐시(원)</strong> </span>
            </div>
            <div class="myBoxHome__recent__item">
              <span> <strong>충전캐시(원)</strong> </span>
            </div>
            <div class="myBoxHome__recent__item">
              <span> <strong>캐시잔액(원)</strong> </span>
            </div>
          </div>
          <div class="myBoxHome__recent__button">
            <button type="button" >주문내역 전체보기</button>
          </div>
        </div>
      </div>
      <div class="myBoxHome__profile">
        <div class="myBoxHome__profile__section">
          <h4>내 정보 조회/수정</h4>
          <div class="myBoxHome__profile--modify">
            <div class="myBoxHome__profile--item" @click="$router.push({ name: 'mybox/editstep1' })">
              <span class="happyBoxMemInfo memModify"></span>
              <span>내 정보 수정</span>
            </div>
            <div class="myBoxHome__profile--item" @click="$router.push({ name: 'mybox/passwordEdit' })">
              <span class="happyBoxMemInfo memPassword"></span>
              <span>비밀번호 변경</span>
            </div>
            <div class="myBoxHome__profile--item">
              <span class="happyBoxMemInfo memLoginInfo"></span>
              <span>로그인 기록 조회</span>
            </div>
          </div>
        </div>
        <div class="myBoxHome__profile__section">
          <h4>최근 이용 내역</h4>
          <div class="myBoxHome__profile--recent">
            <div class="myBoxHome__profile--item">
              <span> <strong>0</strong> 건 </span>
              <span>개인정보 이용내역</span>
            </div>
            <div class="myBoxHome__profile--item">
              <span> <strong>0</strong> 건 </span>
              <span>1:1 문의 내역</span>
            </div>
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
      userInfo: undefined,
    }
  },
  methods: {
    getAPIUserProfileInfo() {
      const url = this.hostname + '/apis/members/get/';
      const Authorization = this.$cookie.get('Authorization');
      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          console.log(response);
          if (response.status == '200') {
            this.userInfo = response.data;
          }
        },
        error => {
          console.log(error);
        });
    },
  },
  created() {
    this.getAPIUserProfileInfo()
  }
}
</script>

<style lang="scss">

  .myBoxHome {
    display: flex;
    flex-direction: column;
    max-width: 1500px;
    margin: 0 auto;

    > .myBoxHome__section {

      > .myBoxHome__rating {
        display: grid;
        grid-template-rows: auto auto;

        > .myBoxHome__rating__user {
          display: flex;
          align-items: center;
          border: 1px solid #deac1f;
          background-color: #fec524;
          padding: 10px 20px;

          > .myBoxHome__rating__user--desc {
            font-size: 1.1em;
            padding-left: 20px;

            > span {
              display: block;

              &:last-child {
                text-align: right;
                color: #666;
              }
            }
          }

          > .myBoxHome__rating__user--benefit {
            margin-left: auto;

            > .myBoxHome__rating__user--button {
              background-color: #705132;
              color: white;
              font-weight: bold;
              font-size: 0.8em;
              padding: 5px 10px;
              display: flex;
              align-items: center;

              > span:first-child {
                margin-right: 5px;
              }
            }
          }
        }

        > .myBoxHome__rating__cash {
          display: grid;
          grid-template-columns: repeat(4, 1fr);

          > .myBoxHome__rating__cash--cash {
              padding: 16px 20px 19px;
              border: 1px solid #fec524;
              border-top: none;

              > .myBoxHome__rating__cash--title {
                text-align: left;
                display: flex;
                align-items: center;
                margin-bottom: 30px;

                > span:nth-child(2) {
                  padding-left: 10px;
                }
              }

              > .myBoxHome__rating__cash--amount {
                text-align: right;
                color: #777;

                > span {
                  font-size: 0.8em;

                  > strong {
                    font-weight: normal;
                    font-size: 2rem;
                  }
                }
              }
          }
        }
      }

      > .myBoxHome__recent {
        margin-bottom: 50px;

        > .myBoxHome__recent__ordering {
          margin-top: 30px;
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          > h4 {
            font-size: 1.3em;
            margin: 0;
            margin-right: auto;
          }

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

            > span {
              padding: 0 15px;
            }
          }
        }

        > .myBoxHome__recentWrap {
          display: grid;

          > .myBoxHome__recent {
            display: grid;
            grid-template-columns: repeat(7, auto);
            border-bottom: 1px solid #eee;
            align-items: center;

            > div {
              padding: 10px 0;
              font-size: 0.8em;
              color: #666;
              border-right: 1px solid #ddd;
              border-bottom: 1px solid #ddd;

              &:last-child {
                border-right: none;
              }
            }

            &:first-child {
              border-top: 1px solid black;
              background-color: #f5f5f5;

              > div {
                color: black !important;
                text-align: center;
              }
            }
          }

          > .myBoxHome__recent__button {

            padding: 20px 0;
            border-bottom: 1px solid #ddd;

            > button {
              font-weight: bold;
              padding: 7px 30px;
              border: 1px solid #454545;
              background-color: #4f4f4f;
              color: #fff;
            }
          }
        }

      }

      > .myBoxHome__profile {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 200px;
        grid-column-gap: 15px;

        > .myBoxHome__profile__section {
          > h4 {
            text-align: left;
          }

          > div {
            border-top: 1px solid #555;
            border-bottom: 1px solid #ddd;
            padding: 20px 0;

            > .myBoxHome__profile--item {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 20px 0;
              border-left: 1px solid #eee;
              cursor: pointer;

              &:first-child {
                border-left: none;
              }

              span {
                font-size: 0.8em;
                font-weight: bold;

                &:nth-child(1) {
                  font-weight: normal;

                  > strong {
                    font-weight: normal;
                    font-size: 1.8rem;
                    color: #f25822;
                  }
                }

                &:last-child {
                  margin-top: 10px;
                }
              }
            }
          }

          > .myBoxHome__profile--modify {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }

          > .myBoxHome__profile--recent {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
        }
      }


    }
  }

</style>
