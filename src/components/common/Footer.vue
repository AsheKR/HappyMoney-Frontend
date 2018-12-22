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
            <p>작성자: 송길영 | 패스트캠퍼스 9기 스쿨 프로젝트</p>
            <p>연락처: 010-XXXX-XXXX | 개인정보보호책임자 : 송길영</p>
            <p>담당자 이메일 : teachemesomething2580@gmail.com </p>
          </div>
          <div class="footer-section3-right">
            <span class="ir certi_1"></span>
            <span class="ir certi_2"></span>
            <span class="ir certi_3"></span>
          </div>
        </div>
        <div class="footer-section4">
          <p>COPYRIGHT © 2018 SONG GIL YOUNG</p>
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
            font-size: 0.8em;
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
        font-size: 0.7em;
        text-align: left;
      }

      > .footer-section3 {
        display: flex;

        > .footer-section3-left {
          margin-right: auto;
          text-align: left;

          > p {
            color: #666;
            font-size: 0.8em;
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
          font-size: 0.8em;
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
