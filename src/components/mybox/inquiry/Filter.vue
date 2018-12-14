<template>
  <div class="inquiryhappyCash">
    <slot v-if="nowItem == 'happyCash'">
      <div class="use_or_save filtering">
        <div class="title">
          <span>조회구분</span>
        </div>
        <div class="content">
          <select v-model="happy_use_or_save">
            <option value="">전체</option>
            <option value="s">충전캐시</option>
            <option value="u">사용캐시</option>
          </select>
        </div>
      </div>
      <div class="status filtering">
        <div class="title">
          <span>주문상태</span>
        </div>
        <div class="content">
          <select v-model="status">
            <option value="">전체</option>
            <option value="False">주문취소</option>
            <option value="True">결제완료</option>
          </select>
        </div>
      </div>
    </slot>
    <slot v-else-if="nowItem == 'giftCard'">
      <div class="filtering">
        <div class="title">
          <span>조회구분</span>
        </div>
        <div class="content">
          <select v-model="giftcardType">
            <option value="">전체</option>
            <option value="address">해피머니 상품권</option>
            <option value="email">해피머니 상품권(이메일)</option>
            <option value="sms">해피머니 상품권(SMS)</option>
          </select>
        </div>
      </div>
    </slot>
    <slot v-else-if="nowItem == 'hammer'">
      <div class="use_or_save filtering">
        <div class="title">
          <span>조회구분</span>
        </div>
        <div class="content">
          <select v-model="hammer_use_or_save">
            <option value="">전체</option>
            <option value="s">충전캐시</option>
            <option value="u">사용캐시</option>
          </select>
        </div>
      </div>
    </slot>
    <div class="date filtering">
      <div class="title">
        <span>조회기간</span>
      </div>
      <div class="content">
        <span class="datebutton" @click="calcDateRange(7, 1)" :class="{active: dateRangeActive == 1}">1주일</span>
        <span class="datebutton" @click="calcMonthRange(1, 2)" :class="{active: dateRangeActive == 2}">1개월</span>
        <span class="datebutton" @click="calcMonthRange(3, 3)" :class="{active: dateRangeActive == 3}">3개월</span>
        <Datepicker v-model="pre" :format="'yyyy-MM-dd'"/>
        <span> ~&nbsp;&nbsp;</span>
        <Datepicker v-model="now" :format="'yyyy-MM-dd'"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';

  export default {
    props: ['nowItem'],
    data() {
      return {
        happy_use_or_save: '',
        status: '',

        giftcardType: '',

        hammer_use_or_save: '',

        now: new Date(),
        pre: new Date(),
        dateRangeActive: 1,
      }
    },
    components: {
      Datepicker
    },
    methods: {
      calcDateRange(value, active_number) {
        this.now = new Date();
        this.pre = new Date(this.pre.setDate(this.now.getDate() - value));
        this.dateRangeActive = active_number;
      },
      calcMonthRange(value, active_number) {
        this.now = new Date();
        this.pre = new Date(this.pre.setMonth(this.now.getMonth() - value));
        this.dateRangeActive = active_number;
      }
    },
    created() {
      this.calcDateRange(7);
      this.dateRangeActive = 1;
    }
  }
</script>

<style lang="scss">

  .inquiryhappyCash {
    padding: 30px 28px 25px;
    margin: -30px 0 50px;
    border: 1px solid #e6e6e6;
    background-color: #f5f5f5;

    > .filtering {
      display: grid;
      grid-template-columns: 1fr 7fr;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      > .title {
        font-size: 0.9em;
        font-weight: bold;
        align-self: center;
      }

      > .content {
        display: flex;
        align-items: center;

        > select {
          background-color: white;
          padding: 3px 0 3px 10px;
        }

        > span.datebutton {
          display: inline-block;
          border: 1px solid #666;
          background-color: #fff;
          color: #222;
          padding: 3px 15px;
          margin-right: 10px;
          font-size: 0.8em;
          font-weight: bold;
          cursor: pointer;

          &.active {
            border: 1px solid #454545;
            background-color: #4f4f4f;
            color: #fff;
          }
        }

        > .vdp-datepicker {
          margin-right: 10px;

          input {
            display: inline-block;
            width: 100px;
            height: 12px;
            padding: 12px 0;
            color: #666;
            padding-left: 10px;
          }
        }

      }
    }
  }

</style>
