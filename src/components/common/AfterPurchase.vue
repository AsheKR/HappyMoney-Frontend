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
            <div class="merchant_uid">
              <span>주문번호</span>
              <span>{{ response.data[0].merchant_uid }}</span>
            </div>
            <div class="paid_amount">
              <span>총 결제금액</span>
              <span>{{ response.data[0].full_amount }} 원</span>
            </div>
          </div>
        </div>
        <span>* 주문내역 및 증빙서류는 <strong>마이페이지 > 이용현황 > 해피캐시 내역조회</strong> 에서 확인 및 출력 가능합니다</span>
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
      }
    },
    components: {
      Balance
    },
    created() {
      this.userInfo = this.$route.params.userInfo;
      this.response = this.$route.params.response;
      console.log(this.response);
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

              > span:last-child {
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
