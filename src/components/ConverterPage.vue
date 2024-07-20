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
            <h2 class="font-['Crimson_Text'] font-semibold text-3xl"> Csharp </h2>
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
      inputEditor : `{"username": "omar", "password": "1234"}`
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
    onStart() {
      var editor = document.getElementById('input-editor');

      editor.addEventListener("paste", function(e) {
          // cancel paste
          e.preventDefault();

          // get text representation of clipboard
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
          this.ConvertToCSharp(text)
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
    clearInput(){
      this.inputEditor = ""
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/**
 * atom-dark theme for `prism.js`
 * Based on Atom's `atom-dark` theme: https://github.com/atom/atom-dark-syntax
 * @author Joe Gibson (@gibsjose)
 */

 code[class*="language-"],
pre[class*="language-"] {
	color: #c5c8c6;
	text-shadow: 0 1px rgba(0, 0, 0, 0.3);
	font-family: Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace;
	direction: ltr;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto;
	border-radius: 0.3em;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	background: #1d1f21;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
	padding: .1em;
	border-radius: .3em;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #7C7C7C;
}

.token.punctuation {
	color: #c5c8c6;
}

.namespace {
	opacity: .7;
}

.token.property,
.token.keyword,
.token.tag {
	color: #96CBFE;
}

.token.class-name {
	color: #FFFFB6;
	text-decoration: underline;
}

.token.boolean,
.token.constant {
	color: #99CC99;
}

.token.symbol,
.token.deleted {
	color: #f92672;
}

.token.number {
	color: #FF73FD;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
	color: #A8FF60;
}

.token.variable {
	color: #C6C5FE;
}

.token.operator {
	color: #EDEDED;
}

.token.entity {
	color: #FFFFB6;
	cursor: help;
}

.token.url {
	color: #96CBFE;
}

.language-css .token.string,
.style .token.string {
	color: #87C38A;
}

.token.atrule,
.token.attr-value {
	color: #F9EE98;
}

.token.function {
	color: #DAD085;
}

.token.regex {
	color: #E9C062;
}

.token.important {
	color: #fd971f;
}

.token.important,
.token.bold {
	font-weight: bold;
}

.token.italic {
	font-style: italic;
}

</style>
