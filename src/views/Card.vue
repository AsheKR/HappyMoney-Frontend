<template >
  <div class="card">
    <Breadcrumb />
    <div class="cardCategoryWrap">
      <div class="cardCategory">
        <div class="address" :class="{ active: nowBuyType == 'address' }" @click="nowBuyType='address'">
          <span class="giftCardPurchaseIcon address" :class="{ active: nowBuyType == 'address' }"></span>
          <span>해피머니</span>
          <span>상품권</span>
        </div>
        <div class="email" :class="{ active: nowBuyType == 'email' }" @click="nowBuyType='email'">
          <span class="giftCardPurchaseIcon email" :class="{ active: nowBuyType == 'email' }"></span>
          <span>해피머니온라인상품권</span>
          <span>(이메일)</span>
        </div>
        <div class="sms" :class="{ active: nowBuyType == 'sms' }" @click="nowBuyType='sms'">
          <span class="giftCardPurchaseIcon sms" :class="{ active: nowBuyType == 'sms' }"></span>
          <span>해피머니온라인상품권</span>
          <span>(SMS)</span>
        </div>
      </div>
    </div>
    <div class="cardCategoryComment">
      <div class="cardcomment">
        <span class="giftCardComment comment_1"></span>
        <div class="cardcomment--content">
          <span>권종</span>

        </div>
      </div>
      <div class="cardcomment">
        <span class="giftCardComment comment_2"></span>
        <div class="cardcomment--content">
          <span>구입처</span>
          <span>온라인 / 오프라인</span>
        </div>
      </div>
      <div class="cardcomment cardcommentCenter">
        <span class="giftCardComment comment_3"></span>
        <div class="cardcomment--content">
          <span>해피머니 상품권</span>
          <span>화폐처럼 사용하는</span>
          <span>국내 최초 온-오프라인 통합 상품권</span>
        </div>
      </div>
      <div class="cardcomment">
        <span class="giftCardComment comment_4"></span>
        <div class="cardcomment--content">
          <span>사용처</span>
          <span>2만여 오프라인 사용처</span>
          <span>800여 온라인, 모바일 사용처</span>
        </div>
      </div>
      <div class="cardcomment">
        <span class="giftCardComment comment_5"></span>
        <div class="cardcomment--content">
          <span>유효기간</span>
          <span>발행일로부터 5년</span>
        </div>
      </div>
    </div>
    <router-view :nowBuyType="nowBuyType" />
  </div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb.vue'

export default {
  name: 'joinStoreView',
  data() {
    return {
      hostname: require('@/assets/js/variable.js').hostname,
      nowBuyType: 'email',
    }
  },
  components: {
    Breadcrumb,
  },
}
</script>

<style lang="scss">

  .card {

    > .cardCategoryWrap {
      background-color: #dd5e2e;
      padding-top: 30px;
      justify-content: center;

      > .cardCategory {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        border-top: 1px solid #ae4017;
        max-width: 1500px;
        margin: auto;

        > div {
          background-color: #ce4f1f;
          border-right: 1px solid #ae4017;
          color: white;
          font-weight: bold;
          font-size: 0.8em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 22px;
          padding-bottom: 30px;
          cursor: pointer;

          > span:not(.giftCardPurchaseIcon) {
            margin-top: 5px;
          }

          > span.giftCardPurchaseIcon {
            margin-bottom: 10px;
          }


          &:last-child {
            border-right: none;
          }

          &.active {
            background-color: #fff;
            color: #222;
          }
        }

      }
    }

    > .cardCategoryComment {
      display: grid;
      grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr;
      max-width: 1500px;
      margin: 50px auto 50px;

      > .cardcomment {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #666;

        &.cardcommentCenter {
          > div {
            > span {
              font-size: 0.9em;
              display: flex;
              flex-direction: column;

              &:nth-child(1) {
                font-size: 1.3rem;
                color: black;
              }
            }
          }
        }

        &:not(.cardcommentCenter) {
          display: grid;
          grid-template-rows: 1.5fr 1fr;

          > span.giftCardComment {
            justify-self: center;
          }
          > div {
            align-self: flex-start;
            font-size: 0.8em;
            display: flex;
            flex-direction: column;

            > span:nth-child(1) {
              font-weight: bold;
            }
          }
        }
      }
    }
  }

</style>
