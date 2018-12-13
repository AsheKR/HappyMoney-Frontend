<template>
  <div class="myboxInquiry">
    <div class="myboxInquiry__title">
      <span>{{ this.title }}</span>
      <span>즐거움과 생활이 연결되는 새로운 선물문화</span>
      <img :src="require('@/assets/css/images/mybox/tlUtil.png')" alt="">
    </div>
    <happyCash />
  </div>
</template>

<script>
import happyCash from '@/components/mybox/inquiry/happyCash.vue'

export default {
  data() {
    return {
      menu: undefined,
      title: '',
    }
  },
  components: {
    happyCash
  },
  created() {
    console.log(this.$route);
    this.menu = this.$route.params.name;
    this.title = this.$route.params.title;
  }
}
</script>

<style lang="scss">
  .myboxInquiry {

    > .myboxInquiry__title {
      display: flex;
      flex-direction: column;
      padding: 20px;
      margin-bottom: 30px;
      border: 1px solid #deac1f;
      background-color: #fec524;
      position: relative;

      > span {
        text-align: left;

        &:first-child {
          font-size: 1.2em;
          font-weight: normal;
          color: black;
        }

        &:nth-child(2) {
          font-size: 0.8em;
          color: #666;
        }
      }

      img {
        position: absolute;
        right: 0;
      }
    }
  }
</style>
