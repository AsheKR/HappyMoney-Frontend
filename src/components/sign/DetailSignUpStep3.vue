<template>
  <div class="signUpDetailStep3">
    <h2>회원가입</h2>
    <div class="signUpDetailStep3Wrap">
      <div class="signUpDetailStep3__step--img" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/stepCol4.gif')+')' }"></div>
      <div class="signUpDetailTitle">
        <h4>약관동의</h4>
        <span class="signUpDetailTitle--title">
          <strong>*</strong> 필수입력 항목
        </span>
      </div>
      <div class="signUpDetailStep3__ide__wrap">
        <div class="signUpDetailStep3__ide__item">
          <div class="signUpDetailStep3__ide__item--title">
            <span>성명 <strong>*</strong> </span>
          </div>
          <div class="signUpDetailStep3__ide__item--form">
            <span class="input" :class="{ hasError: errors.has('name')}">
              <input type="text" name="name" v-model="name" v-validate.bails="'required|min:2|max:5'" data-vv-delay="100">
            </span>
            <span class="input_desc" v-if="errors.has('name')">* {{ errors.first('name') }}</span>
          </div>
        </div>
        <div class="signUpDetailStep3__ide__item">
          <div class="signUpDetailStep3__ide__item--title">
            <span>생년월일 <strong>*</strong> </span>
          </div>
          <div class="signUpDetailStep3__ide__item--form">
            <span class="input" :class="{ hasError: errors.has('birth')}">
              <input type="text" placeholder="예) 19800101" name="birth" v-model="birth" v-validate.bails="'required|date_format:YYYYMMDD'">
            </span>
            <span class="input_desc" v-if="errors.has('birth')">* {{ errors.first('birth') }}</span>
            <span class="input_desc" v-else>* 아이디 찾기시 사용됩니다.</span>
          </div>
        </div>
        <div class="signUpDetailStep3__ide__item">
          <div class="signUpDetailStep3__ide__item--title">
            <span>휴대폰 번호 <strong>*</strong> </span>
          </div>
          <div class="signUpDetailStep3__ide__item--form">
            <span class="input" :class="{ hasError: errors.has('phone')}">
              <input type="text" placeholder="'-'제외하고 숫자만 입력" name="phone" v-model="phone" v-validate.bails="'required|numeric|length:11'">
            </span>
            <span class="input_desc" v-if="errors.has('phone')">* {{ errors.first('phone') }}</span>
            <span class="input_desc" v-else>* 비밀번호 재발급 시 사용됩니다.</span>
          </div>
        </div>
        <div class="signUpDetailStep3__ide__item">
          <div class="signUpDetailStep3__ide__item--title">
            <span>아이디 <strong>*</strong> </span>
          </div>
          <div class="signUpDetailStep3__ide__item--form">
            <span class="input" :class="{ hasError: errors.has('username')}">
              <input type="text" v-model="username" name="username" v-validate.bails="'required|max:16|min:4'">
            </span>
            <span class="input_desc" v-if="errors.has('username')">* {{ errors.first('username') }}</span>
            <span class="input_desc" v-else>* 4~16자 영문소문자, 숫자로만 사용(첫글자는 영문 사용).</span>
          </div>
        </div>
        <div class="signUpDetailStep3__ide__item">
          <div class="signUpDetailStep3__ide__item--title">
            <span>비밀번호 <strong>*</strong> </span>
          </div>
          <div class="signUpDetailStep3__ide__item--form">
            <span class="input password" :class="{ hasError: errors.has('password')}">
              <input type="password" name="password" v-model="password"  v-validate.bails="'required|excluded:*,=,&,^|max:12|min:6'" ref="password">
            </span>
            <span class="input_desc" v-if="errors.has('password')">* {{ errors.first('password') }}</span>
            <slot v-else>
              <span class="input_desc">* 6~12자 영문,숫자 반드시 혼용, 특수문자(!, @, $) 사용 권장.</span>
              <span class="input_desc">* 3개 이상 연속 되거나 중복되는 영문,숫자는 사용할 수 없습니다.</span>
              <span class="input_desc">* [*,=,&,^] 특수문자는 사용할 수 없습니다.</span>
            </slot>
          </div>
        </div>
        <div class="signUpDetailStep3__ide__item">
          <div class="signUpDetailStep3__ide__item--title">
            <span>비밀번호 확인 <strong>*</strong> </span>
          </div>
          <div class="signUpDetailStep3__ide__item--form">
            <span class="input password" :class="{ hasError: errors.has('password_confirmation')}">
              <input type="password" name="password_confirmation" data-vv-as="password" v-validate.bails="'required|confirmed:password'">
            </span>
            <span class="input_desc" v-if="errors.has('password_confirmation')">* {{ errors.first('password_confirmation') }}</span>
          </div>
        </div>
        <div class="signUpDetailStep3__ide__item">
          <div class="signUpDetailStep3__ide__item--title">
            <span>이메일 <strong>*</strong> </span>
          </div>
          <div class="signUpDetailStep3__ide__item--form">
            <span class="input" :class="{ hasError: errors.has('email')}">
              <input type="email" name="email" v-model="email" v-validate.bails="'required|email'">
            </span>
            <span class="input_desc" v-if="errors.has('email')">* {{ errors.first('email') }}</span>
          </div>
        </div>
        <div class="signUpDetailStep3__ide__item">
          <div class="signUpDetailStep3__ide__item--title">
            <span>수신동의 </span>
          </div>
          <div class="signUpDetailStep3__ide__item--form">
            <span class="checkbox"><input name="emailAgree" type="checkbox" id="emailAgree" v-model="email_agree">
            <label for="emailAgree">이메일 수신동의 (이메일 수신시 해머 받기를 통해 해머 50톤 지급)</label></span>
            <span class="checkbox"><input name="snsAgree" type="checkbox" id="snsAgree" v-model="sns_agree">
            <label for="snsAgree">SMS 수신동의 (이벤트 및 해피머니 소식을 받아 보실 수 있습니다.)</label></span>
          </div>
        </div>

      </div>

      <div class="signUpDetailStep3__button">
        <div class="signUpDetailStep3__button--reset" @click.prevent="$router.go(-1)">
          <a href="#"><span>취소</span></a>
        </div>
        <div class="signUpDetailStep3__button--agree" @click.prevent="createUser()">
          <a href="#"><span>가입</span></a>
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
        name: '홍길순',
        birth: '20001112',
        phone: '01011111115',
        username: 'asd12355',
        password: 'asd123',
        email: 'asd@asd15.com',
        sns_agree: false,
        email_agree: false,
      }
    },
    methods: {
      createUser() {
        this.$validator.validateAll().then(valid => {
          if (valid) {
            const data = {
              username: this.username,
              password: this.password,
              phone: '+82'+this.phone,
              email: this.email,
              birth: this.birth.substr(0, 4)+'-'+this.birth.substr(4, 2)+'-'+this.birth.substr(6, 2),
              name: this.name,
              sns_agree: this.sns_agree,
              email_agree: this.email_agree
            }
            const url = this.hostname + '/apis/members/create-user/';
            this.$http.post(url, data).then(
              response => {
                if (response.status == '201') {
                  this.$cookie.set('Authorization', 'Token ' + response.data.token);

                  alert("회원가입이 완료되었습니다!");
                  this.$router.go({
                    path: '/'
                  })
                }
              },
              error => {
                if (error.status == '400') {
                  for (var key in error.data) {
                    var field = this.$validator.fields.find({ name: key, scope: this.$options.scope });

                    if (!field) continue;

                    this.$validator.errors.add({
                      id: field.id,
                      field: key,
                      msg: error.data[key][0],
                      scope: this.$options.scope,
                    })
                  }
                }
              });
          }else {
            alert("정보를 다시 채워주세요!");
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .signUpDetailStep3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .signUpDetailStep3Wrap {

      max-width: 850px;

      > .signUpDetailStep3__step--img {
        background-repeat: no-repeat;
        background-position: 0 -180px;
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
          color: black;
          font-weight: normal;

          > strong {
            margin-right: 5px;
            font-weight: bold;
            color: #f35923;
          }
        }
      }

      > .signUpDetailStep3__ide__wrap {
        border-top: 1.3px solid black;
        border-bottom: 1px solid #eee;
        margin-bottom: 50px;

        > .signUpDetailStep3__ide__item {
          display: grid;
          grid-template-columns: 1fr 4fr;
          border-bottom: 1px solid #ddd;
          align-items: center;


          > .signUpDetailStep3__ide__item--title {
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

          > .signUpDetailStep3__ide__item--form {
            text-align: left;
            padding: 10px 20px;
            display: grid;

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

      > .signUpDetailStep3__button {
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

        > .signUpDetailStep3__button--reset {
          grid-column: 2 / 3;
          border: 1px solid #454545;
          background-color: #4f4f4f;
        }

        > .signUpDetailStep3__button--agree {
          grid-column: 3 / 4;
          border: 1px solid #d54e1f;
          background-color: #f35923;
        }
      }
    }
  }
</style>
