<template>
  <div class="signUpDetail">
    <h2>회원가입</h2>
    <div class="signUpSection" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/bgJoin.png')+')' }">
      <div class="signUpSectionItem">
        <h3>일반회원</h3>
        <div class="signUpSectionItem__type" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/bgMember_1.png')+')' }"></div>
        <div class="signUpSectionItem__age">
          <span>만 14세 이상</span>
          <span>만 14세 미만(보호자 인증)</span>
        </div>
        <div class="signUpSectionItem__desc">
          <span>모든 서비스 바로 이용!</span>
        </div>
        <div class="signUpButtonWrap">
          <span>가입하기</span>
        </div>
      </div>
      <div class="signUpSectionItem">
        <h3>법인회원</h3>
        <div class="signUpSectionItem__type" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/bgMember_2.png')+')' }"></div>
        <div class="signUpSectionItem__age">
          <span>만 19세 이상</span>
        </div>
        <div class="signUpButtonWrap">
          <span>가입하기</span>
        </div>
      </div>
      <div class="signUpSectionItem">
        <h3>간편회원</h3>
        <div class="signUpSectionItem__type" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/bgMember_3.png')+')' }"></div>
        <div class="signUpSectionItem__age">
          <span>모든 연령</span>
        </div>
        <div class="signUpSectionItem__desc">
          <span>해피 충전 서비스만 이용 가능</span>
          <span>11번가, CJ몰, 티비허브, 엔씨소프트, SSGPAY 이용 불가</span>
          <span>실결제(신용카드, 계좌이체 등) 불가</span>
        </div>
        <div class="signUpButtonWrap">
          <span>가입하기</span>
        </div>
      </div>
    </div>
    <h3>해피머니만의 다양한 혜텍</h3>
    <div class="signUpBenefitList">
      <div class="signUpBenefit">
        <div class="signUpBenefit__img" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/bgBenefits_1.png')+')' }"></div>
        <div class="signUpBenefit__title">
          <span>해피캐시 간편충전</span>
        </div>
        <div class="signUpBenefit__desc">
          <span>회원가입 없이 상품권으로 해피캐시 충전!</span>
          <span>결제창에 임시 아이디와 비밀번호 입력하면 끝!</span>
          <span>(24시간 이내에만 사용 가능)</span>
        </div>
        <div class="signUpBenefit__button">
          <div class="signUpBenefit__button--detail"><span>자세히보기</span></div>
          <div class="signUpBenefit__button--detail"><span>간편충전하기</span></div>
        </div>
      </div>
      <div class="signUpBenefit">
        <div class="signUpBenefit__img" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/bgBenefits_2.png')+')' }"></div>
        <div class="signUpBenefit__title">
          <span>회원 등급제 안내</span>
        </div>
        <div class="signUpBenefit__desc">
          <span>회원 가입 후 분기별 사용실적에 따라</span>
          <span>다양한 혜택 제공</span>
        </div>
        <div class="signUpBenefit__button">
          <div class="signUpBenefit__button--detail"><span>자세히보기</span></div>
        </div>
      </div>
      <div class="signUpBenefit">
        <div class="signUpBenefit__img" :style="{ 'background-image': 'url('+require('@/assets/css/images/signup/bgBenefits_3.png')+')' }"></div>
        <div class="signUpBenefit__title">
          <span>돈이 되는 포인트, 해머</span>
        </div>
        <div class="signUpBenefit__desc">
          <span>해피머니 마일리지 '해머' 적립</span>
          <span>3,000톤 이상 시 해피캐시로 전환 가능</span>
          <span>(간편회원 제외)</span>
        </div>
        <div class="signUpBenefit__button">
          <div class="signUpBenefit__button--detail"><span>자세히보기</span></div>
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

  .signUpDetail {
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;

    > h2 {
      margin: 20px 0 60px;
    }

    > .signUpSection {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #dfb338;
      background: #ffcd40 50% 0 no-repeat;
      padding: 50px 0;


      > .signUpSectionItem {
        display: grid;
        background-color: white;
        margin: 10px;
        border-radius: 5px;
        grid-template-rows: repeat(6, 0.5fr);
        grid-row-gap: 10px;

        &:nth-child(2) {
          > .signUpSectionItem__age {
            grid-row: 3 / 6;
          }
        }

        > .signUpSectionItem__type {
          width: 88px;
          height: 88px;
          background-repeat: no-repeat;
          align-self: center;
          justify-self: center;
        }

        > .signUpSectionItem__age {
          font-size: 0.8em;
          font-weight: bold;
          color: #f35923;

          > span {
            display: block;
          }
        }

        > .signUpSectionItem__desc {
          font-size: 0.75em;
          grid-row: 4 / 6;

          > span {
            display: block;
            color: #666;
          }
        }

        > .signUpButtonWrap {
          padding: 10px 100px;
          background-color: #f25822;
          border-radius: 0 0 5px 5px;
          cursor: pointer;

          > span {
            color: white;
            font-size: 0.84em;
            font-weight: bold;
          }
        }
      }
    }

    > h3 {
      margin-top: 50px;
    }

    > .signUpBenefitList {
      display: flex;
      margin: auto;
      border-top: 1px solid #eee;

      > .signUpBenefit {
        display: grid;
        grid-template-rows: repeat(8, 0.7fr);
        align-items: center;
        padding: 0 20px;
        margin-top: 30px;
        border-right: 1px solid #eee;

        &:first-child {
          .signUpBenefit__button--detail {
            grid-column: auto;

            &:last-child span {
              border: 1px solid #d54e1f;
              background-color: #f35923;
              color: #fff;
            }
          }
        }

        &:last-child {
          border: none;
        }

        > .signUpBenefit__img {
          grid-row: 1 / 4;
          background-repeat: no-repeat;
          width: 89px;
          height: 89px;
          justify-self: center;
        }

        > .signUpBenefit__title {
          font-weight: bold;
        }

        > .signUpBenefit__desc {
          grid-row: 5 / 8;
          font-size: 0.8em;

          > span {
            display: block;
            color: #777;
          }
        }

        > .signUpBenefit__button {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(2, 1fr);
          cursor: pointer;

          > div {
            display: inline-block;
            grid-column: 1 / 3;

            > span {
              font-weight: bold;
              padding: 10px 17px;
              font-size: 0.9em;
              border: 1px solid #454545;
              background-color: #4f4f4f;
              color: #fff;
            }
          }
        }
      }
    }
  }

</style>
