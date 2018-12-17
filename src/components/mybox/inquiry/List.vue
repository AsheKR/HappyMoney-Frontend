<template>
  <div class="myboxInquiryList">
    <div class="myBoxHome__recent">
      <div class="myBoxHome__recent__ordering">
        <h4>주문 내역</h4>
      </div>
      <table class="myBoxHome__recentWrap" v-if="nowItem == 'giftCard'">
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
      <table class="myBoxHome__recentWrap" v-if="nowItem == 'hammer'">
        <tr class="myBoxHome__recent myBoxHome__recent--desc">
          <th class="myBoxHome__recent--item">
            <span> <strong> 날짜 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 내용 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 사용해머 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 적립해머 </strong> </span>
          </th>
        </tr>
        <tr class="myBoxHome__recent" v-for="order in orderList" :key="order.id">
          <td class="myBoxHome__recent--item">
            <span>{{ dateHumanize(order.created_at) }}</span>
          </td>
          <td class="myBoxHome__recent--item">
            <span>{{ order.merchant_uid }}</span>
          </td>
          <td class="myBoxHome__recent--item myBoxHome__recent--won">
            <span>{{ order.use_or_save == 'u' ? order.amount+'톤' : ''  }}</span>
          </td>
          <td class="myBoxHome__recent--item myBoxHome__recent--won">
            <span>{{ order.use_or_save == 's' ? order.amount+'톤' : ''  }}</span>
          </td>
        </tr>
      </table>
      <table class="myBoxHome__recentWrap" v-if="nowItem == 'happyCash'">
        <tr class="myBoxHome__recent myBoxHome__recent--desc">
          <th class="myBoxHome__recent--item">
            <span> <strong> 주문번호 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 날짜 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 사용캐시(원) </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 충전캐시(원) </strong> </span>
          </th>
        </tr>
        <tr class="myBoxHome__recent" v-for="order in orderList" :key="order.id">
          <td class="myBoxHome__recent--item">
            <span>{{ order.merchant_uid.split('_')[1] }}</span>
          </td>
          <td class="myBoxHome__recent--item">
            <span>{{ dateHumanize(order.created_at) }}</span>
          </td>
          <td class="myBoxHome__recent--item myBoxHome__recent--won">
            <span>{{ order.use_or_save == 'u' ? order.amount+'원' : ''  }}</span>
          </td>
          <td class="myBoxHome__recent--item myBoxHome__recent--won">
            <span>{{ order.use_or_save == 's' ? order.amount+'원' : ''  }}</span>
          </td>
        </tr>
      </table>
      <table class="myBoxHome__recentWrap" v-if="nowItem == 'emailGiftCard' | nowItem == 'smsGiftCard'">
        <tr class="myBoxHome__recent myBoxHome__recent--desc">
          <th class="myBoxHome__recent--item">
            <span> <strong> 주문번호 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 수령인 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span v-if="nowItem == 'emailGiftCard'"> <strong> 이메일 </strong> </span>
            <span v-if="nowItem == 'smsGiftCard'"> <strong> 연락처 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> <p>핀번호</p> <p>(발행일)</p> </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> <p>사용</p> <p>여부</p> </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 금액 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 주문일 </strong> </span>
          </th>
          <th class="myBoxHome__recent--item">
            <span> <strong> 재발송 </strong> </span>
          </th>
        </tr>
        <tr class="myBoxHome__recent" v-for="(order, index) in orderList" :key="order.id">
          <td class="myBoxHome__recent--item">
            <span>{{ order.created_in_order.order_gift_card.merchant_uid.split('_')[1] }}</span>
          </td>
          <td class="myBoxHome__recent--item">
            {{ order.created_in_order.order_gift_card.name }}
          </td>
          <td class="myBoxHome__recent--item">
            <span v-if="nowItem == 'emailGiftCard'"> <strong> {{ order.created_in_order.order_gift_card.email }} </strong> </span>
            <span v-if="nowItem == 'smsGiftCard'"> <strong> {{ '0'+order.created_in_order.order_gift_card.sms.split('+82')[1] }} </strong> </span>
          </td>
          <td class="myBoxHome__recent--item">
            <p>{{ order.PIN }}</p>
            <p>{{ order.created_at }}</p>
          </td>
          <td class="myBoxHome__recent--item">
            <span v-if="order.is_used == false">미사용</span>
            <span v-else>사용</span>
          </td>
          <td class="myBoxHome__recent--item">
            {{ order.created_in_order.gift_card.price }}
          </td>
          <td class="myBoxHome__recent--item">
            {{ dateHumanizeYYMMDD(order.created_in_order.order_gift_card.created_at) }}
          </td>
          <td class="myBoxHome__recent--item">
            재발송
          </td>
        </tr>
      </table>
    </div>
    <div class="nowEvent__pagination">
      <a @click.prevent="getMyBoxInquryEventBus(pre)" v-if="pre"><</a>
      <a @click.prevent="getMyBoxInquryEventBus(page[1])" v-for="page in pageList" :class="{ active: page[2] }">
        <span v-if="page[1] == null">...</span>
        <span v-else>{{ page[1] }}</span>
      </a>
      <a @click.prevent="getMyBoxInquryEventBus(next)" v-if="next">></a>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '@/components/common/EventBus.js'

  export default {
    props: ['orderResponse', 'nowItem'],
    watch: {
      orderResponse: {
        handler(val) {
          this.orderList = val.results;
          if (val.next !== null) {
            this.next = val.next.split('&page=')[1].slice(0, 1);
          } else {
            this.next = null;
          }
          if (val.previous !== null) {
            this.pre = val.previous.split('&page=')[1];
            if (this.pre == null) {
              this.pre = 1;
            } else {
              this.pre = this.pre.slice(0, 1);
            }
          } else {
            this.pre = null;
          }
          this.pageList = val.page_links;
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
        pageList: undefined,

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
      dateHumanizeYYMMDD(dateStr) {
        var date = new Date(dateStr);
        return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + this.getTwpDigits(date.getDate())
      },
      dateHumanize(dateStr) {
        var date = new Date(dateStr);
        return this.getTwpDigits(date.getFullYear()) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + this.getTwpDigits(date.getDate()) + ' ' + this.getTwpDigits(date.getHours()) + ':' +this.getTwpDigits(date.getMinutes())
      },
      getTwpDigits(date) {
        return ("0" + date).slice(-2);
      },
      getMyBoxInquryEventBus(page) {
        const object = {
          page_direction: true,
          page: page,
        }
        EventBus.$emit('getMyBoxInquryEventBus', object);
      }
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
    }

    > .nowEvent__pagination {
      margin-top: 50px;

      > a {
        display: inline-block;
        padding: 7px 11px;
        background-color: white;
        border: 1px solid #ccc;
        cursor: pointer;

        &.active {
          background-color: black;
          color: white;
          border: 1px solid black;
        }
      }
    }
  }

</style>
