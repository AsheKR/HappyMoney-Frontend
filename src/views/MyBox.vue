<template>
  <div class="mybox">
    <MyBoxTopMenu />
    <div class="mybox__content">
      <MyBoxLeftMenu />
      <div class="mybox__content--Detail">
        <router-view :hostname="hostname"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyBoxTopMenu from '@/components/mybox/MyBoxTopMenu.vue';
import MyBoxLeftMenu from '@/components/mybox/MyBoxLeftMenu.vue';

export default {
  data() {
    return {
      hostname: require('@/assets/js/variable.js').hostname
    }
  },
  components: {
    MyBoxTopMenu,
    MyBoxLeftMenu
  }
}
</script>

<style lang="scss">

  .mybox {
    > .mybox__content {
      display: grid;
      grid-template-columns: 252px 4fr;
      margin-top: 50px;

      > .mybox__content--Detail {
        margin: 0 15px 0 20px;
      }
    }
  }

</style>
