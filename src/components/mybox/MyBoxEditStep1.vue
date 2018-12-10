<template>
  <div class="myBoxEditStep1">
    <div class="editStep1__title">
      <span>내 정보 수정</span>
      <span>즐거움과 생활이 연결되는 새로운 선물문화</span>
      <img :src="require('@/assets/css/images/mybox/tlPsConfig.png')" alt="">
    </div>
    <div class="editStep1__content">
      <div class="editStep1__content--form">
        <span>본인확인을 위해 비밀번호를 입력해주세요.</span>
        <span>
          <input type="password" placeholder="비밀번호" name="password" v-model="password" v-validate.bails="'required'">
        </span>
      </div>
    </div>
    <div class="editStep1__button">
      <div class="editStep1__button--reset" @click.prevent="$router.go(-1)">
        <a href="#"><span>취소</span></a>
      </div>
      <div class="editStep1__button--agree" @click.prevent="checkPassword()">
        <a href="#"><span>다음</span></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hostname'],
  data() {
    return {
      password: ''
    }
  },
  methods: {
    checkPassword() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const data = {
            password: this.password
          }
          const url = this.hostname + '/apis/members/passwordCheck/';
          const Authorization = this.$cookie.get('Authorization');

          this.$http.post(url, data, {headers: {'Authorization': Authorization}}).then(
            response => {
              if (response.status == '200') {
                this.$router.push({
                  name: 'mybox/editstep2',
                  params: response
                })
              }
            },
            error => {
              if (error.status == '400') {
                alert("비밀번호가 잘못되었습니다.");
              }
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

  .myBoxEditStep1 {
    display: flex;
    flex-direction: column;

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

    > .editStep1__content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px 0;
      border-top: 1px solid #666;
      border-bottom: 1px solid #ddd;

      > .editStep1__content--form {
        display:flex;
        flex-direction: column;

        > span {
          font-size: 0.8em;
          color: #666;

          &:first-child {
            padding-bottom: 20px;
          }

          &:last-child {
            display: block;
            border: 1px solid #ddd;
            width: 300px;
            padding: 10px 20px;
            background-color: #fffbf4;
            text-align: left;

            > input {
              border: none;
              background-color: #fffbf4;
            }
          }
        }
      }
    }

    > .editStep1__button {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 10px;
      margin-top: 30px;

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

      > .editStep1__button--reset {
        grid-column: 2 / 3;
        border: 1px solid #454545;
        background-color: #4f4f4f;
      }

      > .editStep1__button--agree {
        grid-column: 3 / 4;
        border: 1px solid #d54e1f;
        background-color: #f35923;
      }
    }
  }

</style>
