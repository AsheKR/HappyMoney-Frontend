<template>
  <div class="card">
    <div class="purchase_items">
      <slot v-for="(value, index) in purchase_item_amount">
        <purchaseItemComponent :index="index" :giftcardList="giftcardList" :nowBuyType="nowBuyType" />
      </slot>
    </div>
    <div class="add_purchase_item">
      <button type="button" name="button" @click="clickPurchaseItem(1)">+</button>
      <button type="button" name="button" @click="clickPurchaseItem(2)">-</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { EventBus } from '@/components/common/EventBus.js';

const purchaseItemComponent = {
  props: ['index', 'giftcardList', 'nowBuyType'],
  data() {
    return {
      name: '',
      buyType: '',
      giftcardValue: []
    }
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
    const items = this.giftcardList.map((item, index) => {
      return (
        <div class={this.divclassName(item.gift_card_unique_id)}>
          <label class={this.giftcarduniqueClassName(item.gift_card_unique_id)}>{ item.price }</label>
          <input type="number" id={this.giftcarduniqueClassName(item.gift_card_unique_id)} value="너에게 보냄" />
        </div>
      )
    })
    return (
      <div class="purchase_item">
        <div class={this.divclassName('name')}>
          <label for={this.labelIDName('name')}> 이름 </label>
          <input type="text" id={this.labelIDName('name')} value="너에게 보냄" v-model={this.name}/>
        </div>
        <div class={this.divclassName(this.nowBuyType)}>
          <label for={this.labelIDName(this.nowBuyType)}> {this.nowBuyType} </label>
          <input type="text" id={this.labelIDName(this.nowBuyType)} value="email@email.com" />
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
      } else if (dir === 2) {
        this.purchase_item_amount = this.purchase_item_amount - 1;
      }
    }
  },
  created() {
    this.getHappyGiftCard()
  },
  mounted() {

  }
}
</script>

<style lang="scss">

  .card {

    > .purchase_items {

      > .purchase_item {

      }
    }
  }

</style>
