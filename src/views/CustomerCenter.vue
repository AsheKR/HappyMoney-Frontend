<template>
  <div class="customerCenter">
    <CSCenterCommon />
    <div class="customerCenter__content">
      <router-view :hostname="hostname" />
    </div>
  </div>
</template>

<script>
import CSCenterCommon from '@/components/cscenter/CSCenterCommon.vue'

export default {
  data() {
    return {
      hostname: require('@/assets/js/variable.js').hostname
    }
  },
  components: {
    CSCenterCommon
  }
}
</script>

<style lang="scss">
  .customerCenter {

    .customerCenter__content {
      display: flex;
      max-width: 1200px;
      margin: auto;
    }
  }
</style>
