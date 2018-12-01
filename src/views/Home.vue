<template>
  <div class="home">
    <Advertisement />
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Advertisement from '@/components/common/Advertisement.vue'
import Footer from '@/components/common/Footer.vue'

import '../assets/css/fonts/IcoMoon-Free.ttf'
import '../assets/css/icon/IcoMoon.css'
import '../assets/css/icon/icon.css'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Advertisement,
    Footer
  }
}
</script>

<style>

</style>
