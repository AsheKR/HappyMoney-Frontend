<template>
  <div id="Advertisement">
    <div v-if="!is_adNever_in_cookie">
      <a :href="img_url">
        <img :src="img_src" alt="NotFound" class="adImage" />
      </a>
      <button @click="AdClose" class="adCloseButton">
        <span class="icon icon-cross"></span>
      </button>
      <span class="adNeverCloseCheckboxWrap">
        <input type="checkbox" v-model="adNever" id="adNeverCloseCheckbox"/>
        <label for="adNeverCloseCheckbox">오늘은 그만보기</label>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  div#Advertisement {
    position: relative;

    .adImage {
      width: 100%;
    }

    button.adCloseButton {
      position: absolute;
      top: 2px;
      right: 2px;

      background: none;
      border: none;
      cursor: pointer;

      > span.icon {
        font-size: 0.4em !important;
      }
    }

    span.adNeverCloseCheckboxWrap {
      position: absolute;
      bottom: 5px;
      right: 2px;
      cursor: pointer;

      > input[type="checkbox"] {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid #bcbcbc;

        & + label {
          font-size: 0.7em;
          vertical-align: center;
        }
      }
    }
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
