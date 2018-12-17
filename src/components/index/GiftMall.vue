<template>
  <div id="giftMall">
    <div class="row">
      <div class="col col1" :style="{ 'background': 'url('+require('@/assets/css/images/index/bgGiftMall.png')+')'}">
        <div class="col1_wrap">
          <h2>기프트 몰</h2>
          <div class="text">
            <strong>해피머니상품권 + 제휴상품권</strong>
            <p>즐거움과 생활이 연결되는</p>
            <p>새로운 선물문화</p>
          </div>
        </div>
      </div>
      <div class="col col2" @click="$router.push({'name': 'giftCardBuyInfo'})">
        <img :src="require('@/assets/css/images/index/201802071402401.jpg')" alt="이미지">
      </div>
      <div class="col col3" @click="$router.push({'name': 'giftCardBuyInfo'})">
        <img :src="require('@/assets/css/images/index/201802121402856.jpg')" alt="이미지">
      </div>
      <div class="col col4">
        <ul>
          <li @click="$router.push({'name': 'giftCardBuyInfo'})">- 해피머니상품권</li>
          <li @click="$router.push({'name': 'giftCardBuyInfo'})">- 해피머니온라인상품권(이메일)</li>
          <li @click="$router.push({'name': 'giftCardBuyInfo'})">- 해피머니온라인상품권(SMS)</li>
          <li @click="$router.push({'name': 'giftCardBuyInfo'})">- 해피머니온라인상품권(영수증)</li>
          <li @click="$router.push({'name': 'giftCardBuyInfo'})">- 해피머니온라인상품권(바코드)</li>
          <li @click="$router.push({'name': 'giftCardBuyInfo'})">- 사용처전용모바일상품권(바코드)</li>
        </ul>
      </div>
      <div class="col col5">
        <img :src="require('@/assets/css/images/index/201803301703394.jpg')" alt="이미지">
      </div>
      <div class="col col6">
        <img :src="require('@/assets/css/images/index/201805151105823.jpg')" alt="이미지">
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  #giftMall {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: auto;

    img {
      width: 100%;
      height: 100%;
    }

    > .row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.8rem;
      margin: 3rem 0;

      > .col {
        box-sizing: border-box;

        &.col2, &.col3, &.col5, &.col6 {
          cursor: pointer;

          &:hover {
            border: 1px solid black;
          }
        }

        &.col1 {
          padding: 0 1rem;
          background-repeat: no-repeat !important;
          background-position: 100% 100% !important;
          align-items: center;
          display: flex;

          > div.col1_wrap {

            > h2 {
              margin: 0;
              font-size: 1.8rem;
              text-align: left;

              &:after {
                display: block;
                content: ' ';
                border-bottom: 1px solid red;
                width: 40px;
                padding: 7px 0;
            }
          }

          > div {
            text-align: left;
            margin-top: 20px;
            > strong {
              font-size: 1.0em;
            }
            > p {
              margin: 0;
              font-size: 1.0em;
              color: #767676;
            }
          }
        }
        }

        &.col4 {
          border: 1px solid #eee;
          display: flex;
          align-items: center;
          padding: 0 1rem;

          > ul {
            list-style: none;
            text-align: left;

            > li {
              color: #666;
              padding: 3px 0;
              font-size: 0.8rem;
              cursor: pointer;

            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 800px) {
    #giftMall {

      > .row {
        display: flex;
        flex-direction: column;

        > .col1 {
          display: none !important;
        }

        > .col4 {
          display: none !important;
        }
      }
    }
  }
</style>
