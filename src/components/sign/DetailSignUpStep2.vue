<template>
  <div class="signUpDetailStep2">
    <h2>회원가입</h2>
    <div class="signUpDetailStep2Wrap">
      <div class="signUpDetailStep2__step--img" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/stepCol4.gif')+')' }"></div>
      <div class="signUpDetailTitle">
        <h4>약관동의</h4>
        <span class="signUpDetailTitle--title">
          <label for="signupallowAll">모두 동의</label>
          <input type="checkbox" id="signupallowAll" v-model="checkAll" @click="clickAllOrNot()">
        </span>
      </div>
      <div class="signUpDetailStep2__ide__wrap">
        <div class="signUpDetailStep2__item">
          <span class="signUpDetailStep2__item--title">
            <span>서비스 이용약관</span>
            <span>
              <label for="serviceAllow">동의 (필수)</label>
              <input type="checkbox" id="serviceAllow" value="serviceAllow" v-model="checkedList" >
            </span>
          </span>
          <div class="signUpDetailStep2__item--content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div class="signUpDetailStep2__item">
          <span class="signUpDetailStep2__item--title">
            <span>해피캐시 이용약관</span>
            <span>
              <label for="happyAllow">동의 (필수)</label>
              <input type="checkbox" id="happyAllow" value="happyAllow" v-model="checkedList">
            </span>
          </span>
          <div class="signUpDetailStep2__item--content">

          </div>
        </div>
        <div class="signUpDetailStep2__item">
          <span class="signUpDetailStep2__item--title">
            <span>개인정보의 수집, 이용안내</span>
            <span>
              <label for="privateAllow">동의 (필수)</label>
              <input type="checkbox" id="privateAllow" value="privateAllow" v-model="checkedList">
            </span>
          </span>
          <div class="signUpDetailStep2__item--content">

          </div>
        </div>
        <div class="signUpDetailStep2__item">
          <span class="signUpDetailStep2__item--title">
            <span>개인정보의 취급 위탁</span>
            <span>
              <label for="privateCarryAllow">동의 (필수)</label>
              <input type="checkbox" id="privateCarryAllow" value="privateCarryAllow" v-model="checkedList">
            </span>
          </span>
          <div class="signUpDetailStep2__item--content">

          </div>
        </div>
      </div>

      <div class="signUpDetailStep2__button">
        <div class="signUpDetailStep2__button--reset" @click.prevent="$router.go(-1)">
          <a href="#"><span>취소</span></a>
        </div>
        <div class="signUpDetailStep2__button--agree" @click.prevent="isAllAgree()">
          <a href="#"><span>다음</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkedList: [],
        checkAll: false
      }
    },
    watch: {
      checkedList: function() {
        if (this.checkedList.length == 4) {
          this.checkAll = true;
        } else {
          this.checkAll = false;
        }
      }
    },
    methods: {
      clickAllOrNot() {
        if (this.checkAll == true) {
          this.checkedList = [];
        }else {
          this.checkedList = [];
          this.checkedList.push('serviceAllow', 'happyAllow', 'privateAllow', 'privateCarryAllow');
        }
        this.checkAll = !this.checkAll;
      },
      isAllAgree() {
        if (this.checkedList.length !== 4) {
          alert('모두 동의하기를 눌러주세요.');
        } else {
          this.$router.push({ name: 'signup/step3' });
        }
      }
    }
  }
</script>

<style lang="scss">
  .signUpDetailStep2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .signUpDetailStep2Wrap {

      max-width: 850px;

      > .signUpDetailStep2__step--img {
        background-repeat: no-repeat;
        background-position: 0 -90px;
        margin: auto;
        width: 850px;
        height: 90px;
      }

      > .signUpDetailTitle {
        display: flex;
        align-items: center;
        margin: 30px 0;

        > h4 {
          margin: 0;
        }

        > .signUpDetailTitle--title {
          display: flex;
          align-items: center;
          margin-left: auto;
          font-size: 0.8em;
          color: #f35923;
          font-weight: bold;

          > input[type=checkbox] {
            margin: 0 10px;
          }
        }
      }

      > .signUpDetailStep2__ide__wrap {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 20px;

        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;

        padding: 40px 0;
        margin-bottom: 50px;

        > .signUpDetailStep2__item {
          display: flex;
          flex-direction: column;

          > span.signUpDetailStep2__item--title {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 0.9em;

            > span:nth-child(2) {
              margin-left: auto;
              color: #f35923;
              font-weight: normal;
              font-size: 0.88em;
              display: flex;
              align-items: center;

              > input[type=checkbox] {
                margin: 3px 0 0 15px;
              }
            }
          }

          >.signUpDetailStep2__item--content {
            overflow: auto;
            overflow-y: scroll;
            overflow-x: hidden;
            width: 413px;
            height: 174px;
            border: 1px solid #ccc;
            font-size: 0.85em;
            color: #767676;
            text-align: left;

            padding: 10px;
          }
        }
      }

      > .signUpDetailStep2__button {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 10px;
        margin-bottom: 90px;

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
