<template> 
    
    <div  class="bged w-full h-full bg-cover" style="background-image: url('light-bg.jpg');">
      <div class="flex flex-row items-center justify-center h-full gap-10">
        <div class="flex flex-col  w-[40%] h-[85%] bg-gradient-to-t from-[#8BA4C7] to-[#E3E9F2] border-[#283146] border-[6px] rounded-xl">
          <nav class="h-16 bg-[#3D4A6C] border-[#283146] border-b-[6px] flex justify-between px-10 items-center">
            <h2 class="font-['Crimson_Text'] font-semibold text-3xl"> Json </h2>
            <button class="material-symbols-outlined text-[2.5rem] text-[#FF867C]">
              cancel
            </button>
          </nav>
          <section class="h-full flex flex-col gap-5 p-10 items-center ">
            <div id="input-editor" class="w-[100%] h-[40%] text-black p-2 bg-white border-[#283146] border-[6px] rounded-xl text-start" contenteditable="true">{"username":"omar5220", "password":"123651"}</div>
          </section>
        </div>
        <div class="flex flex-col  w-[40%] h-[85%] bg-gradient-to-t from-[#8BA4C7] to-[#E3E9F2] border-[#283146] border-[6px] rounded-xl">
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
import handlers from "../intermediate-handlers/handlers"
export default {
  name: 'ConverterPage',
  props: {
    msg: String
  },
  data() {
    return {
      jsonFormatValidationStack: [],
      isValid : true,

    };
  },
  mounted() {
    this.onStart();
  },
  methods: {
    getCaretPosition(element) {
      var selection = window.getSelection();
      console.log("selection range " + selection.rangeCount)
      console.log(selection)
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        console.log("selection length " +  preCaretRange.toString())
        return preCaretRange.toString().length;
      }
      return 0;
    },
    setCaretPosition(element, position) {
      var range = document.createRange();
      var selection = window.getSelection();
      range.setStart(element.childNodes[0], position);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    },
    onStart() {
      var editor = document.getElementById('input-editor');
      // var getCaretPosition = this.getCaretPosition;
      // var setCaretPosition = this.setCaretPosition;

      editor.addEventListener('input', () => {
        // var cursorPosition = getCaretPosition(editor);
        console.log("Checking")
        var text = editor.innerText.trim();
        if(this.ValidJson(text)){
          this.ConvertToCSharp(text)
        }
        // var keywords = ['if', 'else', 'for', 'while', 'function', 'var', 'const', 'let']; // List of reserved keywords
        
        // // Loop through each keyword and replace occurrences with highlighted version
        // keywords.forEach(function(keyword) {
        //   var regex = new RegExp('\\b' + keyword + '\\b', 'g');
        //   text = text.replace(regex, '<span class="keyword">' + keyword + '</span>');
        // });
        
        // this.innerHTML = text; // Update content with highlighted keywords
        
        // setCaretPosition(editor, cursorPosition); // Restore cursor position
      });
    },
    ValidJson(jsonString){
      try {
        JSON.parse(jsonString);
        return true;
      } catch (error) {
          console.error("Invalid JSON:", error);
          return false;
      }
    },

    ConvertToIntermediate(jsonString){
      var variable = JSON.parse(jsonString);
      
      var result = []
      for(const key in variable){
        console.log("Converting to intermediate " + key + " " + variable[key] + " " + " " + handlers[typeof variable[key]](variable[key])) 
        result.push({
          key: key,
          type: handlers[typeof variable[key]](variable[key])
        }) 
      }

      return result
    }
    ,
    ConvertToCSharp(jsonString){
      console.log("Converting to c# " + jsonString)
      var result = this.ConvertToIntermediate(jsonString)

      for(const item of result){
        console.log(item.key + " " + item.type)
      }



    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bged{
    
  }
  .keyword{
    color: red;
  }
</style>
