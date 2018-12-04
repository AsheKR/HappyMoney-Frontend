<template lang="html">
  <div class="onlineStore">
    <CategoryFilter :hostname="hostname"/>
  </div>
</template>

<script>
import CategoryFilter from './CommonCategorySearch.vue'

export default {
  props: ['hostname'],
  components: {
    CategoryFilter
  }
}
</script>

<style lang="scss">
</style>
