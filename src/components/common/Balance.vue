<template>
  <div class="balance">
    <div class="userInfo">
      <img :src="require('@/assets/css/images/card/memberImg.png')" alt="">
      <div class="userInfo_desc">
        <span v-if="userInfo">{{ userInfo.name }}님</span>
        <span>결제비밀번호 신청하기</span>
        <span>키보드보안</span>
      </div>
    </div>
    <div class="happyCash cash">
      <span>해피캐시 잔액</span>
      <span>
        <strong v-if="userInfo">{{ numberToLocaleString(userInfo.happy_cash) }}</strong>원
      </span>
    </div>
    <div class="hammer cash">
      <span>해머 잔액</span>
      <span>
        <strong v-if="userInfo">{{ numberToLocaleString(userInfo.hammer) }}</strong>톤
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hostname: require('@/assets/js/variable.js').hostname,
      userInfo: undefined,
      show: false,
    }
  },
  methods: {
    numberToLocaleString(value) {
      return value.toLocaleString()
    },
    getAPIUserProfileInfo() {
      const url = this.hostname + '/apis/members/get/';
      const Authorization = this.$cookie.get('Authorization');
      this.$http.get(url, {headers: {'Authorization': Authorization}}).then(
        response => {
          if (response.status == '200') {
            this.userInfo = response.data;
          }
        },
        error => {
          
        });
    },
  },
  created() {
    this.getAPIUserProfileInfo()
  },
  mounted() {
    this.show = true;
  }
}
</script>

<style lang="scss">

  .balance {
    background-color: #1c385d;
    height: 175px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: auto;
    color: white;

    > .userInfo {
      background-color: #142d4e;
      display: flex;
      align-items: center;
      padding: 0 20px;

      > .userInfo_desc {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-left: 10px;
        font-size: 0.7em;
        font-weight: bold;

        > span:first-child {
          font-size: 1.0rem;
          margin-bottom: 10px;
        }
      }

    }

    > .cash {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      margin: 0 20px;
      align-items: center;
      font-size: 0.8em;
      font-weight: bold;

      > span:first-child {
        font-size: 1.0rem;
      }

      > span:last-child {
        grid-row: 2;
        grid-column: 2;

        > strong {
          font-size: 3rem;
          font-weight: normal;
          color: #ff5b22;
        }
      }
    }
  }

</style>
