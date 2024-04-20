<template> 
    
    <div  class="bged w-full h-full bg-cover" style="background-image: url('dark-bg.jpg');">
      <div class="flex flex-row items-center justify-center h-full gap-5">
        <div class="flex flex-col  w-[40%] h-[80%] bg-gradient-to-t from-[#8BA4C7] to-[#E3E9F2] border-[#283146] border-[6px] rounded-xl">
          <nav class="h-16 bg-[#3D4A6C] border-[#283146] border-b-[6px] flex justify-between px-10 items-center">
            <h2 class="font-['Crimson_Text'] font-semibold text-3xl"> Json </h2>
            <button class="material-symbols-outlined text-[2.5rem] text-[#FF867C]">
              cancel
            </button>
          </nav>
          <section class="h-full flex flex-col gap-5 p-10 items-center ">
            <textarea class="w-[100%] h-[40%] text-black p-2 border-[#283146] border-[6px] rounded-xl">{"username":"omar5220", "password":"123651"}</textarea>
          </section>
        </div>
        <div class="flex flex-col  w-[40%] h-[80%] bg-gradient-to-t from-[#8BA4C7] to-[#E3E9F2] border-[#283146] border-[6px] rounded-xl">
          <nav class="h-16 bg-[#3D4A6C] border-[#283146] border-b-[6px] flex justify-between px-10 items-center">
            <h2 class="font-['Crimson_Text'] font-semibold text-3xl"> Csharp </h2>
            <button class="material-symbols-outlined text-[2.5rem] text-[#FF867C]">
              cancel
            </button>
          </nav>
          <section class="h-full flex flex-col gap-5 p-10 items-center ">
            <textarea class="w-[100%] h-[40%] text-black p-2 border-[#283146] border-[6px] rounded-xl">

            </textarea>
          </section>
        </div>

      </div>
    </div>
</template>


<script>
export default {
  name: 'ConverterPage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bged{
    
  }
</style>
