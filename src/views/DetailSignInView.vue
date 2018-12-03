<template>
  <div class="loginView">
    <DetailSignIn :hostname="hostname" />
  </div>
</template>

<script>
import DetailSignIn from '@/components/signIn/DetailSignIn.vue'

export default {
  name: 'loginView',
  data() {
    return {
      hostname: require('@/assets/js/variable.js').hostname
    }
  },
  components: {
    DetailSignIn,
  }
}
</script>

<style lang="css">
</style>
