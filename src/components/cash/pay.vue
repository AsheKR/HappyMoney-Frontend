<template>
  <div class="payment_method">
    <div class="choose_payment_method">
      <h2>충전수단 선택</h2>
      <table>
        <tr class="method">
          <td>충전수단</td>
          <td>
            <span>
              <input type="radio" id="kakao" value="kakao" v-model="payment_method">
              <label for="kakao">카카오페이</label>
            </span>
            <span>
              <input type="radio" id="giftCard" value="giftCard" v-model="payment_method">
              <label for="giftCard">상품권</label>
            </span>
          </td>
        </tr>
      </table>
    </div>
    <div class="giftcard_purchase_section">
      <h4>결제</h4>
      <div class="giftcard_purchase_wrap">
        <div class="giftcard_purchase_pay_method">
          <table class="myBoxHome__recentWrap" v-if="payment_method == 'giftCard'">
            <tr class="myBoxHome__recent myBoxHome__recent--desc">
              <th class="myBoxHome__recent--item">
                <span> <strong> 핀 바코드번호 </strong> </span>
              </th>
              <th class="myBoxHome__recent--item">
                <span> <strong> 발행일/인증번호 </strong> </span>
              </th>
            </tr>
            <slot v-for="(value, index) in PIN_amount">
              <purchaseItemComponent :index="index" :PIN="PINList[index]" />
            </slot>
          </table>
          <table class="purchase_pay_method" v-if="payment_method == 'kakao'">
            <tr class="method">
              <td>충전금액</td>
              <td>
                <input type="number" v-model="paid_amount"> 원
              </td>
            </tr>
            <tr class="cashback">
              <td>총 충전금액</td>
              <td>{{ Number(cashback_amount) + Number(paid_amount) }}원 ({{ Number(paid_amount) }}원 + 캐시백 {{ cashback_amount }}원)</td>
            </tr>
          </table>
          <div class="purchase_desc">
            <span>* 최대 10개까지 등록 가능합니다.</span>
            <span @click="clickPurchaseItem(1)">+ 더 충전하기</span>
          </div>
          <div class="check_point">
            <span> <span class="giftCardIco1 checkPoint"></span> CHECK POINT</span>
            <span>- 월 결제한도 : 5만원</span>
            <span>- 제휴기관의 집금업무를 지원하는 가상의 계좌로 금융 계좌와 동일한 체제를 가지고 있는 결제 서비스를 지원합니다.</span>
          </div>
        </div>
        <div class="giftcard_purchase_last_check" v-if="payment_method == 'kakao'">
          <div class="giftcard_purchase_price">
            <span class="giftCardIco1 Won"></span>
            <span>결제금액</span>
            <span> <strong>{{ Number(paid_amount) }}</strong> 원</span>
          </div>
          <div class="purchasebutton">
            <button type="button" name="button" @click="getAPIPurchase()">결제하기</button>
          </div>
          <div class="event">
            <img :src="require('@/assets/css/images/card/20180504110558.jpg')" alt="">
          </div>
        </div>
        <div class="giftcard_purchase_last_check" v-if="payment_method == 'giftCard'">
          <div class="purchasebutton">
            <button type="button" name="button" @click="getAPIPurchaseGiftCardPIN()">충전하기</button>
          </div>
          <div class="event">
            <img :src="require('@/assets/css/images/card/20180504110558.jpg')" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  const purchaseItemComponent = {
    props: ['index', 'PIN'],
    render (h) {

      return (
        <tr class="myBoxHome__recent">
          <td class="myBoxHome__recent--item">
            <input type="text" v-model={this.PIN.PIN}/>
          </td>
          <td class="myBoxHome__recent--item">
            <input type="text" v-model={this.PIN.created_at} />
          </td>
        </tr>
      )
    }
  }

  export default {
    props: ['hostname'],
    data() {
      return {
        payment_method: 'giftCard',
        paid_amount: 0,

        PINList: [],
        PIN_amount: 0,
      }
    },
    components: {
      purchaseItemComponent: purchaseItemComponent,
    },
    computed: {
      cashback_amount() {
        return this.paid_amount * 0.03;
      }
    },
    methods: {
      getAPIPurchase() {
        if (this.payment_method == 'giftCard') {

        } else if (this.payment_method == 'kakao') {
          this.getAPIPurchaseKakao();
        }
      },
      getAPIPurchaseKakao() {
        if (this.paid_amount == 0) {
          alert(" 충전 금액을 입력해주세요! ");
          return;
        }

        const url = this.hostname + '/apis/cashes/purchase/';
        const Authorization = this.$cookie.get('Authorization');

        IMP.init("imp23550103");

        IMP.request_pay({
          name: '해피캐시 결제하기',
          amount: this.paid_amount
        }, (response) => {

          const imp_uid = response['imp_uid']

          const after_data = {
            imp_uid: imp_uid,
            paid_amount: Number(this.paid_amount),
          }

          if ( response.success ) {
            this.$http.post(url, after_data, {headers: {'Authorization': Authorization}}).then(
              response => {
                if (response.status == '201') {
                  this.$router.push({
                    name: 'purchase_complete',
                    params: {
                      hostname: this.hostname,
                      response: response,
                      menu: 'happyCash',
                      paid_amount: this.paid_amount,
                    }
                  })
                }
              },
              error => {
                console.log(error);
              });
          } else {
            alert('결제실패 : ' + response.error_msg);
          }
        })
      },
      clickPurchaseItem(dir) {
        if (dir === 1) {
          if (this.PIN_amount + 1 !== 10) {
            this.PIN_amount += 1;
            this.PINList.push({
              PIN: '',
              created_at: '',
            });
          }
        } else if (dir === 2) {
          if (Number(this.PIN_amount) - 1 !== 0) {
            this.PIN_amount = this.PIN_amount - 1;
            this.PINList.splice(-1, 1);
          }
        }
      },
      getAPIPurchaseGiftCardPIN() {
        const url = this.hostname + '/apis/giftcards/purchase-giftcard/'
        const Authorization = this.$cookie.get('Authorization');

        const data = {
          PINGiftCardList: this.PINList
        }

        this.$http.post(url, data, {headers: {'Authorization': Authorization}})
        .then(
          response => {
            this.$router.push({
              name: 'purchase_complete',
              params: {
                hostname: this.hostname,
                response: response,
                menu: 'giftCardToHappyCash',
              }
            })
          },
          error => {
            console.log(error);
          }
        )
      }
    },
    created() {
      this.clickPurchaseItem(1);
    },
    mounted() {
      let jQuery = document.createElement('script')
      jQuery.setAttribute('src', 'https://code.jquery.com/jquery-1.12.4.min.js')
      document.head.appendChild(jQuery)
      let IamPort = document.createElement('script')
      IamPort.setAttribute('src', 'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js')
      document.head.appendChild(IamPort)
    }
  }
</script>

<style lang="scss">

  .payment_method {

    > .choose_payment_method{
      padding-left: 30px;
      > table {
        width: 100%;

        td {
          padding: 10px;
          border-bottom: 1px solid #dcdcdc;
          border-top: 1px solid black;

          > span {
            padding-left: 30px;
          }

          &:first-child {
            background-color: #f5f5f5;
          }
        }
      }
    }

    > .giftcard_purchase_section {
      padding-left: 30px;
      border-bottom: 1px solid #dcdcdc;
      margin-bottom: 100px;

      > h4 {
        text-align: left;
      }

      > .giftcard_purchase_wrap {
        display: grid;
        grid-template-columns: 75% 25%;
        grid-gap: 10px;
        padding-bottom: 50px;

        > .giftcard_purchase_pay_method {

          > .purchase_pay_method {
            border-spacing: 0;
            border-top: 1px solid black;
            width: 100%;
            font-size: 0.8em;

            input {
              padding: 6px 0;
              text-align: right;
            }

            > tr {
              text-align: left;

              > td {
                padding-left: 20px;
                border-left: 1px solid #dcdcdc;
                border-bottom: 1px solid #dcdcdc;
              }

              > td:first-child {
                font-weight: bold;
                background-color: #f5f5f5;
                padding: 15px 0 15px 15px;
                border-left: none;
                width: 20%;
              }

              > td:last-child {
                color: #666;
              }
            }
          }

          > .myBoxHome__recentWrap {
              border-spacing: 0;
              width: 100%;

            > tr.myBoxHome__recent {
              border-bottom: 1px solid #dcdcdc;

              input {
                padding: 6px 0;
                text-align: right;
              }

              > .myBoxHome__recent--item {
                padding: 10px 0;
                font-size: 0.8em;
                color: #666;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;

                &:first-child {
                  input {
                    width: 90%;
                  }
                }

                p {
                  margin: 0;
                }

                &.myBoxHome__recent--won {
                  text-align: right;
                  padding-right: 10px;
                }

                &:last-child {
                  border-right: none;
                }
              }

              &:first-child {
                border-top: 1px solid black;
                background-color: #f5f5f5;

                > th {
                  border-top: 1px solid black;
                  color: black !important;
                  text-align: center;
                }
              }
            }
          }

          > .purchase_desc {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 10px 0;

            > span {

              &:first-child {
                color: #6a85af;
                font-size: 0.8em;
                margin-right: auto;
              }
              &:last-child {
                padding: 5px 10px;
                border: 1px solid #454545;
                background-color: #4f4f4f;
                color: #fff;
                font-size: 0.9em;
                cursor: pointer;
              }
            }
          }

          > .check_point {
            margin: 20px 0;
            border: 1px solid #e6e6e6;
            background-color: #f8f8f8;
            font-size: 0.75em;
            padding: 30px 20px;

            > span {
              display: block;
              text-align: left;

              &:first-child {
                font-weight: bold;
                margin-bottom: 10px;
              }

              &:nth-child(2) {
                color: #f35923;
              }

              &:not(:first-child) {
                padding-left: 20px;
              }
            }

          }

          > .purchase_agree {
            font-size: 0.75em;
            text-align: left;
          }

        }

        > .giftcard_purchase_last_check {
          display: flex;
          flex-direction: column;

          > .giftcard_purchase_price {
            margin-bottom: 10px;
            height: 115px;
            padding: 20px;
            background-color: #f88015;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            font-size: 0.8em;
            font-weight: bold;
            box-sizing: content-box;
            position: relative;

            > span.giftCardIco1.Won {
              position: absolute;
              top: 20px;
              left: 20px;
            }

            > span:last-child {
              > strong {
                font-size: 2rem;
              }
            }
          }

          > .purchasebutton {
            margin-bottom: 10px;

            > button {
              width: 100%;
              height: 60px;
              border: 1px solid #d54e1f;
              background-color: #f35923;
              color: #fff;
              font-weight: bold;
              font-size: 1.1em;
            }
          }
        }
      }
    }
  }

</style>
