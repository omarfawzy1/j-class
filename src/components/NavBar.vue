<template>
    <nav class="dark:bg-[#332D2D] bg-[#3D496B]  flex flex-row items-center justify-between border-b-8 border-[#21283A] transition-colors duration-500">
      <div class="flex flex-row items-center">
        <img class=" w-20 h-20" alt="Vue logo" src="../assets/jclass-transparent.png">
        <h1 class=" text-5xl text-[#EFF1F6]">JClass </h1>
      </div>  
        <button @click="changeDarkMode" class="flex items-center justify-center rounded-full w-[35px] h-[35px] bg-white dark:bg-[#332D2D] dark:text-white transition-all duration-500 dark:shadow-gray-500 border-black mr-20 shadow-md  relative">
          <span class="material-symbols-outlined absolute transition-opacity opacity-0 dark:opacity-100 duration-500">
            dark_mode
          </span> 
          <span class="material-symbols-outlined absolute transition-opacity dark:opacity-0 opacity-100 duration-500 text-orange-400">
            light_mode
          </span> 
      </button>
    </nav> 
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    darkMode: String
  },
  data() {
    return {
      localDarkMode: this.darkMode
    }
  },
  watch: {
    darkMode(newValue) {
      this.localDarkMode = newValue;
    }
  },
  methods: {
    changeDarkMode(){
      this.$emit('changeDarkMode');
    }
}


}
</script>