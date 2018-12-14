<template>
  <div class="myboxInquiryList">
    <div class="myBoxHome__recent">
      <div class="myBoxHome__recent__ordering">
        <h4>최근 이용현황</h4>
      </div>
      <table class="myBoxHome__recentWrap">
        <tr class="myBoxHome__recent myBoxHome__recent--desc">
          <th class="myBoxHome__recent--item">
            <span> <strong> 주문번호 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 주문일시 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 상품명 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 주문금액 (원)</strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 주문상태 </strong> </span>
          </th>
        </tr>
        <tr class="myBoxHome__recent" v-for="order in orderList" :key="order.id">
          <td class="myBoxHome__recent--item">
            <span>{{ order.merchant_uid.split('_')[1] }}</span>
          </td>
          <td class="myBoxHome__recent--item">
            <span>{{ dateHumanize(order.created_at) }}</span>
          </td>
          <td class="myBoxHome__recent--item">
            <span>{{ giftcardTypeHumanize(order.delivery_type) }}</span>
          </td>
          <td class="myBoxHome__recent--item myBoxHome__recent--won">
            <span>{{ numberToLocaleString(order.full_amount) }}</span>
          </td>
          <td class="myBoxHome__recent--item">
            <span v-if="order.is_purchase == true">결제완료</span>
            <span v-if="order.is_purchase == false">주문취소</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['orderResponse'],
    watch: {
      orderResponse: {
        handler(val) {
          this.orderList = val.results;
        },
        deep: true
      },
      orderList: {
        handler(val) {
          if (this.orderList == undefined) {
            this.orderList = this.orderResponse;
          }
        },
        deep: true
      },
    },
    data() {
      return {
        pre: undefined,
        next: undefined,
        orderList: [],
      }
    },
    methods: {
      numberToLocaleString(value) {
        return value.toLocaleString()
      },
      giftcardTypeHumanize(type) {
        if (type == 'sms') {
          return '해피머니 온라인상품권(SMS)';
        } else if (type == 'email') {
          return '해피머니 온라인상품권(EMAIL)';
        } else if (type == 'address') {
          return '해피머니 온라인상품권';
        }
      },
      dateHumanize(dateStr) {
        var date = new Date(dateStr);
        return this.getTwpDigits(date.getFullYear()) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + this.getTwpDigits(date.getDate()) + ' ' + this.getTwpDigits(date.getHours()) + ':' +this.getTwpDigits(date.getMinutes())
      },
      getTwpDigits(date) {
        return ("0" + date).slice(-2);
      },
    }
  }
</script>

<style lang="scss">

  .myboxInquiryList {

    > .myBoxHome__recent {
      margin-bottom: 50px;

      > .myBoxHome__recent__ordering {
        margin-top: 30px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        > h4 {
          font-size: 1.3em;
          margin: 0;
          margin-right: auto;
        }

        > div {
          display: inline-block;
          border: 1px solid #ccc;
          background-color: white;
          font-size: 0.9em;
          padding: 5px 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;

          font-size: 0.8em;
          color: #666;

          &.active {
            border: 1px solid #454545;
            background-color: #4f4f4f;
            color: #fff;
          }

          > span {
            padding: 0 15px;
          }
        }
      }

      > .myBoxHome__recentWrap {
            border-spacing: 0;
            width: 100%;

        > tr.myBoxHome__recent {

          > .myBoxHome__recent--item {
            padding: 10px 0;
            font-size: 0.8em;
            color: #666;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;

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
              color: black !important;
              text-align: center;
            }
          }
        }
      }
    }
  }

</style>
