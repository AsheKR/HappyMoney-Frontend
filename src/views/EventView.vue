<template>
  <div class="EventView">
    <Breadcrumb />
    <div class="eventViewWrap">
      <div class="eventCateogry">
        <a href="#" :style="activeCSS()">
          <div class="eventCateogry__menu" :class="{ active: now_active == 1 }">
            <span>진행중인 이벤트</span>
          </div>
        </a>
        <a href="#">
          <div class="eventCateogry__menu">
            <span>지난 이벤트</span>
          </div>
        </a>
        <a href="#">
          <div class="eventCateogry__menu">
            <span>당첨자 발표</span>
          </div>
        </a>
      </div>
      <router-view :hostname="hostname"/>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb.vue'

export default {
  data() {
    return {
      hostname: require('@/assets/js/variable.js').hostname,
      now_active: 0
    }
  },
  components: {
    Breadcrumb,
  },
  methods: {
    activeCSS() {
      if (this.now_active == 1) {
        return {
          'background': '50% 100% no-repeat',
          'background-image': 'url('+require('@/assets/css/images/event/bgTab.png')+')',
          'padding-bottom': '5px'
        }
      }
    }
  },
  created() {
    if (this.$route.name === 'nowEvent') {
      this.now_active = 1;
    }
  }
}
</script>

<style lang="scss">

  .EventView {

    > .eventViewWrap {
      max-width: 1200px;
      margin: 50px auto;

      > .eventCateogry {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        > a {
          > .eventCateogry__menu {
            border: 1px solid #e6e6e6;
            background-color: #f5f5f5;
            font-size: 14px;
            font-weight: bold;
            color: #666;
            padding: 10px 0;

            &.active {
              border: 1px solid #4a4a4a;
              background-color: #555;
              font-weight: bold;
              color: #fff;
            }
          }
        }
      }
    }
  }

</style>
