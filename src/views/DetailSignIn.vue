<template>
  <div class="loginView">
    <DetailSingIn />
  </div>
</template>

<script>
import DetailSingIn from '@/components/SignIn/DetailSingIn.vue'

export default {
  name: 'loginView',
  data() {
    return {
      test: 0
    }
  },
  components: {
    DetailSingIn,
  }
}
</script>

<style lang="css">
</style>
