<template>
  <div id="etc">
    <div class="etcWrap">
      <div class="firstEtc">
        <div class="etc">
          <a href="#"><img :src="require('@/assets/css/images/index/etc_1.gif')" alt=""></a>
        </div>
        <div class="etc">
          <a href="#"><img :src="require('@/assets/css/images/index/etc_2.gif')" alt=""></a>
        </div>
      </div>
      <div class="etc">
        <a href="#"><img :src="require('@/assets/css/images/index/201809031609538.jpg')" alt=""></a>
      </div>
      <div class="etc">
        <a href="#"><img src="http://image.happymoney.co.kr/extimage/banner/201808031508942.jpg" alt=""></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  #etc {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px auto;
    max-width: 1200px;

    .etcWrap {
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;

      > .firstEtc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px solid #ddd;

        > .etc {
          padding: 7px 0;

          &:first-child {
            border-bottom: 1px solid #ddd;
          }
        }
      }

      > .etc {

        > a {
          display: block;
          height: 100%;

          > img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 800px) {
    .etcWrap {
      display: flex !important;
      flex-direction: column;
    }
  }
</style>
