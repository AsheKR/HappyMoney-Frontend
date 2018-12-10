<template>
  <div class="myBoxEditStep2">
    <div class="editStep1__title">
      <span>내 정보 수정</span>
      <span>즐거움과 생활이 연결되는 새로운 선물문화</span>
      <img :src="require('@/assets/css/images/mybox/tlPsConfig.png')" alt="">
    </div>
    <div class="myBoxEditStep2Wrap">
      <div class="profileDetailTitle">
        <h4>개인정보입력</h4>
        <span class="profileDetailTitle--title">
          <strong>*</strong> 필수입력 항목
        </span>
      </div>
      <div class="myBoxEditStep2__ide__wrap">
        <div class="myBoxEditStep2__ide__item">
          <div class="myBoxEditStep2__ide__item--title">
            <span>이름 <strong>*</strong> </span>
          </div>
          <div class="myBoxEditStep2__ide__item--form">
            <span>{{ name }}</span>
          </div>
        </div>
        <div class="myBoxEditStep2__ide__item">
          <div class="myBoxEditStep2__ide__item--title">
            <span>휴대폰 번호 <strong>*</strong> </span>
          </div>
          <div class="myBoxEditStep2__ide__item--form">
            <span>{{ phone }} (비밀번호 재발급시 사용됩니다.) </span>
          </div>
        </div>
        <div class="myBoxEditStep2__ide__item">
          <div class="myBoxEditStep2__ide__item--title">
            <span>아이디 <strong>*</strong> </span>
          </div>
          <div class="myBoxEditStep2__ide__item--form">
            <span>{{ username }}</span>
          </div>
        </div>
        <div class="myBoxEditStep2__ide__item">
          <div class="myBoxEditStep2__ide__item--title">
            <span>이메일 <strong>*</strong> </span>
          </div>
          <div class="myBoxEditStep2__ide__item--form">
            <span class="input" :class="{ hasError: errors.has('email')}">
              <input type="email" name="email" v-model="email" v-validate.bails="'required|email'">
            </span>
            <span class="input_desc" v-if="errors.has('email')">* {{ errors.first('email') }}</span>
          </div>
        </div>
        <div class="myBoxEditStep2__ide__item">
          <div class="myBoxEditStep2__ide__item--title">
            <span>수신동의 </span>
          </div>
          <div class="myBoxEditStep2__ide__item--form">
            <span class="checkbox"><input name="emailAgree" type="checkbox" id="emailAgree" v-model="email_agree">
            <label for="emailAgree">이메일 수신동의 (이메일 수신시 해머 받기를 통해 해머 50톤 지급)</label></span>
            <span class="checkbox"><input name="snsAgree" type="checkbox" id="snsAgree" v-model="sns_agree">
            <label for="snsAgree">SMS 수신동의 (이벤트 및 해피머니 소식을 받아 보실 수 있습니다.)</label></span>
          </div>
        </div>

      </div>

      <div class="myBoxEditStep2__button">
        <div class="myBoxEditStep2__button--reset" @click.prevent="$router.go(-1)">
          <a href="#"><span>취소</span></a>
        </div>
        <div class="myBoxEditStep2__button--agree" @click.prevent="patchUser()">
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
      name: '',
      phone: '',
      username: '',
      email: '',
      sns_agree: '',
      email_agree: ''
    }
  },
  methods: {
    patchUser() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const data = {
            email: this.email,
            sns_agree: this.sns_agree,
            email_agree: this.email_agree,
          }
          const url = this.hostname + '/apis/members/get/';
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
          alert("정보를 채워주세요!");
        }
      })
    }
  },
  created() {
    const response = this.$route.params.response;

    if (response == null) {
      this.$router.go(-1);
    }

    this.name = response.data.name;
    this.phone = response.data.phone;
    this.username = response.data.username;
    this.email = response.data.email;
    this.sns_agree = response.data.sns_agree;
    this.email_agree = response.data.email_agree;
  }
}
</script>

<style lang="scss">

  .myBoxEditStep2 {

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
    
    > .myBoxEditStep2Wrap {
      max-width: 1200px;

      > .myBoxEditStep2__step--img {
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

      > .myBoxEditStep2__ide__wrap {
        border-top: 1.3px solid black;
        border-bottom: 1px solid #eee;
        margin-bottom: 50px;

        > .myBoxEditStep2__ide__item {
          display: grid;
          grid-template-columns: 1fr 4fr;
          border-bottom: 1px solid #ddd;
          align-items: center;


          > .myBoxEditStep2__ide__item--title {
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

          > .myBoxEditStep2__ide__item--form {
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

      > .myBoxEditStep2__button {
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

        > .myBoxEditStep2__button--reset {
          grid-column: 2 / 3;
          border: 1px solid #454545;
          background-color: #4f4f4f;
        }

        > .myBoxEditStep2__button--agree {
          grid-column: 3 / 4;
          border: 1px solid #d54e1f;
          background-color: #f35923;
        }
      }
    }
  }

</style>
