<template>
  <!-- <img alt="Vue logo" src="./assets/jclass-transparent.png"> -->
  <div class=" h-screen">

    <NavBar class=" absolute h-[6.0rem] top-0 font-['Londrina_Shadow'] w-full "></NavBar>
    <ConverterPage class=" w-full h-full pt-[6.0rem] text-white"  msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ConverterPage from './components/ConverterPage.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    ConverterPage,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
