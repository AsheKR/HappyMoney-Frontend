<template>
  <div id="Advertisement">
    <div v-if="!is_adNever_in_cookie">
      <a :href="img_url">
        <img :src="img_src" alt="NotFound" class="adImage" />
      </a>
      <button @click="AdClose">버튼</button>
      <span class="adNeverCloseCheckboxWrap">
        <checkbox v-model="adNever" id="adNeverCloseCheckbox"/>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .adImage {
    width: 100%;
  }
</style>

<script>
export default {
  data: () => ({
    img_url: 'http://www.happymoney.co.kr/svc/event/eventView.hm?eventInfoId=446&eventType=NORMAL&pageLink=event/m6001L.hm',
    img_src: 'http://image.happymoney.co.kr/extimage/banner/20180921130957.jpg',
    is_adNever_in_cookie: false,
    adNever: false
  }),
  methods: {
    AdClose: function() {
      this.setAdNeverFromCookie();
      this.is_adNever_in_cookie=true;
    },
    setAdNeverFromCookie: function() {
      this.$cookie.set('adNever', this.adNever);
    },
    getAdNeverFromCookie: function() {
      return this.$cookie.get('adNever');
    }
  },
  created() {
    var is_adNever_in_cookie = this.getAdNeverFromCookie()
    if (is_adNever_in_cookie !== null) {
      if (is_adNever_in_cookie == "false") {
        this.is_adNever_in_cookie = false;
      }else {
        this.is_adNever_in_cookie = true;
      }
    }
  }
}
</script>
