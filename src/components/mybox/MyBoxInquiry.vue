<template>
  <div class="myboxInquiry">
    <div class="myboxInquiry__title">
      <span>{{ this.title }}</span>
      <span>즐거움과 생활이 연결되는 새로운 선물문화</span>
      <img :src="require('@/assets/css/images/mybox/tlUtil.png')" alt="">
    </div>
    <FilterInquiry :nowItem="menu"/>
    <ListInquiry :nowItem="menu" :orderResponse="orderResponse"/>
  </div>
</template>

<script>
import FilterInquiry from '@/components/mybox/inquiry/Filter.vue'
import ListInquiry from '@/components/mybox/inquiry/List.vue'
import { EventBus } from '@/components/common/EventBus.js'

export default {
  props: ['hostname'],
  data() {
    return {
      menu: undefined,
      title: '',

      orderResponse: undefined,
    }
  },
  components: {
    FilterInquiry,
    ListInquiry,
  },
  watch: {
    '$route.query.name': function() {
      this.menu = this.$route.query.name;
      this.title = this.$route.query.title;
      this.getOrderList(Object());
    }
  },
  methods: {
    dateToUrl(date) {
      return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    },
    getOrderList(object) {
      if ( this.menu == 'happyCash' ) {
        this.getOrderHappyCashList(object);
      } else if (this.menu == 'hammer') {
        this.getOrderHammerList(object);
      } else if (this.menu == 'giftCard') {
        this.getOrderGiftCardList(object);
      }
    },
    undefinedToEmptyString(value) {
      if (value == undefined) {
        return '';
      }
      return value;
    },
    getOrderGiftCardList(object) {
      var start = this.undefinedToEmptyString(object.start);
      var end = this.undefinedToEmptyString(object.end);
      const giftcardType = this.undefinedToEmptyString(object.giftcardType);

      if (start !== '') {
        start = this.dateToUrl(start);
        end = this.dateToUrl(end);
      }

      const url = this.hostname + '/apis/giftcards/purchase-list/?created_at__lt='+start
          +'&created_at__gte='+end+'&delivery_type='+giftcardType;
      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            console.log(response);
            this.orderResponse = response.data;
          }
        },
        error => {
          console.log(error);
        });
    },
    getOrderHappyCashList(object) {
      const url = this.hostname + '/apis/cashes/purchase-list/?hammer_or_cash=hc';
      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.orderResponse = response.data;
          }
        },
        error => {
          console.log(error);
        });
    },
    getOrderHammerList(object) {
      const url = this.hostname + '/apis/cashes/purchase-list/?hammer_or_cash=hm';
      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.orderResponse = response.data;
          }
        },
        error => {
          console.log(error);
        });
    }
  },
  created() {
    this.menu = this.$route.query.name;
    this.title = this.$route.query.title;
    this.getOrderList(Object());

    EventBus.$on('myBoxInquiryfilterItem', (object) => {
      this.getOrderList(object);
    })
  }
}
</script>

<style lang="scss">
  .myboxInquiry {

    > .myboxInquiry__title {
      display: flex;
      flex-direction: column;
      padding: 20px;
      margin-bottom: 30px;
      border: 1px solid #deac1f;
      background-color: #fec524;
      position: relative;

      > span {
        text-align: left;

        &:first-child {
          font-size: 1.2em;
          font-weight: normal;
          color: black;
        }

        &:nth-child(2) {
          font-size: 0.8em;
          color: #666;
        }
      }

      img {
        position: absolute;
        right: 0;
      }
    }
  }
</style>
