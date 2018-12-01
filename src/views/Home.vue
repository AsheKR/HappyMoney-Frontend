<template>
  <div class="home">
    <Advertisement />
    <Header />
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Advertisement from '@/components/common/Advertisement.vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'


import '../assets/css/fonts/IcoMoon-Free.ttf'
import '../assets/css/icon/IcoMoon.css'
import '../assets/css/icon/icon.css'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Advertisement,
    Header,
    Footer
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');

html, body, ul {
  margin: 0;
  padding: 0;
  font-family: 'Nanum Gothic', sans-serif;
}

*, *::after, *::before { box-sizing:border-box; }

a {
  color: black;
  text-decoration: none;
}

.clearfix {
  overflow: hidden;
  &:after {
    display: block;
    content:"";
    clear: both;
  }
}
</style>
