<template>
  <div class="giftcardbuyinfo">
    <div class="purchase_items">
      <slot v-for="(value, index) in purchase_item_amount">
        <purchaseItemComponent :index="index" :giftcardList="giftcardList" :nowBuyType="nowBuyType" :giftcardValue="giftcardResult[index]" />
      </slot>
    </div>
    <div class="add_purchase_item">
      <button type="button" name="button" @click="clickPurchaseItem(1)">+</button>
      <button type="button" name="button" @click="clickPurchaseItem(2)">-</button>
    </div>
    <div class="">
      {{ paid_amount }}
    </div>
    <div class="">
      <button type="button" name="button" @click="clickPurchaseButton()">전송</button>
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
        <div class={this.divclassName(item.gift_card_unique_id)}>
        <label class={this.giftcarduniqueClassName(item.gift_card_unique_id)}>{ item.price }</label>
        <input type="number" id={this.giftcarduniqueClassName(item.gift_card_unique_id)} v-model={this.giftcardValue.giftcardValues[gindex].amount}/>
        </div>
      )
    })

    return (
      <div class="purchase_item">
      <div class={this.divclassName('name')}>
      <label for={this.labelIDName('name')}> 이름 </label>
      <input type="text" id={this.labelIDName('name')} v-model={this.giftcardValue.name}/>
      </div>
      <div class={this.divclassName(this.nowBuyType)}>
      <label for={this.labelIDName(this.nowBuyType)}> {this.nowBuyType} </label>
      <input type="email" id={this.labelIDName(this.nowBuyType)} v-model={this.giftcardValue.infoTo} />
      </div>
      {items}
      </div>
    )
  }
}

export default {
  data() {
    return {
      nowBuyType: 'email',
      hostname: require('@/assets/js/variable.js').hostname,

      giftcardList: [],
      purchase_item_list: [],
      purchase_item_amount: 1,
      giftcardResult: [],

      paid_amount: 0
    }
  },
  components: {
    purchaseItemComponent: purchaseItemComponent
  },
  methods: {
    getHappyGiftCard() {
      const url = this.hostname + '/apis/giftcards/happy-giftcard/?delivery_type='+this.nowBuyType;
      this.$http.get(url).then(
        response => {
          if (response.status == '200') {
            this.giftcardList = response.data;
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
          purchaseItem.infoTo = value.infoTo;
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
                      console.log(response);
                    },
                    error => {
                      console.log(error);
                    }
                  )
                } else {
                  alert('결제실패 : ' + response.error_msg);
                }
              })
            }
          },
          error => {
            console.log(error);
          }
        )
      }
    },
    created() {
      this.getHappyGiftCard()

      this.giftcardResult.push({
        name: '디버깅',
        infoTo: 'debug@debug.com',
        giftcardValues: [],
      });

      EventBus.$on('ChangeGiftCardValues', () => {
        this.paid_amount = 0
        this.giftcardResult.map((value, index) => {
          value.giftcardValues.map((value, index) => {
            this.paid_amount += Number(value.amount) * Number(this.giftcardList[index].price);
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

    > .purchase_items {

      > .purchase_item {

      }
    }
  }

  </style>
