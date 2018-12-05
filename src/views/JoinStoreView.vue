<template>
  <div class="joinStoreView">
    <Breadcrumb />
    <router-view :hostname="hostname"></router-view>
  </div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb.vue'

export default {
  name: 'joinStoreView',
  data() {
    return {
      hostname: require('@/assets/js/variable.js').hostname
    }
  },
  components: {
    Breadcrumb,
  },
}
</script>

<style lang="scss">
</style>
