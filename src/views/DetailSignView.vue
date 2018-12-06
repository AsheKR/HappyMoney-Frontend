<template>
  <div class="loginView">
    <router-view :hostname="hostname"></router-view>
  </div>
</template>

<script>

export default {
  name: 'loginView',
  data() {
    return {
      hostname: require('@/assets/js/variable.js').hostname
    }
  }
}
</script>

<style lang="css">
</style>
