<template>
  <div id="loginDetail">
    <div class="loginFormWrap">
      <div class="left">
        <h2>로그인</h2>
        <span class="error" v-if="this.errors.items.length !== 0">{{ errorMessage }}</span>
        <span class="error" v-else-if="validateErrorMessage">{{ validateErrorMessage }}</span>
        <form class="" @submit.prevent="loginWithTokenAuth">
          <div class="inputText" :class="{error: errors.has('signInId')}">
              <input name="signInId" type="text" placeholder="아이디" v-model="signInId" v-validate.bails="'required'" >
          </div>
          <div class="inputText" :class="{error: errors.has('signInPw')}">
            <input name="signInPw" type="password" placeholder="비밀번호" v-model="signInPw" v-validate.bails="'required'" >
          </div>
          <button type="submit" name="button" class="signIn">로그인</button>
        </form>
        <div class="signMore">
          <a href="#">아이디/비밀번호 찾기</a>
          <router-link :to="{ name: 'signup' }">회원가입</router-link>
        </div>
        <button type="button" name="button">MyOTP보안 로그인 (유료)</button>
        <button type="button" name="button">휴대폰 간편 로그인 (유료)</button>
        <div class="secure">
          <p>보안 프로그램 안내</p>
        </div>
        <p class="secure_detail">※ MyOTP(유료) 서비스는 인증 회원만 이용 가능합니다.</p>
      </div>
      <div class="right">
        <div class="secure_image">
          <img :src="require('@/assets/css/images/login/201802061702657.jpg')" alt="">
        </div>
        <div class="sercure_myOTP">
          <img :src="require('@/assets/css/images/login/banner_otp.jpg')" alt="">
        </div>
      </div>
    </div>
    <div class="desc">
      <p>– 타 사이트와 동일 또는 유사한 비밀번호를 사용하시는 경우 아이디 도용의 우려가 있사오니 비밀번호를 변경하시기 바랍니다.</p>
      <p>– 아이디 및 비밀번호 입력 오류가 반복되는 경우 이미지 문자가 적용될 수 있습니다.</p>
      <p>– 키보드 보안프로그램으로 인해 모바일기기/인터넷 익스플로러를 제외한 브라우저에서는 로그인 및 해피캐시 충전이 제한될 수 있습니다.</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['hostname'],
    name: 'loginDetail',
    data() {
      return {
          nextUrl: '',
          signInId: '',
          signInPw: '',
          errorMessage: '필수 항목들을 채워주세요.',
          validateErrorMessage: ''
      }
    },
    created() {
      this.nextUrl = this.$route.query.nextUrl;
    },
    methods: {
      loginWithTokenAuth() {
        this.$validator.validateAll().then(valid => {
          if (valid) {
            const data = {
              username: this.signInId,
              password: this.signInPw
            }
            const url = this.hostname + '/apis/members/auth-token/';
            this.$http.post(url, data, {headers: {'Authorization': '...'}}).then(
              response => {
                if (response.status == '200') {
                  this.$cookie.set('Authorization', 'Token ' + response.data.token);

                  if (this.nextUrl) {
                    this.$router.push({
                      path: this.nextUrl
                    })
                  } else {
                    this.$router.push({
                      path: '/'
                    })
                  }
                }
              },
              error => {
                if (error.status == '400') {
                  this.validateErrorMessage = error.data.detail[0];
                }
              });
          }
        })
      }
    }
  }
</script>

<style lang="scss">

  .inputText.error {
    border: 2px solid red !important;
  }

  span.error {
    display: block;
    text-align: left;
    color: red;
    margin-bottom: 10px;
  }

  #loginDetail {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin-top: 50px;

    > .loginFormWrap {
      display: flex;
      flex-direction: row;
      border: 1px solid #ddd;
      justify-content: center;
      align-items: center;

      > .left {
        padding: 0 50px;

        button {
          width: 100%;
          font-weight: bold;
          margin: 3px 0;

          padding: 8px 0;
          border: 1px solid #666;
          background-color: #fff;
          color: #222;

          &.signIn {
            padding: 15px 0;
            border: 1px solid #d54e1f;
            background-color: #f35923;
            color: #fff;
            margin-bottom: 10px;
          }
        }

        > h2 {
          text-align: left;
        }

        > form {

          > .inputText {
            box-sizing: border-box;
            display: block;
            width: 100%;
            height: 18px;
            min-height: 58px;
            font-size: 0.9em;
            text-indent: 19px;
            border: 1px solid #ccc;
            color: #222;
            padding: 14px 0 16px;

            &:nth-child(2) {
              background-color: #fffbf4;
              color: #666;
            }

            > input {
              display: block;
              padding: 0 14px 0 16px;
              width: 100%;
              height: 100%;
              border: none;

                &[type="password"] {
                  background-color: #fffbf4;
                }
             }
          }
        }

        .signMore {
          display: flex;
          align-items: center;
          justify-content: center;

          margin: 15px 0;

          > a {
            padding: 0 15px;
            color: #666;
            font-weight: bold;
            font-size: 0.8em;
          }
        }

        > .secure {
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;

          > p {
            margin: 0;
            padding: 12px 0;
            font-weight: bold;
            font-size: 0.8em;
          }
        }

        > .secure_detail {
          font-size: 0.8em;
          color: #666;
        }
      }

      > .right {
        display: flex;
        flex-direction: column;
        border-left: 1px solid #ddd;

        img {
          width: 100%;
          height: 100%;
        }

        > .secure_image {

        }

        > .sercure_myOTP {

        }
      }
    }

    > .desc {
      margin: 20px 0;
      text-align: left;

      p {
        margin: 0;
        font-size: 0.8em;
        color: #aaa;
      }
    }
  }

  @media only screen and (max-width: 800px) {

    #loginDetail {
      margin-bottom: 50px;
    }

    .right {
      display: none !important;
    }

    .desc {
      display: none !important;
    }
  }
</style>
