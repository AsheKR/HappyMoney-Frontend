<template>
  <div class="afterPurchase">
    <Balance :userInfo="userInfo"/>
    <div class="content">
      <div class="complete">
        <img :src="require('@/assets/css/images/card/icoPay_1.png')" alt="">
        <span>감사합니다.</span>
        <span> <strong>구매가 완료</strong>되었습니다.</span>
      </div>
      <div class="purchase_content">
        <div class="purchase_content_detail">
          <h4>결제 내역</h4>
          <div class="merchant_uid_wrap">
            <slot v-if="menu == 'giftCard'">
              <div class="merchant_uid">
                <span>주문번호</span>
                <span>{{ response.data[0].merchant_uid.split('_')[1] }}</span>
              </div>
              <div class="paid_amount">
                <span>결제방법</span>
                <span> {{ payment_methodToHumanize(payment_method) }} </span>
              </div>
              <div class="paid_amount">
                <span>받으시는 분</span>
                <span>{{ response.data[0].name }}</span>
                <span>외 ({{ response.data.length - 1 }})명</span>
              </div>
            </slot>
            <slot v-if="menu == 'happyCash'">
              <div class="merchant_uid">
                <span>주문번호</span>
                <span>{{ response.data.merchant_uid.split('_')[1] }}</span>
              </div>
              <div class="paid_amount">
                <span>총 결제금액</span>
                <span>{{ paid_amount }} 원</span>
              </div>
            </slot>




          </div>
        </div>
        <span>* 주문내역 및 증빙서류는 <strong>{{ payment_methodToHumanizeResult() }}</strong> 에서 확인 및 출력 가능합니다</span>
      </div>
      <div class="giftcard_content" v-if="menu == 'giftCard'">
        <div class="giftcard_type" v-for="giftcard in giftcardList" :key="giftcard.id">
          <span>{{ numberToLocaleString(giftcard.price) }}원권</span>
          <span>{{ giftcard.amount }}매</span>
          <span> <strong>{{ numberToLocaleString(giftcard.price * giftcard.amount) }}</strong> 원</span>
        </div>
        <div class="result">
          <span class="giftCardIco1 Won"></span>
          <span>결제금액</span>
          <span> <strong>{{ numberToLocaleString(response.data[0].full_amount ) }}</strong> 원</span>
        </div>
      </div>
      <div class="signUpDetailStep2__button">
        <div class="signUpDetailStep2__button--reset" @click.prevent="$router.push({ name: '' })">
          <a href="#"><span>내역조회</span></a>
        </div>
        <div class="signUpDetailStep2__button--agree" @click.prevent="$router.push({ name: '' })">
          <a href="#"><span>추가충전</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Balance from './Balance.vue'

  export default {
    data() {
      return {
        userInfo: undefined,
        response: undefined,
        giftcardList: undefined,
        menu: undefined,
        payment_method: undefined,
        paid_amount: undefined,
      }
    },
    components: {
      Balance
    },
    methods: {
      numberToLocaleString(value) {
        return value.toLocaleString()
      },
      payment_methodToHumanize(value) {
        if (value == 'kakao') {
          return '카카오페이'
        } else if (value == 'happyCash') {
          return '해피캐시'
        }
      },
      payment_methodToHumanizeResult() {
        if (this.menu == 'happyCash') {
          return '마이페이지 > 이용현황 > 해피캐시 내역조회'
        } else if (this.menu == 'giftCard') {
           return '마이페이지 > 이용현황 > 상품권 주문내역조회'
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
            console.log(error);
          });
      },
    },
    created() {
      this.hostname = this.$route.params.hostname;
      this.response = this.$route.params.response;
      this.menu = this.$route.params.menu;

      if (this.menu == 'giftCard') {
        this.giftcardList = this.$route.params.giftcardList;
        this.payment_method = this.$route.params.payment_method;
      } else if (this.menu == 'happyCash') {
        this.paid_amount = this.$route.params.paid_amount;
      }

      this.getAPIUserProfileInfo();
    }
  }
</script>

<style lang="scss">

  .afterPurchase {

    > .content{
      max-width: 1500px;
      margin: auto;

      > .complete {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 50px 0;
        font-size: 1.2em;

        > span {
          margin-top: 5px;

          > strong {
            color: #f35923;
          }
        }
      }

      > .purchase_content {

        .purchase_content_detail {

          > h4 {
            text-align: left;
          }

          > .merchant_uid_wrap{
            display: grid;
            grid-template-rows: 1fr;
            grid-auto-flow: column;
            border-top: 1px solid black;
            border-bottom: 1px solid #dcdcdc;
            border-right: 1px solid #dcdcdc;
            border-left: 1px solid #dcdcdc;
            background-color: #f5f5f5;
            grid-gap: 10px;
            padding: 10px 30px;

            > div {
              background-color: white;
              border: 1px solid #dcdcdc;
              text-align: left;
              padding: 20px 0 0 20px;
              height: 140px;
              color: #666;
              font-size: 0.8em;
              font-weight: bold;
              display: flex;
              flex-direction: column;

              > span:nth-child(2) {
                margin-top: 15px;
                color: black;
                font-size: 1.1rem;
              }
            }
          }
        }

        > span {
          font-size: 0.8em;
          margin-top: 10px;
          text-align: left;
          display: block;

          > strong {
            color: #f35923;
          }
        }
      }

      > .giftcard_content {
        display: grid;
        grid-template-rows: 1fr;
        grid-auto-flow: column;
        background-color: #555;
        margin-top: 30px;

        > .giftcard_type {
          color: #ffe7a7;
          font-size: 0.8em;
          padding-top: 30px;
          padding-right: 15px;
          border-right: 1px solid #666;
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          > span:last-child {
            padding: 20px 0;
            color: white;
            font-size: 1.0rem;

            > strong {
              font-size: 1.2rem;
              font-weight: normal;
            }
          }
        }

        > .result {
          grid-column: span 3;
          padding-bottom: 20px;
          padding-right: 15px;
          background-color: #f98015;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-end;
          font-weight: bold;
          font-size: 0.8em;
          position: relative;

          > span.giftCardIco1.Won {
            position: absolute;
            top: 20px;
            left: 20px;
          }

          > span {
            > strong {
              font-size: 1.5rem;
            }
          }
        }
      }

      > .signUpDetailStep2__button {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 10px;
        margin-bottom: 90px;
        margin-top: 50px;

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
          border: 1px solid #d54e1f;
          background-color: #f35923;
        }
      }

    }
  }

</style>
