<template>
  <div class="leftMyBoxMenu">
    <div class="leftMyBoxMenu__myPage">
      <h2>마이페이지</h2>
      <img :src="require('@/assets/css/images/mybox/tlMyBox.png')" alt="">
    </div>
    <div class="leftMyBoxMenu__item">
      <span class="title">해피머니 관리</span>
      <span @click="routeInquiry({name: 'emailGiftCard', title: '이메일 상품권 재발송'})">- 이메일상품권 재발송</span>
      <span @click="routeInquiry({name: 'smsGiftCard', title: 'SMS 상품권 재발송'})">- SMS 상품권 재발송</span>
      <span>- 모바일상품권 재발송</span>
      <span>- 모바일상품권 유효기간연장</span>
      <span>- 모바일상품권 잔액 환불</span>
      <span>- 해피캐시 잔액 환불</span>
      <span>- 해피캐시 복원 신청</span>
    </div>
    <div class="leftMyBoxMenu__item">
      <span class="title">이용현황</span>
      <span @click="routeInquiry({name: 'happyCash', title:'해피캐시 내역 조회'})">- 해피캐시 내역 조회</span>
      <span @click="routeInquiry({name: 'hammer', title:'해머 내역 조회'})">- 해머내역 조회</span>
      <span @click="routeInquiry({name: 'giftCard', title:'상품권 주문 내역 조회'})">- 상품권 주문내역 조회</span>
    </div>
    <div class="leftMyBoxMenu__item">
      <span class="title">보안 관리</span>
      <span>- 결제 비밀번호</span>
      <span>- 해피캐시 잠금서비스</span>
      <span>- 아이디 자동잠금</span>
      <span>- 사용처 관리</span>
      <span>- 개인정보 이용내역 조회</span>
    </div>
    <div class="leftMyBoxMenu__item">
      <span class="title">내정보</span>
      <span>- 내 정보 수정</span>
      <span>- 비밀번호 변경</span>
      <span>- 로그인 기록 조회</span>
      <span>- 회원 탈퇴</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    routeInquiry(object) {
      if (this.$route.name !== 'mybox/inquiry') {
        this.$router.push({
          name: 'mybox/inquiry',
          query: object
        });
      } else {
        this.$router.replace({
          name: 'mybox/inquiry',
          query: object
        });
      }
    }
  }
}
</script>

<style lang="scss">

  .leftMyBoxMenu {
    display: flex;
    flex-direction: column;

    > .leftMyBoxMenu__myPage {
      position: relative;
      padding: 30px;
      border: 1px solid #e6e6e6;

      > h2 {
        text-align: left;
        height: 128px;
        font-weight: normal;
        font-size: 1.7em;
      }

      > img {
        position: absolute;
        bottom: 30px;
        right: 30px;
        z-index: -1;
      }
    }

    > .leftMyBoxMenu__item {
      display: flex;
      flex-direction: column;
      padding: 30px 0 30px 20px;
      border-top: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      > span {
        text-align: left;
        color: #666;
        font-size: 0.8em;
        padding: 5px 0;
        display: block;
        cursor: pointer;

        &.title {
          padding: 10px 0;
          font-size: 1.0em;
          font-weight: bold;
        }
      }
    }
  }

</style>
