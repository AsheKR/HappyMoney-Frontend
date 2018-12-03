<template>
  <div id="Header" @mouseleave="centerHeaderMouseOut">
    <div class="dim-dark" v-show="activeAside" @click="handleClickDim"></div>
    <header>
      <transition name="slide-menu">
        <aside v-show="activeAside">
          <div class="wrap">
            <div class="aside-logo clearfix">
              <a href=""><span class="icon icon-user"></span></a>
            </div>

            <div class="aside-items">
              <div v-for="(menu, index) in menus" :key="menu.id" class="aside-menu-wrap" @click.prevent="handleClickSubAside(index)">
                <div class="aside-sub-menu-title"><a href=""><span>{{ menu.title }}</span><span class="icon icon-circle-down"></span></a></div>
                <div class="aside-sub-menu-wrap">
                  <transition name="aside-sub-menu-fade">
                    <div class="aside-sub-menu" v-show="menu.is_active">
                      <div class="aside-sub-menu-content" v-for="subtitle in menu.subTitle" :key="subtitle.id"><a href="">{{ subtitle }}</a></div>
                    </div>
                  </transition>
                </div>
              </div>
              <div class="aside-menu-item"><a href="">로그인</a></div>
              <div class="aside-menu-item"><a href="">회원가입</a></div>
              <div class="aside-menu-item"><a href="">사이트맵</a></div>
              <div>
                <div><a href=""><span class="icon icon-facebook"></span></a></div>
                <div><a href=""><span class="icon icon-instagram"></span></a></div>
              </div>
            </div>
          </div>
        </aside>
      </transition>

      <div class="header-hamberger" @click="handleClickHamburger">
        <span class="icon icon-paragraph-justify"></span>
      </div>

      <div class="aside-logo"><a href=""><span class="ir ci"></span></a></div>

      <div class="header-container">
        <div class="left-header">
          <div><a href=""><span class="ir ci"></span></a></div>
        </div>
        <div class="center-header" @mouseover="centerHeaderMouseOver">
          <div><div><a href="">상품권 & 충전</a></div></div>
          <div><div><a href="">사용처 & 쇼핑</a></div></div>
          <div><div><a href="">이벤트 & 혜택</a></div></div>
          <div><div><a href=""><img src="../../assets/css/images/index/btnGoogleGnb.gif" alt=""></a></div></div>
        </div>
        <div class="right-header">
          <div><a href=""><span class="ir logIn"></span>로그인</a></div>
          <div><a href=""><span class="ir join"></span>회원가입</a></div>
          <div><a href=""><span class="ir sitemap"></span>사이트맵</a></div>
        </div>
      </div>
    </header>
    <nav>
      <transition name="nav-container-fade">
        <div class="nav-container" v-show="centerHeaderIsActive">
          <div class="nav-wrap-1">
            <div class="nav-sub-menu">
              <div class="happy21">
                <h2 class="gnbTl">해피21사이트</h2>
                <p class="gnbTxt">외식, 레저상품권의 대명사로 <br>고품격 상품권입니다.</p>
                <a href="https://www.happy21.co.kr/" target="_blank" title="새창열림" class="btnGo">바로가기<span class="ico"></span></a>
              </div>
              <div class="happyShare">
                <h2 class="gnbTl">해피머니 앱</h2>
                <p class="gnbTxt">해피캐시 충전/사용을 쉽고 빠르게<br>다양한 혜택도 앱에서 누리세요!</p>
                <a href="/svc/common/appDownInfo.hm" class="btnGo">바로가기<span class="ico"></span></a>
              </div>
            </div>
          </div>
          <div class="nav-wrap-2">
            <div class="nav-sub-menu">
              <div class="nav-sub-menu-title"><a href="">해피캐시</a></div>
              <div class="nav-sub-menu-content"><a href="">해피캐시 소개</a></div>
              <div class="nav-sub-menu-content"><a href="">해피캐시 충전</a></div>
              <div class="nav-sub-menu-content"><a href="">간편 충전</a></div>
              <div class="nav-sub-menu-content"><a href="">무료 충전소</a></div>
            </div>
            <div class="nav-sub-menu">
              <div class="nav-sub-menu-title"><a href="">상품권</a></div>
              <div class="nav-sub-menu-content"><a href="">상품권 소개</a></div>
              <div class="nav-sub-menu-content"><a href="">상품권 구입</a></div>
              <div class="nav-sub-menu-content"><a href="">상품권 교환소</a></div>
            </div>
          </div>
          <div class="nav-wrap-3">
            <div class="nav-sub-menu">
              <div class="nav-sub-menu-title"><a href="">사용처</a></div>
              <div class="nav-sub-menu-content"><a href="">해피 쇼핑몰</a></div>
              <div class="nav-sub-menu-content"><a href="">온라인 사용처</a></div>
              <div class="nav-sub-menu-content"><a href="">오프라인 사용처</a></div>
              <div class="nav-sub-menu-content"><a href="">모바일 사용처</a></div>
            </div>
            <div class="nav-sub-menu">
              <div class="nav-sub-menu-title"><a href="">쇼핑 선물</a></div>
              <div class="nav-sub-menu-content"><a href="">제휴상품몰</a></div>
              <div class="nav-sub-menu-content"><a href="">선물하기</a></div>
              <div class="nav-sub-menu-content"><a href="">웹툰</a></div>
            </div>
          </div>
          <div class="nav-wrap-4">
            <div class="nav-sub-menu">
              <div class="nav-sub-menu-title"><a href="">해피박스</a></div>
              <div class="nav-sub-menu-content"><a href="">해피쿠폰북</a></div>
              <div class="nav-sub-menu-content"><a href="">해피스탬프</a></div>
              <div class="nav-sub-menu-content"><a href="">추천핫딜쇼핑</a></div>
              <div class="nav-sub-menu-content"><a href="">행복나눔</a></div>
              <div class="nav-sub-menu-content"><a href="">맟춤서비스</a></div>
            </div>
            <div class="nav-sub-menu">
              <div class="nav-sub-menu-title"><a href="">이벤트</a></div>
              <div class="nav-sub-menu-content"><a href="">진행중인 이벤트</a></div>
              <div class="nav-sub-menu-content"><a href="">종료된 이벤트</a></div>
              <div class="nav-sub-menu-content"><a href="">당첨자 발표</a></div>
            </div>
          </div>
          <div class="nav-wrap-5">
            <div class="linkWrap">
              <a href="/svc/customer/faqList.hm" class="btnCS">고객센터 바로가기<span class="ico"></span></a>
              <a href="http://www.happymoney.co.kr/svc/donation/index.hm" onclick="mainQuick_Action.setBannerReadCnt('941');" target="_blank" title="새창" class="banner"><img src="http://image.happymoney.co.kr/extimage/banner/201809191309686.jpg" alt="행복나눔 캠페인,빈곤을 해결하는 수단으로 행복나눔캠페인을 통해 공정무역 생산자를 지원합니다."></a></div>
          </div>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeAside: false,
      menus: [
        {'title': '해피캐시', 'subTitle': ['해피캐시 소개', '해피캐시 충전', '간편 충전', '무료 충전소'], is_active: false},
        {'title': '상품권', 'subTitle': ['상품권 소개', '상품권 구입', '상품권 교환소'], is_active: false},
        {'title': '사용처', 'subTitle': ['해피 쇼핑몰', '온라인 사용처', '오프라인 사용처'], is_active: false},
        {'title': '쇼핑 선물', 'subTitle': ['제휴 상품몰', '선물하기', '웹툰'], is_active: false},
        {'title': '해피박스', 'subTitle': ['해피쿠폰북', '해피스탬프', '추천핫딜쇼핑', '행복나눔', '맞춤서비스'], is_active: false},
        {'title': '이벤트', 'subTitle': ['진행중인 이벤트', '종료된 이벤트', '당첨자 발표'], is_active: false},
      ],
      centerHeaderIsActive: false
    }
  },
  methods: {
    handleClickHamburger() {
      this.activeAside=true;
    },
    handleClickDim() {
      this.activeAside=false;
    },
    handleClickSubAside(index) {
      this.menus[index].is_active=!this.menus[index].is_active;
    },
    centerHeaderMouseOver() {
      this.centerHeaderIsActive=true;
    },
    centerHeaderMouseOut() {
      this.centerHeaderIsActive=false;
    }
  }
}
</script>

<style lang="scss">
  .dim-dark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
  }

  // menu Transition
  .slide-menu-enter-active, .aside-sub-menu-fade-enter-active, ,.slide-menu-leave-active, .aside-sub-menu-fade-leave-active,
  .nav-container-fade-enter-active, .nav-container-fade-leave-active
  {
    transition: all .3s ease;
  }

  .slide-menu-enter, .slide-menu-leave-to{
    transform: translateX(-100%);
  }

  .aside-sub-menu-fade-enter, .aside-sub-menu-fade-leave-to , .nav-container-fade-enter, .nav-container-fade-leave-to{
    transform: translateY(-100%);
  }

  header {
    display: flex;
    justify-content: center;
    height: 100px;
    padding: 0 50px 0 50px;
    border-bottom: 1px solid #ccc;

    > aside {
      border: solid 1px rgba(220, 220, 220, 0.4);
      box-sizing: border-box;
      height: 100%;
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      background-color: #ffffff;
      overflow: scroll;
      transition: 0.5s;
      font-family: "Open Sans";
      width: 75%;

      > div {
        padding: 60px 20px 0 20px;

        > .aside-logo {
          width: 100%;
          margin-bottom: 10px;

          > .logo-img{
            width: 150px;
            height: 25px;
            float: left;
          }

          > a {
            float: right;
          }
        }

        > .aside-items {

          a {
            display: block;
            width: 100%;
            padding-bottom: 10px;
            padding-top: 10px;
            padding-left: 10px;
            padding-right: 10px;

            &:hover {
              background-color: #ccc;
            }
          }

          > .aside-menu-wrap {
            display: block;
            box-sizing: border-box;
            margin-top: 15px;

            > .aside-sub-menu-title {
              display: block;
              font-weight: bold;

              > a{
                display: flex;

                > span {
                  &:first-child {
                    margin-right: auto;
                  }
                  &:last-child {
                    margin-left: auto;
                  }
                }
              }
            }

            > .aside-sub-menu-wrap{
              overflow: hidden;
              > .aside-sub-menu {
                overflow: hidden;
                height: auto;
                text-align: left;

                > .aside-sub-menu-content {
                  padding-top: 10px;
                }
              }
            }
          }

          > .aside-menu-item {
            margin-top: 25px;
          }

          > div {
            margin-top: 35px;
            display: flex;

            > div > a {
              margin-right: 30px;
            }
          }
        }
      }

      span.icon {
        font-size: 25px !important;
      }
    }

    > .header-hamberger {
      display: none;
      margin-left: 5%;

      &:hover {
        cursor: pointer;
      }
    }

    > .aside-logo {
      display: none;
    }

    > .header-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        font-size: 1em;
        font-weight: bold;
        color: #222;
        letter-spacing: -0.04em;
        font-family: 'Nanum Gothic', sans-serif;
      }

      > div {
        display: flex;
      }

      > .left-header {
        margin-right: auto;
      }

      > .center-header {
        > div {
          padding: 0 30px 0 0;
          justify-content: center;
          align-items: center;
          display: flex;

          > div {
            justify-content: center;
            align-items: center;
            display: flex;
            height: 20px;

            &:after {
              content: ' ';
              height: 100%;
              display: block;
              border-right: 1px solid #ccc;
              padding-left: 30px;
              float: right;
            }
          }

          &:last-child {
            padding: 0;

            > div {
              &:after {
                border: none;
              }
            }
          }
        }
      }

      > .right-header {
        margin-left: auto;

        > a {
          font-size: 1em;
        }

        > div {
          display: flex;
          padding-left: 15px;

          &:before {
            padding-right: 15px;
            content: ' ';
            height: 100%;
            display: block;
            border-left: 1px solid #ccc;
            float: left;
          }

          &:last-child {
            padding-right: 15px;
          }
        }
      }
    }
  }

  nav {
    overflow: hidden;
    position: absolute;
    width: 100%;
    background-color: white;
    z-index: 998;

    &.active {
      height: 355px;
    }

    > .nav-container {
      display: flex;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;


      > div {
        display: flex;
        flex-direction: column;
        margin: auto;

        > .nav-sub-menu {
          display: flex;
          flex-direction: column;

          > .nav-sub-menu-title {
            margin-top: 20px;
            padding-bottom: 9px;
            font-size: 16px;
            font-weight: bold;
            color: #222;
          }

          > .nav-sub-menu-content {
            display: block;
            padding-top: 10px;
            font-size: 13px;


            > a {
              color: #767676;
            }
          }
        }
      }

      > .nav-wrap-1 {
        margin-right: auto;

        .happy21 {
          width: 265px;
          height: auto;
          padding: 30px 0 0;
          background: url(../../assets/css/images/index/GNBBanner_1.gif) 100% 100% no-repeat;
        }

        .happyShare {
          width: 265px;
          height: auto;
          margin-top: 20px;
          padding: 20px 0 0;
          border-top: 1px solid #f1f1f1;
          background: url(../../assets/css/images/index/GNBBanner_2.gif) 100% 100% no-repeat;
        }

        .gnbTl {
          padding-bottom: 9px;
          font-size: 16px;
          font-weight: bold;
          color: #222;
        }

        .gnbTxt {
          font-size: 12px;
          font-weight: bold;
          color: #767676;
        }

        a.btnGo {
          display: inline-block;
          *zoom: 1;
          *display: inline;
          height: 22px;
          line-height: 22px;
          margin-top: 18px;
          padding: 0 11px;
          background-color: #666;
          color: #fff;
          font-size: 12px;
        }
      }

      > .nav-wrap-5 {
        margin-left: auto;
        > .linkWrap {
          margin-top: 30px;
          padding-left: 40px;

          > .btnCS {
            display: block;
            height: 48px;
            line-height: 48px;
            padding: 0 22px;
            margin-bottom: 10px;
            border: 1px solid #ebebeb;
            background-color: #f8f8f8;
            font-size: 14px;
            font-weight: bold;
            color: #333;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1300px) {
    header {
      > .header-container {
        > .left-header {
          display: none !important
        }
      }
    }
  }

  @media only screen and (max-width: 970px) {
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;

      > .header-container {
        display: none !important;
      }

      > .header-hamberger{
        display: block;
      }

      > .aside-logo{
        display: flex;
      }
    }
  }
</style>
