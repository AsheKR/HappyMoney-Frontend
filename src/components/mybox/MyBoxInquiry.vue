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
      nowSearchObject: undefined,
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
      } else if (this.menu == 'smsGiftCard') {
        this.getOrderSMSPINList(object);
      } else if (this.menu == 'emailGiftCard') {
        this.getOrderEmailPINList(object);
      }
    },
    undefinedToEmptyString(value) {
      if (value == undefined) {
        return '';
      }
      return value;
    },
    calcStartEnd(start, end) {
      if (start !== '') {
        start = this.dateToUrl(new Date(start.setDate(start.getDate() + 1)));
        end = this.dateToUrl(end);
      }

      const startEndObject = {
        start: start,
        end: end
      }

      return startEndObject
    },
    getOrderGiftCardList(object) {
      var page = 1;
      if (object.page_direction) {
        page = object.page;
      } else {
        var start = this.undefinedToEmptyString(object.start);
        var end = this.undefinedToEmptyString(object.end);
        const giftcardType = this.undefinedToEmptyString(object.giftcardType);

        const startEndObject = this.calcStartEnd(start, end);
        this.nowSearchObject = {
          startEndObject: startEndObject,
          giftcardType: giftcardType,
        }
      }

      const url = this.hostname + '/apis/giftcards/purchase-list/?created_at__lte='+this.nowSearchObject.startEndObject.start
          +'&created_at__gte='+this.nowSearchObject.startEndObject.end+'&delivery_type='+this.nowSearchObject.giftcardType
          +'&page='+page;
      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.orderResponse = response.data;
          }
        },
        error => {

        });
    },
    getOrderHappyCashList(object) {
      var page = 1;
      if (object.page_direction) {
        page = object.page;
      } else {
        var start = this.undefinedToEmptyString(object.start);
        var end = this.undefinedToEmptyString(object.end);
        var use_or_save = this.undefinedToEmptyString(object.happy_use_or_save)

        const startEndObject = this.calcStartEnd(start, end);
        this.nowSearchObject = {
          startEndObject: startEndObject,
          use_or_save: use_or_save,
        }
      }

      const url = this.hostname + '/apis/cashes/purchase-list/?hammer_or_cash=hc&use_or_save='+this.nowSearchObject.use_or_save
                  +'&created_at__lte='+this.nowSearchObject.startEndObject.start
                  + '&created_at__gte='+this.nowSearchObject.startEndObject.end
                  +'&page='+page;

      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.orderResponse = response.data;
          }
        },
        error => {

        });
    },
    getOrderHammerList(object) {
      var page = 1;
      if (object.page_direction) {
        page = object.page;
      } else {
        var start = this.undefinedToEmptyString(object.start);
        var end = this.undefinedToEmptyString(object.end);
        var use_or_save = this.undefinedToEmptyString(object.hammer_use_or_save)

        const startEndObject = this.calcStartEnd(start, end);
        this.nowSearchObject = {
          startEndObject: startEndObject,
          use_or_save: use_or_save,
        }
      }

      const url = this.hostname + '/apis/cashes/purchase-list/?hammer_or_cash=hm&use_or_save='+this.nowSearchObject.use_or_save
                  +'&created_at__lte='+this.nowSearchObject.startEndObject.start
                  + '&created_at__gte='+this.nowSearchObject.startEndObject.end
                  +'&page='+page;

      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.orderResponse = response.data;
          }
        },
        error => {

        });
    },
    getOrderSMSPINList(object) {
      var page = 1;
      if (object.page_direction) {
        page = object.page;
      } else {
        var start = this.undefinedToEmptyString(object.start);
        var end = this.undefinedToEmptyString(object.end);

        const startEndObject = this.calcStartEnd(start, end);
        this.nowSearchObject = {
          startEndObject: startEndObject,
        }
      }

      const url = this.hostname + '/apis/giftcards/pin-list/?delivery_type=sms'
                                +'&created_at__lte='+this.nowSearchObject.startEndObject.start
                                + '&created_at__gte='+this.nowSearchObject.startEndObject.end
                                +'&page='+page;

      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.orderResponse = response.data;
          }
        },
        error => {

        });
    },
    getOrderEmailPINList(object) {
      var page = 1;
      if (object.page_direction) {
        page = object.page;
      } else {
        var start = this.undefinedToEmptyString(object.start);
        var end = this.undefinedToEmptyString(object.end);

        const startEndObject = this.calcStartEnd(start, end);
        this.nowSearchObject = {
          startEndObject: startEndObject,
        }
      }

      const url = this.hostname + '/apis/giftcards/pin-list/?delivery_type=email'
                                +'&created_at__lte='+this.nowSearchObject.startEndObject.start
                                + '&created_at__gte='+this.nowSearchObject.startEndObject.end
                                +'&page='+page;

      const Authorization = this.$cookie.get('Authorization');

      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.orderResponse = response.data;
          }
        },
        error => {
          
        });
    },
  },
  created() {
    this.menu = this.$route.query.name;
    this.title = this.$route.query.title;
    this.getOrderList(Object());

    EventBus.$on('myBoxInquiryfilterItem', (object) => {
      this.getOrderList(object);
    })
    EventBus.$on('getMyBoxInquryEventBus', (object) => {
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
