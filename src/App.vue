<template>
  <!-- <img alt="Vue logo" src="./assets/jclass-transparent.png"> -->
  <div class=" h-screen " :class="{ dark: this.isDark}">

    <NavBar class=" absolute h-[6.0rem] top-0 font-['Londrina_Shadow'] w-full " @changeDarkMode="changeDarkMode"></NavBar>
    <ConverterPage class="w-full h-full pt-[6.0rem] text-white" ></ConverterPage>
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
  },
  data(){
    return {
      isDark : false
    }
  }
  ,
  methods: {
    changeDarkMode(){
      this.isDark = !this.isDark;
      console.log("Dark mode changed")
    }
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
