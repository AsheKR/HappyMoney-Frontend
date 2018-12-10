<template>
  <div class="passwordEdit">
    <div class="editStep1__title">
      <span>비밀번호 변경</span>
      <span>즐거움과 생활이 연결되는 새로운 선물문화</span>
      <img :src="require('@/assets/css/images/mybox/tlPsConfig.png')" alt="">
    </div>
    <div class="passwordEditWrap">
      <div class="profileDetailTitle">
        <span class="profileDetailTitle--title">
          <strong>*</strong> 필수입력 항목
        </span>
      </div>

      <div class="passwordEdit__ide__wrap">
        <div class="passwordEdit__ide__item">
          <div class="passwordEdit__ide__item--title">
            <span>현재 비밀번호 <strong>*</strong> </span>
          </div>
          <div class="passwordEdit__ide__item--form">
            <span class="input password" :class="{ hasError: errors.has('password')}">
              <input type="password" name="password" v-model="password"  v-validate.bails="'required|excluded:*,=,&,^|max:12|min:6'" ref="password">
            </span>
            <span class="input_desc" v-if="errors.has('password')">* {{ errors.first('password') }}</span>
          </div>
        </div>
        <div class="passwordEdit__ide__item">
          <div class="passwordEdit__ide__item--title">
            <span>새 비밀번호 <strong>*</strong> </span>
          </div>
          <div class="passwordEdit__ide__item--form">
            <span class="input password" :class="{ hasError: errors.has('new_password')}">
              <input type="password" name="new_password" v-model="new_password"  v-validate.bails="'required|excluded:*,=,&,^|max:12|min:6'" ref="new_password">
            </span>
            <span class="input_desc" v-if="errors.has('new_password')">* {{ errors.first('new_password') }}</span>
          </div>
        </div>
        <div class="passwordEdit__ide__item">
          <div class="passwordEdit__ide__item--title">
            <span>새 비밀번호 확인 <strong>*</strong> </span>
          </div>
          <div class="passwordEdit__ide__item--form">
            <span class="input password" :class="{ hasError: errors.has('new_password_confirmation')}">
              <input type="password" name="new_password_confirmation" data-vv-as="new_password" v-validate.bails="'required|confirmed:new_password'">
            </span>
            <span class="input_desc" v-if="errors.has('new_password_confirmation')">* {{ errors.first('new_password_confirmation') }}</span>
          </div>
        </div>
        </div>
      </div>
      <div class="passwordEdit__button">
        <div class="passwordEdit__button--reset" @click.prevent="$router.go(-1)">
          <a href="#"><span>취소</span></a>
        </div>
        <div class="passwordEdit__button--agree" @click.prevent="passwordChange()">
          <a href="#"><span>확인</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hostname'],
  data() {
    return {
      password: '',
      new_password: '',
      new_password_confirmation: '',
    }
  },
  methods: {
    passwordChange() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const data = {
            password: this.password,
            new_password: this.new_password
          }

          const url = this.hostname + '/apis/members/passwordCheck/';
          const Authorization = this.$cookie.get('Authorization');

          this.$http.patch(url, data, {headers: {'Authorization': Authorization}}).then(
            response => {
              console.log(response);
              if (response.status == '200') {
                alert('정보가 정상적으로 수정되었습니다!');
                this.$router.push({
                  name: 'mybox/home'
                })
              }
            },
            error => {
              console.log(error);
            });
        }else {
          alert("정보를 채워주세요!");
        }
      })
    }
  }
}
</script>

<style lang="scss">

  .passwordEdit {
    > .editStep1__title {
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

        &:last-child {
          font-size: 0.8em;
        }
      }

      img {
        position: absolute;
        right: 0;
      }
    }

    > .passwordEditWrap {
      max-width: 1200px;

      > .passwordEdit__step--img {
        background-repeat: no-repeat;
        background-position: 0 -180px;
        margin: auto;
        width: 850px;
        height: 90px;
      }

      > .profileDetailTitle {
        display: flex;
        align-items: center;
        margin: 30px 0;

        > h4 {
          margin: 0;
        }

        > .profileDetailTitle--title {
          display: flex;
          align-items: center;
          margin-left: auto;
          font-size: 0.8em;
          color: black;
          font-weight: normal;

          > strong {
            margin-right: 5px;
            font-weight: bold;
            color: #f35923;
          }
        }
      }

      > .passwordEdit__ide__wrap {
        border-top: 1.3px solid black;
        border-bottom: 1px solid #eee;
        margin-bottom: 50px;

        > .passwordEdit__ide__item {
          display: grid;
          grid-template-columns: 1fr 3fr;
          border-bottom: 1px solid #ddd;
          align-items: center;


          > .passwordEdit__ide__item--title {
            text-align: left;
            border-right: 1px solid #ddd;
            background-color: #f5f5f5;
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 20px;

            > span {
              display: inline-block;
              font-weight: bold;
              font-size: 0.9em;

              > strong {
                color: #f35923;
              }
            }
          }

          > .passwordEdit__ide__item--form {
            text-align: left;
            padding: 10px 20px;
            display: grid;
            font-size: 0.8em;
            color: #666;

            > span.checkbox {
              font-size: 0.9em;
              color: #666;
            }

            > span.input {
              display: inline-block;
              padding: 10px 0 12px;
              border: 1px solid #ccc;
              width: 310px;
              padding-left: 15px;

              &.hasError {
                border: 1px solid #f35923;

                &+span.input_desc {
                  color: #f35923 !important;
                }
              }

              &.password {
                background-color: #fffbf4;
              }

              > input {
                border: none;
                width: 100%;
                height: 100%;
                color: #666;

                &[type="password"] {
                  background-color: #fffbf4;
                }
              }
            }

            > span.input_desc {
              font-size: 0.8em;
              margin-top: 7px;
              color: #5877a4;
            }
          }
        }

      }
    }

    > .passwordEdit__button {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 10px;
      margin-bottom: 90px;
      cursor: pointer;

      > div {
        width: 100%;
        height: 48px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;

        > a {
          color: #fff;
        }
      }

      > .passwordEdit__button--reset {
        grid-column: 2 / 3;
        border: 1px solid #454545;
        background-color: #4f4f4f;
      }

      > .passwordEdit__button--agree {
        grid-column: 3 / 4;
        border: 1px solid #d54e1f;
        background-color: #f35923;
      }
    }
  }

</style>
