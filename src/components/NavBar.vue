<template>
    <nav class=" bg-[#3D496B] flex flex-row items-center border-b-8 border-[#21283A] ">
        <img class=" w-20 h-20" alt="Vue logo" src="../assets/jclass-transparent.png">
        <h1 class=" text-5xl text-[#EFF1F6]">JClass</h1>
    </nav> 
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String
  }
}
</script>