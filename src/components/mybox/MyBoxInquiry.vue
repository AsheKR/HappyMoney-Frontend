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
      this.getOrderList();
    }
  },
  methods: {
    getOrderList() {
      if ( this.menu == 'happyCash' ) {
        this.getOrderHappyCashList();
      } else if (this.menu == 'hammer') {
        this.getOrderHammerList();
      } else if (this.menu == 'giftCard') {
        this.getOrderGiftCardList();
      }
    },
    getOrderGiftCardList() {
      const url = this.hostname + '/apis/giftcards/purchase-list/'
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
    getOrderHappyCashList() {

    },
    getOrderHammerList() {

    }
  },
  created() {
    this.menu = this.$route.query.name;
    this.title = this.$route.query.title;
    this.getOrderList();
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
