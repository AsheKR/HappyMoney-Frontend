<template>
  <div class="sitemapView">
    <h2>해피머니 사이트맵</h2>
    <div class="sitemap__sub__menus">
      <div class="sitemap__sub__menus--menu">로그인</div>
      <div class="sitemap__sub__menus--menu">회원가입</div>
      <div class="sitemap__sub__menus--menu">회사소개</div>
      <div class="sitemap__sub__menus--menu">가맹제휴</div>
    </div>
    <div class="sitemap__menus">
      <div class="sitemap__menu__detail">
        <div class="sitemap__menu__detail--item">
          <h2><span class="siteMapIcon siteMapIcon_1"></span><span>상품권 · 충전</span></h2>
          <div class="sitemap__menu__detail--menu">
            <span class="title">해피캐시</span>
            <span>해피캐시 소개</span>
            <span>해피캐시 충전</span>
            <span>간편충전</span>
            <span>무료충전소</span>
          </div>
          <div class="sitemap__menu__detail--menu">
            <span class="title">상품권</span>
            <span>상품권 소개</span>
            <span>상품권 구입</span>
            <span>상품권 교환소</span>
          </div>
        </div>
        <div class="sitemap__menu__detail--item">
          <h2><span class="siteMapIcon siteMapIcon_2"></span><span>상품권 · 충전</span></h2>
          <div class="sitemap__menu__detail--menu">
            <span class="title">사용처</span>
            <span>해피쇼핑몰</span>
            <span>온라인 사용처</span>
            <span>오프라인 사용차</span>
            <span>테마 사용처</span>
          </div>
          <div class="sitemap__menu__detail--menu">
            <span class="title">쇼핑/선물</span>
            <span>제휴상품몰</span>
            <span>선물하기</span>
            <span>웹툰</span>
          </div>
        </div>
        <div class="sitemap__menu__detail--item">
          <h2><span class="siteMapIcon siteMapIcon_3"></span><span>상품권 · 충전</span></h2>
          <div class="sitemap__menu__detail--menu">
            <span class="title">해피박스</span>
            <span>해피쿠폰북</span>
            <span>해피스탬프</span>
            <span>추천핫딜쇼핑</span>
            <span>행복나눔</span>
            <span>맟춤서비스</span>
          </div>
          <div class="sitemap__menu__detail--menu">
            <span class="title">이벤트</span>
            <span>진행중인 이벤트</span>
            <span>종료된 이벤트</span>
            <span>당첨자 발표</span>
          </div>
        </div>
        <div class="sitemap__menu__detail--item">
          <h2><span class="siteMapIcon siteMapIcon_4"></span><span>고객센터</span></h2>
          <div class="sitemap__menu__detail--menu">
            <span class="title customer">FAQ</span>
            <span class="title customer">1:1문의</span>
            <span class="title customer">고객상담센터</span>
            <span class="title customer">공지사항</span>
            <span class="title customer">PC보안가이드</span>
            <span class="title customer">외부상품권</span>
          </div>
        </div>
        <div class="sitemap__menu__detail--item">
          <h2><span class="siteMapIcon siteMapIcon_5"></span><span>마이페이지</span></h2>
          <div class="sitemap__menu__detail--menu">
            <span class="title">해피머니 관리</span>
            <span>- 이메일상품권 재발송</span>
            <span>- SMS상품권 재발송</span>
            <span>- 모바일상품권 재발송</span>
            <span>- 모바일상품권 유효기간연장</span>
            <span>- 모바일상품권 잔액 환불</span>
            <span>- 해피캐시 잔액 환불</span>
            <span>- 해피캐시 복원 신청</span>
          </div>
          <div class="sitemap__menu__detail--menu">
            <span class="title">보안 관리</span>
            <span>- 결제 비밀번호</span>
            <span>- 해피캐시 잠금서비스</span>
            <span>- 아이디 자동 잠금</span>
            <span>- 사용처 관리</span>
            <span>- 개인정보이용내역 조회</span>
          </div>
          <div class="sitemap__menu__detail--menu">
            <span class="title">이용현황</span>
            <span>- 상품권 주문내역 조회</span>
            <span>- 해피캐시 내역 조회</span>
            <span>- 해머내역 조회</span>
            <span>- 내 쿠폰 현황</span>
            <span>- 상품권 교환내역 조회</span>
          </div>
          <div class="sitemap__menu__detail--menu">
            <span class="title">내정보</span>
            <span>- 내 정보 수정</span>
            <span>- 비밀번호 변경</span>
            <span>- 로그인 기록 조회</span>
            <span>- 회원 탈퇴</span>
          </div>
        </div>
      </div>
      <div class="sitemap__menus__family">
        <div class="sitemap__menus__family--item">
          <span><h2><span class="siteMapIcon siteMapIcon_6"></span><span>패밀리사이트</span></h2></span>
          <div class="menus">
            <span>해피21 사이트</span>
            <span>행복나눔</span>
          </div>
        </div>
        <div class="sitemap__menus__family--item">
          <div class="menus">
            <span>이용약관</span>
            <span>개인정보처리방침</span>
          </div>
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
  .sitemapView {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin: auto;

    > h2 {
      margin-top: 50px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }

    > .sitemap__sub__menus {
      display: flex;
      align-self: flex-end;
      margin-bottom: 20px;

      > .sitemap__sub__menus--menu {
        padding: 0 10px;
        border-right: 1px solid #eee;
        font-size: 0.8em;
        font-weight: bold;
        color: #666;

        &:last-child {
          border: none;
        }
      }
    }

    > .sitemap__menus {
      display: grid;
      border-top: 1px solid #aaa;
      border-bottom: 1px solid #aaa;
      margin-bottom: 100px;

      > .sitemap__menu__detail{
        display: grid;
        grid-template-columns: repeat(6, 1fr);

        > .sitemap__menu__detail--item {
          grid-template-rows: 1fr 4fr 3fr;
          display: grid;
          border-left: 1px solid #eee;

          &:last-child {
            grid-column: -3 / -1;
            grid-template-rows: 1fr 4fr 3fr;
            grid-template-columns: 1fr 1fr;

            > h2 {
              grid-column: 1 / 3;
            }

            > .sitemap__menu__detail--menu {

              &:nth-child(3) {
                border-bottom: none;
              }

              &:nth-child(4), &:nth-child(5) {
                border-bottom: 1px solid #eee;
              }
            }
          }

          &:nth-child(4) {
            > .sitemap__menu__detail--menu {
              grid-row: 2 / 4;
              border-bottom: 1px solid #eee;
            }
          }

          > h2 {
            margin: 0;
            font-size: 1.1em;
            border-bottom: 1px solid #eee;
            border-right: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f5f5f5;
          }

          > .sitemap__menu__detail--menu {
            display: grid;
            grid-auto-rows: min-content;
            text-align: left;
            padding-top: 30px;
            padding-left: 20px;
            padding-bottom: 20px;
            font-size: 0.84em;
            border-right: 1px solid #eee;

            &:nth-child(3) {
              border-bottom: 1px solid #eee;
            }

            > span {
              padding: 5px 0;
            }

            > .title {
              font-weight: bold;

              &.customer {
                padding: 10px 0;
              }
            }

            > span:not(.title) {
              color: #aaa;
            }
          }
        }
      }

      > .sitemap__menus__family {
        display:grid;
        grid-template-columns: repeat(6, 1fr);

        > .sitemap__menus__family--item {


          &:nth-child(1) {
            grid-column: 1 / 5;
            display: grid;
            grid-template-columns: repeat(4, 1fr);

            > span {
              border-left: 1px solid #eee;
              border-right: 1px solid #eee;

              > h2 {
                font-size: 1.2em;
              }
            }

            > .menus {
              grid-column: 2 / 5;
              justify-self: flex-start;
              align-self: center;
              padding-left: 20px;

              > span {
                font-size: 0.9em;
                color: #aaa;
                padding: 0 10px;
                border-right: 1px solid #eee;

                &:last-child {
                  border-right: none;
                }
              }
            }
          }

          &:nth-child(2) {
            grid-column: 5 / 7;
            display: grid;
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;

            > .menus {
              justify-self: flex-start;
              align-self: center;
              padding-left: 20px;
              text-align: left;

              > span {
                font-size: 0.9em;
                color: #aaa;
                padding: 0 10px;
                border-right: 1px solid #eee;

                &:last-child {
                  border-right: none;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
