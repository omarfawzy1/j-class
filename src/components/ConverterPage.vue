<template> 
    <div  class="bged w-full h-full bg-cover bg-light-background dark:bg-dark-background transition-all duration-500">
      <div class="flex flex-row items-center justify-center h-full gap-10">
        <div class="flex flex-col  w-[40%] min-h-[85%] bg-gradient-to-t from-[#8BA4C7] to-[#E3E9F2] dark:from-[#454444] dark:to-[#454444] transition-all duration-500  border-[#283146] border-[6px] rounded-xl">
          <nav class="h-16 bg-[#3D4A6C] dark:bg-[#332D2D] transition-colors duration-500 border-[#283146] border-b-[6px] flex justify-between px-10 items-center">
            <h2 class="font-['Crimson_Text'] font-semibold text-3xl"> Json </h2>
            <button @click="clearInput" class="material-symbols-outlined text-[2.5rem] text-[#FF867C]">
              cancel
            </button> 
          </nav>
          <section class="h-full flex flex-col gap-5 p-10 items-center ">
            <code @blur="onInputBlur" id="input-editor" v-text="inputEditor" class="language-json w-[100%] h-fit min-h-[40%] text-black p-2 bg-white dark:bg-[#1E1E1E] dark:text-white transition-colors duration-500 border-[#283146] border-[6px] rounded-xl text-start" contenteditable="true" style="  white-space: pre-wrap; overflow-wrap: break-word;"></code>
          </section>
        </div>
        <div class="flex flex-col  w-[40%] min-h-[85%] bg-gradient-to-t from-[#8BA4C7] to-[#E3E9F2] dark:from-[#454444] dark:to-[#454444] transition-all duration-500 border-[#283146] border-[6px] rounded-xl">
          <nav class="h-16 bg-[#3D4A6C] dark:bg-[#332D2D] transition-colors duration-500 border-[#283146] border-b-[6px] flex justify-between px-10 items-center">
            <select @change="onConverterChange" v-model="selectedOutputLang" class="font-['Crimson_Text'] font-semibold text-3xl bg-[#3D4A6C]">
              <option class="bg-opacity-0" v-for="option in outputLangOptions" v-bind:value="option.value" v-bind:key="option.value" >
                {{ option.text }}
              </option>
            </select>
            
            <button  class="material-symbols-outlined text-[2.5rem] text-[#FF867C]">
              cancel
            </button>
          </nav>
          <section class="h-full flex flex-col gap-5 p-10 items-center ">
            <!-- <div id="output-editor" class="w-[100%] h-fit min-h-[40%] text-black p-2 bg-white dark:bg-[#1E1E1E] dark:text-white transition-colors duration-500 border-[#283146] border-[6px] rounded-xl text-start" contenteditable="true" style="  white-space: pre-wrap; overflow-wrap: break-word;"> {{ code }}</div> -->
            <pre id="output-editor"  class="w-[100%] h-fit min-h-[40%] p-2 bg-white dark:bg-[#1E1E1E] transition-colors duration-500 border-[#283146] border-[6px] rounded-xl text-start" contenteditable="true" style="  white-space: pre-wrap; overflow-wrap: break-word;"><code class="language-cs" ></code></pre>
            </section>
        </div>
 
      </div>
    </div>
</template>


<script>
import handlers from "../intermediate-handlers/handlers"
import csharpTransformer from "../out-languages/csharp"
import typescriptTransformer from "../out-languages/typescript"
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-java';
Prism
//import loadLanguages from 'prismjs';

// import loadLanguages from 'prismjs/components/';

export default {
  name: 'ConverterPage',
  props: {
  },
  data() {
    return {
      jsonFormatValidationStack: [],
      isValid : true,
      code: "",
      inputEditor : `{"username": "omar", "password": "1234"}`,
      outputLangOptions: [
        {value: 0, text:"TypeScript", converter: typescriptTransformer},
        {value: 1, text:"Csharp", converter: csharpTransformer}
      ],
      selectedOutputLang: 0
    };
  },
  mounted() {
    //loadLanguages(['json'])

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
    onInputBlur(){
      Prism.highlightElement(document.getElementById("input-editor"))
    },
    onConverterChange(){
      var editor = document.getElementById('input-editor');
      var text = editor.innerText;

      if(this.ValidJson(text)){
        this.ConvertToSelectedLanguage(text)
      }
    },
    onStart() {
      var editor = document.getElementById('input-editor');
      // this.selectedOutputLang = this.outputLangOptions[0]
      console.log(this.selectedOutputLang);
      editor.addEventListener("paste", function(e) {
          // cancel paste
          e.preventDefault();
          var text = (e.originalEvent || e).clipboardData.getData('text/plain');

          // insert text manually
          document.execCommand("insertHTML", false, text);
      });
      editor.addEventListener('input', (event) => {
        // var cursorPosition = getCaretPosition(editor);
        console.log(event)
        console.log("Checking")
        var text = editor.innerText;

        
        
        //editor.innerText = text; // Update content with highlighted keywords
        console.log("editor text :" +   text + ";")

   

        if(this.ValidJson(text)){
          this.ConvertToTypescript(text)
        }
        
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
        console.log("Converting to intermediate " + key + " " + variable[key] + " " + typeof variable[key] + " " + handlers[typeof variable[key]](variable[key])) 
        result.push({
          key: key,
          type: handlers[typeof variable[key]](variable[key]),
          value: variable[key]
        }) 
      }

      return result
    }
    ,
    ConvertToCSharp(jsonString){
      console.log("Converting to c# " + jsonString)
      var result = this.ConvertToIntermediate(jsonString)

      this.code = csharpTransformer(result, "SomeClass")
      // Prism.highlightElement()
      let out = document.getElementById("output-editor")
      out.innerHTML = this.code
      Prism.highlightElement(out)
      console.log(this.code)

    },
    ConvertToSelectedLanguage(jsonString){
      var result = this.ConvertToIntermediate(jsonString)
      console.log(this.selectedOutputLang);
      let converter = this.outputLangOptions.find(x => x.value == this.selectedOutputLang).converter
      
      this.code = converter(result, "SomeClass")
      
      let out = document.getElementById("output-editor")
      out.innerHTML = this.code
      Prism.highlightElement(out)
      console.log(this.code)

    },
    ConvertToTypescript(jsonString){
      console.log("Converting to typescript" + jsonString)
      var result = this.ConvertToIntermediate(jsonString)

      this.code = typescriptTransformer(result, "SomeClass")
      
      let out = document.getElementById("output-editor")
      out.innerHTML = this.code
      Prism.highlightElement(out)
      console.log(this.code)

    },
    clearInput(){
      this.inputEditor = ""
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
