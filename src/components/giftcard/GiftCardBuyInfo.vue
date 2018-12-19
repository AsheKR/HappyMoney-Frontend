<template>
  <div class="giftcardbuyinfo">
    <div class="giftcardbuyinfo_category">
      <div class="intro">
        <span>소개 및 사용방법</span>
      </div>
      <div class="purchase active">
        <span>상품권 구입</span>
      </div>
    </div>
    <div class="giftcardbuy_user" v-if="userShow">
      <h4>주문하시는 분</h4>
      <div class="giftcardbuy_user_wrap giftcardbuy_user_sms_wrap" v-if="nowBuyType == 'sms' | nowBuyType == 'address'">
        <div class="giftcardbuy_user_name">
          <span>주문자명</span>
          <span>
            <input type="radio" id="username" checked/>
            <label for="username">{{ userInfo.name }}</label>
          </span>
        </div>
        <div class="giftcardbuy_user_sms_info">
          <span>휴대폰번호</span>
          <span>
            <input type="text" name="" :value="'0'+userInfo.phone.slice(3, 5)">-
            <input type="text" name="" :value="userInfo.phone.slice(5, 9)">-
            <input type="text" name="" :value="userInfo.phone.slice(9, 13)">
          </span>
        </div>
      </div>
      <div class="giftcardbuy_user_wrap giftcardbuy_user_email_wrap" v-else-if="nowBuyType == 'email'">
        <div class="giftcardbuy_user_name">
          <span>주문자명</span>
          <span>
            <input type="radio" id="username" checked/>
            <label for="username">{{ userInfo.name }}</label>
          </span>
        </div>
        <div class="giftcardbuy_user_email_info">
          <span>이메일</span>
          <span>
            <input type="text" name="" :value="userInfo.email">
          </span>
        </div>
        <div class="giftcardbuy_user_sms_info">
          <span>휴대폰번호</span>
          <span>
            <input type="text" name="" :value="'0'+userInfo.phone.slice(3, 5)">-
            <input type="text" name="" :value="userInfo.phone.slice(5, 9)">-
            <input type="text" name="" :value="userInfo.phone.slice(9, 13)">
          </span>
        </div>
      </div>
    </div>
    <div class="giftcardbuy_to">
      <h4>받으시는 분</h4>
      <div class="giftcardbuy_to_detail_wrap">
        <table class="giftcardbuy_to_detail_input">
          <tr class="giftcard_to_user_wrap title">
            <td class="giftcard_to_user--name">
              <span>이름</span>
            </td>
            <td class="giftcard_to_user--type">
              <span v-if="this.nowBuyType == 'email'">이메일</span>
              <span v-else-if="this.nowBuyType == 'sms'">휴대폰번호</span>
            </td>
            <td class="giftcard_to_user--price" v-for="giftcard in giftcardList" :key="giftcard.id">
              <span>{{giftcard.price}}원</span>
            </td>
          </tr>
          <slot v-for="(value, index) in purchase_item_amount">
            <purchaseItemComponent :index="index" :giftcardList="giftcardList" :nowBuyType="nowBuyType" :giftcardValue="giftcardResult[index]" />
          </slot>
        </table>
        <div class="giftcard_to_detail_calc">
          <div class="giftcard_calc_result">
            <span>주문금액</span>
            <div class="calc_result_giftcard">
              <div class="calc_result_giftcard_type" v-for="giftcard in giftcardList" :key="giftcard.id">
                <span class="giftCardListCon"></span>
                <span>{{ humanizePrice(giftcard.price) }}</span>
                <span>{{ giftcard.amount }}매</span>
                <span>{{ numberToLocaleString(giftcard.amount * giftcard.price) }}원</span>
              </div>
            </div>
            <div class="calc_result_num_of_people">
              <span></span>
              <span>인원  <strong>{{ giftcardResult.length }}명</strong> </span>
            </div>
            <div class="calc_result_giftcard_amount">
              <span></span>
              <span>주문수량 <strong>{{ card_amount }}매</strong> </span>
            </div>
            <div class="calc_result_full_amount">
              <span>총 주문금액</span>
              <span>{{ numberToLocaleString(paid_amount) }}원</span>
            </div>
          </div>
          <div class="giftcard_calc_desc">
            <span>주문한도안내</span>
            <span>– 주문한도 매수 : 300매</span>
            <span>– 결제수단 별 주문한도</span>
            <span>· 무통장입금(가상계좌) : 월한도 5만원</span>
            <span>· 모바일티머니 : 월한도 50만원</span>
            <span>· 해피머니계좌입금 : 월한도 5만원</span>
            <span>· 해피캐시 : 월한도 10만원</span>
          </div>
        </div>
      </div>
    </div>
    <div class="add_purchase_item">
      <button type="button" name="button" @click="clickPurchaseItem(1)">+</button>
      <button type="button" name="button" @click="clickPurchaseItem(2)">-</button>
    </div>
    <div class="giftcard_purchase_section">
      <h4>결제</h4>
      <div class="giftcard_purchase_wrap">
        <div class="giftcard_purchase_pay_method">
          <table class="purchase_pay_method">
            <tr class="method">
              <td>결제방법</td>
              <td>
                <input type="radio" name="payment_method" value="kakao" id="kakao" v-model="payment_method">
                <label for="kakao">카카오페이</label>
                <input type="radio" name="payment_method" value="happyCash" id="happyCash" v-model="payment_method">
                <label for="happyCash">해피캐시</label>
              </td>
            </tr>
            <tr v-if="payment_method == 'happyCash'">
              <td>해피캐시 잔액</td>
              <td>회원님이 보유한 해피캐시는 <strong>{{ numberToLocaleString(userInfo.happy_cash) }}</strong> 입니다.</td>
            </tr>
            <tr class="cashback">
              <td>캐시백 금액</td>
              <td>0원</td>
            </tr>
          </table>
          <div class="check_point">
            <span> <span class="giftCardIco1 checkPoint"></span> CHECK POINT</span>
            <span>- 월 결제한도 : 5만원</span>
            <span>- 제휴기관의 집금업무를 지원하는 가상의 계좌로 금융 계좌와 동일한 체제를 가지고 있는 결제 서비스를 지원합니다.</span>
          </div>
          <div class="purchase_desc">

          </div>
          <div class="purchase_agree">
            <input type="checkbox" id="purchase_agree">
            <label for="purchase_agree">주문하실 상품권의 이용안내, 가격, 배송정보를 확인하고 동의합니다.</label>
          </div>
        </div>
        <div class="giftcard_purchase_last_check">
          <div class="giftcard_purchase_price">
            <span class="giftCardIco1 Won"></span>
            <span>결제금액</span>
            <span> <strong>{{ paid_amount }}</strong> 원</span>
          </div>
          <div class="purchasebutton">
            <button type="button" name="button" @click="clickPurchaseButton()">결제하기</button>
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
  import { EventBus } from '@/components/common/EventBus.js';

  const purchaseItemComponent = {
    props: ['index', 'giftcardList', 'nowBuyType', 'giftcardValue'],
    watch: {
      'giftcardValue.giftcardValues': {
        handler: function(val, oldVar) {
          EventBus.$emit('ChangeGiftCardValues')
        },
        deep: true
      }
    },
    destroyed() {
      EventBus.$emit('ChangeGiftCardValues')
    },
    methods: {
      divclassName(name) {
        return 'purchase_'+name+'_'+this.index+'_wrap purchase_'+name+'_wrap';
      },
      labelIDName(name) {
        return 'purchase_' + name + '_' + this.index;
      },
      giftcarduniqueClassName(name) {
        return 'purchase_'+name+'_'+this.index;
      }
    },
    render (h) {
      const items = this.giftcardList.map((item, gindex) => {

        if (!this.giftcardValue.giftcardValues[gindex]) {
          this.giftcardValue.giftcardValues.push({ amount: 0 })
        }

        return (
          <td class="giftcard_to_user--price">
            <input type="number" id={this.giftcarduniqueClassName(item.gift_card_unique_id)} v-model={this.giftcardValue.giftcardValues[gindex].amount}/>
          </td>
        )
      })

      return (
        <tr class="giftcard_to_user_wrap">
          <td class="giftcard_to_user--name">
            <input type="text" v-model={this.giftcardValue.name}/>
          </td>
          <td class="giftcard_to_user--type">
            <input type="text" v-model={this.giftcardValue.infoTo} />
          </td>
          {items}
        </tr>
      )
    }
  }

  export default {
    props: ['nowBuyType'],
    data() {
      return {
        hostname: require('@/assets/js/variable.js').hostname,

        giftcardList: [],
        purchase_item_list: [],
        purchase_item_amount: 1,
        giftcardResult: [],

        paid_amount: 0,
        card_amount: 0,

        userInfo: undefined,
        userShow: false,

        payment_method:'kakao',
      }
    },
    watch: {
      nowBuyType() {
        this.getHappyGiftCard();
      }
    },
    components: {
      purchaseItemComponent: purchaseItemComponent
    },
    methods: {
      numberToLocaleString(value) {
        return value.toLocaleString()
      },
      humanizePrice(value) {
        var result = Number(value) / 1000;
        if (result < 10) {
          return String(result) + '천원권';
        } else {
          return String(result / 10) + '만원권';
        }
      },
      getAPIUserProfileInfo() {
        const url = this.hostname + '/apis/members/get/';
        const Authorization = this.$cookie.get('Authorization');
        this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
          response => {
            if (response.status == '200') {
              this.userInfo = response.data;
              this.userShow = true;
            }
          },
          error => {
            console.log(error);
          });
      },
      getHappyGiftCard() {
        const url = this.hostname + '/apis/giftcards/happy-giftcard/?delivery_type='+this.nowBuyType;
        this.$http.get(url).then(
          response => {
            if (response.status == '200') {
              this.giftcardList = response.data;

              this.giftcardList.map((x) => {
                this.$set(x, 'amount', 0);
              })
            }
          },
          error => {
            console.log(error);
          });
      },
      clickPurchaseItem(dir) {
        if (dir === 1) {
          this.purchase_item_amount += 1;
          this.giftcardResult.push({
            name: '',
            infoTo: '',
            giftcardValues: [],
          });
        } else if (dir === 2) {
          if (Number(this.purchase_item_amount) - 1 !== 0) {
            this.purchase_item_amount = this.purchase_item_amount - 1;
            this.giftcardResult.splice(-1, 1);
          }
        }
      },
      clickPurchaseButton() {
        if (this.paid_amount == 0) {
          alert("구매하실 상품권 개수를 선택해주세요!");
          return;
        }

        var data = {
          paid_amount: this.paid_amount,
          purchase: {
            delivery_type: this.nowBuyType,
            purchase_list: []
          }
        }

        data.purchase.purchase_list = this.giftcardResult.map((value, index) => {
          var purchaseItem = Object();
          purchaseItem.name = value.name;
          if (this.nowBuyType == 'sms') {
              purchaseItem.infoTo = '+82' + value.infoTo;
          } else {
            purchaseItem.infoTo = value.infoTo;
          }
          purchaseItem.giftcard_info = [];

          value.giftcardValues.map((value, index) => {
            if (value.amount !== 0) {
              purchaseItem.giftcard_info.push({
                type: this.giftcardList[index].gift_card_unique_id,
                amount: value.amount
              })
            }
          })

          return purchaseItem
        })

        const Authorization = this.$cookie.get('Authorization');
        const before_url = this.hostname + '/apis/giftcards/before-purchase/';
        const after_url = this.hostname + '/apis/giftcards/after-purchase/';

        if (this.payment_method == 'happyCash') {
          data['is_happyCash'] = true;
          this.$http.post(before_url, data, {headers: {'Authorization': Authorization}}).then(
            response => {
              this.$router.push({
                name: 'purchase_complete',
                params: {
                  hostname: this.hostname,
                  response: response,
                  giftcardList: this.giftcardList,
                  menu: 'happyCashToGiftCard',
                  payment_method: this.payment_method,
                }
              })
            },
            error => {
              if (error.data.name) {
                alert("이름란의 빈 칸은 허용하지 않습니다.");
              }
              else if (error.data._email) {
                alert('이메일을 제대로 입력해주세요.');
              }
              else if (error.data._sms) {
                alert('번호를 제대로 입력해주세요.');
              }
              else {
                alert(error.data.detail);
              }
            }
          )
          return;
        }

        this.$http.post(before_url, data, {headers: {'Authorization': Authorization}}).then(
          response => {
            if (response.status == '201') {
              // 결제 전 정보 삽입 성공
              const merchant_uid = response.data.merchant_uid;
              const full_amount = response.data.full_amount;

              IMP.init("imp23550103");

              IMP.request_pay({
                merchant_uid: merchant_uid,
                name: merchant_uid,
                amount: full_amount,
              }, (response) => {
                if ( response.success ) {

                  const imp_uid = response['imp_uid']
                  const response_merchant_uid = response['merchant_uid']

                  const after_data = {
                    imp_uid: imp_uid,
                    merchant_uid: response_merchant_uid
                  }

                  this.$http.post(after_url, after_data, {headers: {'Authorization': Authorization}})
                  .then(
                    response => {
                      this.$router.push({
                        name: 'purchase_complete',
                        params: {
                          hostname: this.hostname,
                          response: response,
                          giftcardList: this.giftcardList,
                          menu: 'giftCard',
                          payment_method: this.payment_method,
                        }
                      })
                    },
                    error => {
                      alert(error.data.detail);
                    }
                  )
                } else {
                  alert('결제실패 : ' + response.error_msg);
                }
              })
            }
          },
          error => {
            if (error.data.name) {
              alert("이름란의 빈 칸은 허용하지 않습니다.");
            }
            else if (error.data._email) {
              alert('이메일을 제대로 입력해주세요.');
            }
            else if (error.data._sms) {
              alert('번호를 제대로 입력해주세요.');
            }
            else {
              alert(error.data.detail);
            }
          }
        )
      }
    },
    created() {
      this.getHappyGiftCard()
      this.getAPIUserProfileInfo()

      this.giftcardResult.push({
        name: '디버깅',
        infoTo: 'debug@debug.com',
        giftcardValues: [],
      });

      EventBus.$on('ChangeGiftCardValues', () => {
        this.paid_amount = 0;
        this.card_amount = 0;

        this.giftcardList.map((oneGiftCard) => {
          oneGiftCard.amount = 0;
        })

        this.giftcardResult.map((value, index) => {
          value.giftcardValues.map((value, index) => {
            this.card_amount += Number(value.amount);
            this.paid_amount += Number(value.amount) * Number(this.giftcardList[index].price);
            this.giftcardList[index].amount += Number(value.amount);
          })
        })
      })
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
  .giftcardbuyinfo {
    max-width: 1500px;
    margin: auto;

    button {
      cursor: pointer;
    }

    > .giftcardbuyinfo_category {
      display: grid;
      grid-template-columns: 1fr 1fr;

      > div {
        border: 1px solid #ccc;
        background-color: #f5f5f5;
        color: #666;
        padding: 13px 0;
        font-weight: bold;

        &.active {
          border-bottom: none;
          background-color: #fff;
          color: #222;
        }
      }
    }

    > .giftcardbuy_user {
      margin-top: 50px;
      padding-left: 30px;

      > h4 {
        text-align: left;
      }

      > .giftcardbuy_user_wrap {
        border-top: 1px solid black;
        display: grid;
        margin-bottom: 90px;

        &.giftcardbuy_user_email_wrap {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;

          > .giftcardbuy_user_name {
            grid-column: 1 / 3;
            justify-self: flex-start;
            width: 100%;
            display: grid;
            grid-template-columns: 160px auto;

            > span:nth-child(1) {
              display: block;
              padding: 10px 50px;

              border-bottom: 1px solid #dcdcdc;
              border-right: 1px solid #dcdcdc;
              background-color: #f5f5f5;
              font-weight: bold;
              font-size: 0.8em;
            }

            > span:nth-child(2) {
              display: block;

              padding-left: 20px;
              border-bottom: 1px solid #dcdcdc;
              display: flex;
              justify-content: flex-start;
              align-items: center;
            }
          }

          > .giftcardbuy_user_email_info {
            justify-self: flex-start;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 160px auto;
            align-items: center;

            > span:nth-child(1) {
              display: block;
              padding: 10px 50px;
              height: 100%;

              border-bottom: 1px solid #dcdcdc;
              border-right: 1px solid #dcdcdc;
              background-color: #f5f5f5;
              font-weight: bold;
              font-size: 0.8em;
            }

            > span {
              height: 100%;
              border-bottom: 1px solid #dcdcdc;
              display: flex;
              align-items: center;

              > input {
                width: 80%;
                margin-left: 20px;
                margin-right: 20px;
                padding: 6px 0 6px 6px;
              }
            }

          }

          > .giftcardbuy_user_sms_info {
            justify-self: flex-start;
            width: 100%;
            display: grid;
            grid-template-columns: 160px auto;
            align-items: center;

            > span:nth-child(1) {
              display: block;
              padding: 10px 50px;
              height: 100%;

              border-bottom: 1px solid #dcdcdc;
              border-right: 1px solid #dcdcdc;
              background-color: #f5f5f5;
              font-weight: bold;
              font-size: 0.8em;
            }

            > span:nth-child(2) {
              display: flex;
              align-items: center;
              height: 100%;
              border-bottom: 1px solid #dcdcdc;

              > input {
                margin: 0 5px;
                padding: 6px 0 6px 6px;
                width: 90px;
              }
            }
          }
        }

        &.giftcardbuy_user_sms_wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;

          > .giftcardbuy_user_name {
            justify-self: flex-start;
            display: grid;
            grid-template-columns: 160px auto;
            width: 100%;

            > span:nth-child(1) {
              display: block;
              padding: 10px 50px;

              border-bottom: 1px solid #dcdcdc;
              border-right: 1px solid #dcdcdc;
              background-color: #f5f5f5;
              font-weight: bold;
              font-size: 0.8em;
            }

            > span:nth-child(2) {
              display: block;

              padding-left: 20px;
              border-bottom: 1px solid #dcdcdc;
              display: flex;
              justify-content: flex-start;
              align-items: center;
            }
          }

          > .giftcardbuy_user_sms_info {
            justify-self: flex-start;
            width: 100%;
            display: grid;
            grid-template-columns: 160px auto;
            align-items: center;

            > span:nth-child(1) {
              display: block;
              padding: 10px 50px;
              height: 100%;

              border-bottom: 1px solid #dcdcdc;
              border-right: 1px solid #dcdcdc;
              background-color: #f5f5f5;
              font-weight: bold;
              font-size: 0.8em;
            }

            > span:nth-child(2) {
              display: flex;
              align-items: center;
              height: 100%;
              border-bottom: 1px solid #dcdcdc;

              > input {
                margin: 0 5px;
                padding: 6px 0 6px 6px;
                width: 90px;
              }
            }
          }
        }
      }

    }

    > .giftcardbuy_to {
      display: flex;
      flex-direction: column;
      border-top: 1px solid #dcdcdc;
      padding-left: 30px;
      padding-bottom: 30px;

      > h4 {
        text-align: left;
        margin-top: 50px;
      }

      > .giftcardbuy_to_detail_wrap {
        display: grid;
        grid-template-columns: 75% 25%;
        grid-gap: 10px;

        > .giftcardbuy_to_detail_input {
          border-spacing: 0;
          border-top: 1px solid black;

          > .giftcard_to_user_wrap {

            > td {
              border-bottom: 1px solid #dcdcdc;
              border-left: 1px solid #dcdcdc;
              padding: 10px 0;

              &:first-child {
                border-left: none;
              }

              input {
                width: 80%;
                padding: 5px 0;
                color: #666;
              }
            }
          }

          > .giftcard_to_user_wrap.title {
            background-color: #f5f5f5;

            > td {
              padding: 10px 0;
              font-weight: bold;
              font-size: 0.9em;
            }
          }
        }

        > .giftcard_to_detail_calc {

          > .giftcard_calc_result{
            font-size: 0.75em;
            border: 1px solid #dcdcdc;

            > span {
              display: block;
              background-color: #495266;
              padding: 10px 0;
              color: white;
              font-weight: bold;
            }

            > .calc_result_giftcard {
              text-align: left;
              padding: 15px 15px;

              > .calc_result_giftcard_type {
                padding: 3px 0;
                display: flex;

                > span {
                  padding-right: 5px;

                  &:last-child {
                    margin-left: auto;
                    font-weight: bold;
                    color: #f35923;
                  }
                }
              }
            }

            > .calc_result_num_of_people, .calc_result_giftcard_amount {
              padding: 5px 0;
              margin: 0 15px;
              border-top: 1px solid #dcdcdc;

              > span {
                font-weight: bold;

                > strong {
                  color: #f35923;
                }
              }
            }

            > .calc_result_full_amount {
              text-align: right;
              border-top: 1px solid #dcdcdc;
              padding: 15px 15px 15px;

              > span {
                display: block;
                font-weight: bold;

                &:last-child {
                  font-size: 1.2rem;
                  color: #f35923;
                }
              }
            }
          }

          > .giftcard_calc_desc {
            margin-top: 10px;
            padding: 20px;
            border: 1px solid #e6e6e6;
            background-color: #f8f8f8;

            > span {
              display: block;
              text-align: left;
              font-size: 0.75em;
              color: #666;
              padding: 2px 0;

              &:first-child {
                color: black;
                font-weight: bold;
              }
            }
          }
        }
      }
    }

    > .add_purchase_item {
      padding-bottom: 30px;
      border-bottom: 1px solid #dcdcdc;

      button {
        border: 1px solid #595959;
        background-color: #666;
        color: white;
        width: 28px;
        height: 28px;
        font-size: 1.2em;

        &:last-child {
          background-color: #aaa;
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

            strong {
              color: #f35923;
              font-size: 1.0rem;
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

              &:hover {
                border: 1px solid #c13b0d;
                background-color: #dd440f;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
