<template>
  <div class="signUpDetailStep1">
    <h2>회원가입</h2>
    <div class="signUpDetailStep1Wrap">
      <div class="signUpDetailStep1__step--img" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/stepCol4.gif')+')' }"></div>
      <h4>본인인증</h4>
      <div class="signUpDetailStep1__ide__wrap">
        <div class="signUpDetailStep1__ide--img" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/bgCertification_1.png')+')' }"></div>
        <div class="signUpDetailStep1__ide--content">
          <span class="title">안전을 위해 본인인증을 진행합니다.</span>
          <span>- 본인 동의 없는 타인에 의한 회원가입을 방지하기 위하여 회원본인인증을 시행합니다.</span>
          <span>- 만 14세 미만은 보호자 인증이 필요합니다.</span>
          <span>- 본인명의 휴대폰으로만 본인인증이 가능합니다.</span>
        </div>
        <div class="signUpDetailStep1__ide--circle">
          <span>본인</span>
          <span>인증하기</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  .signUpDetailStep1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .signUpDetailStep1Wrap {

      > .signUpDetailStep1__step--img {
        background-repeat: no-repeat;
        margin: auto;
        width: 850px;
        height: 90px;
      }

      > h4 {
        text-align: left;
        margin: 30px 0;
      }

      > .signUpDetailStep1__ide__wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;

        padding: 40px 0;
        margin-bottom: 100px;

        > .signUpDetailStep1__ide--img {
          width: 100px;
          height: 100px;
          background-repeat: no-repeat;
          margin-right: 30px;
        }

        > .signUpDetailStep1__ide--content {

          > span {
            text-align: left;
            display: block;
            font-size: 0.8em;
            color: #777;

            &:first-child {
              color: black;
              font-weight: bold;
              margin-bottom: 10px;
            }
          }
        }

        > .signUpDetailStep1__ide--circle {
          border-radius: 50%;
          border: 1px solid #d54e1f;
          background-color: #f35923;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          margin-left: auto;
          font-size: 0.85em;

          cursor: pointer;

          > span {
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
