<template >
  <div class="card">
    <Breadcrumb />
    <router-view />
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

<style lang="css">
</style>
