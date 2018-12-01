<template>
  <div id="footer">
    <footer>
      <div class="footer-container">
        <div class="footer-section1">
          <div class="footer-section1-left">
            <div class="footer-section1-item">회사소개</div>
            <div class="footer-section1-item">가맹제휴</div>
            <div class="footer-section1-item">광고안내</div>
            <div class="footer-section1-item">이용약관</div>
            <div class="footer-section1-item">개인정보처리방침</div>
            <div class="footer-section1-item">청소년보호정책</div>
          </div>
          <div class="footer-section1-right">
            <div class="footer-section1-item">
              <a href=""><span class="ir inc"></span></a>
              <a href=""><span class="ir twitter"></span></a>
              <a href=""><span class="ir facebook"></span></a>
              <a href=""><span class="ir blog"></span></a>
            </div>
          </div>
        </div>
        <div class="footer-section2">
          해피머니아이엔씨
        </div>
        <div class="footer-section3">
          <div class="footer-section3-left">
            <p>대표이사 : 최병호 | 경기도 성남시 분당구 판교로253, C동(삼평동) | 사업자등록번호 : 116-81-71207</p>
            <p>통신판매업신고 : 제 01-78호 | 개인정보보호책임자 : 김광태상무</p>
            <p>담당자 이메일 : webmaster@happymoney.co.kr | 고객센터 : 1588-5245 | 팩스 : 031-8018-0220</p>
          </div>
          <div class="footer-section3-right">
            <span class="ir certi_1"></span>
            <span class="ir certi_2"></span>
            <span class="ir certi_3"></span>
          </div>
        </div>
        <div class="footer-section4">
          <p>COPYRIGHT © 2017 HAPPYMONEY INC. ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
footer {
  background-color: #eee;
  > .footer-container {
    padding-left: 10px;
    padding-bottom: 10px;

    > div {
      display: block;
    }

    > .footer-section1 {
      padding-top: 30px;
      padding-bottom: 20px;
      display: flex;

      > div {
        display: flex;
        align-items: center;
      }

      > .footer-section1-left {
        margin-right: auto;

        > .footer-section1-item {
          margin-left: 15px;
          padding-left: 15px;
          border-left: 1px solid #ccc;
          font-size: 14px;
          color: #000;

          &:first-child {
            padding-left: 0px;
            margin-left: 0px;
            border: none;
          }
        }
      }

      > .footer-section1-right {
        margin-left: auto;

        span {
          display: inline-block;
        }
      }

      .footer-section1-item {
        display: inline-block;
      }
    }

    > .footer-section2 {
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #222;
      font-size: 13px;
      text-align: left;
    }

    > .footer-section3 {
      display: flex;

      > .footer-section3-left {
        margin-right: auto;

        > p {
          color: #666;
          font-size: 13px;
        }
      }

      > .footer-section3-right {
        display: flex;
        margin-left: auto;

        > span {
          margin-top: 10px;
          margin-right: 10px;
        }
      }
    }

    > .footer-section4 {

      > p {
        color: #666;
        font-size: 13px;
        text-transform: uppercase;
      }
    }
  }
}
@media only screen and (max-width: 1180px) {
  footer {
    .footer-section1 {
      display: block !important;

      > .footer-section1-right {
        margin-top: 20px;
      }
    }

    .footer-section3 {
      display: block !important;
      text-align: left;

      span {
        margin-top: 0 !important;
      }
    }
  }
}
</style>
