<template>
  <div id="joinStore" :style="{ 'background-image': 'url('+require('@/assets/css/images/index/bgJoinStore.gif')+')'}">
    <h2>해피캐시로 이용할 수 있는 주요 쇼핑몰</h2>
    <div class="joinStoreDetailWrap">
      <a href="#">자세히 &#10095;</a>
      <div class="joinStoreWrap" v-if="show">
        <div class="store" v-for="store in joinStore" :key="store.id">
          <img :src="store.shop_image" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['hostname'],
    data() {
      return {
        joinStore: [],
        show: false
      }
    },
    created() {
      const url = this.hostname + '/apis/use-point/?point=online&page_size=9';
      this.$http.get(url).then(
        response => {
          if (response.status == '200') {
            this.joinStore = response.data.results;
          }
          this.show = !this.show;
        },
        error => {
          console.log(error);
        });
    }
  }
</script>

<style lang="scss">
  #joinStore {
    height: 500px;
    background-color: #f2f4fa;
    background-position: 50% 0;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }

    .joinStoreDetailWrap {
      display: block;
      text-align: right;

      > a {
        color: #aaa;
        font-size: 0.8em;
      }

      > .joinStoreWrap {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        margin-top: 10px;
        color: white;

          > .store {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 10px;

            &:first-child {
              grid-row-start: 1;
              grid-row-end: 3;
            }
          }
      }
    }
  }
</style>
