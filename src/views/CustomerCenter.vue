<template>
  <div class="customerCenter">
    <CSCenterCommon />
    <div class="customerCenter__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import CSCenterCommon from '@/components/cscenter/CSCenterCommon.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    CSCenterCommon
  }
}
</script>

<style lang="scss">
</style>
