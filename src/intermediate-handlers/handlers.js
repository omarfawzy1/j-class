/* eslint-disable no-debugger */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function BooleanHandler(){
    //console.log("Boolean handling")
    return {type:"Boolean"};
}

function NumberHandler(number){
    //console.log("Number handling " + number)

    var text = number.toString();
    if(!text.includes('.')){
        if(number < -2147483648 || (number > 2147483647)){
            return {type:"Long"}
        }
        return {type:"Int"}
    }
    if(text.split('.')[1].length > 7){
        return {type:"Double"}
    }
    return {type:"Float"}
}
function StringHandler(text){
    console.log("String handling " + text)

    if(checkDateString(text) != "Invalid format"){
        return checkDateString(text)
    }
    return {type:"String"}
}

// incase of finding a multiple objects inside each other we will dfs it using recurssion
// and will return an object containing the following the name of the class as an itermidiate object
// 

function ObjectHandler(object, key){
    if(Array.isArray(object)){ // in case its an array 
        console.log(`${key} is an array`)
        let innerTypes = []
        for(let key in object){
            let type = {type:handlers[typeof object[key]](object[key], key)}
            debugger
            if(type.type.type == "Custom")
                type = convertObjectToIntermediate(object[key])
            innerTypes.push(type)
        }
        
        //debugger;
        let allSame = true;
        for(let type of innerTypes){
            allSame = allSame && (type.type == innerTypes[0].type) 
        }
        console.log("innerTypes " + innerTypes[0].type + " all same = " + allSame )
        if(innerTypes[0].type == 'Custom'){
            return {type:"Custom Array", customType: innerTypes[0], value:object[key], name:capitalizeFirstLetter("SomeOtherClass")}
        }

        if(allSame)
            return {type:"Array", innerType:innerTypes[0]}
        


        return {type:"Array", innerType:"Object"} 
    }
    console.log(`The ${key} is currently a custom class`)
    //Custom Type
    return {type:"Custom", customType: convertObjectToIntermediate(object), value:object[key], name:capitalizeFirstLetter(key)}
    //return {type:"Object"}
}

function checkDateString(input) {
    const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD
    const dateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/; // Matches YYYY-MM-DDTHH:MM:SS and variants

    if (dateOnlyPattern.test(input)) {
        return {type:"DateOnly"};
    } else if (dateTimePattern.test(input)) {
        return  {type:"DateTime"};
    } else {
        return  "Invalid format";
    }
}
// function mergeTypes(){

// }

function convertObjectToIntermediate(object){
    
    var result = []
    for(const key in object){
      console.log("Converting to Object intermediate " + key + " " + object[key] + " " + typeof object[key] + " " + handlers[typeof object[key]](object[key],key).type) 
      result.push({
        key: key,
        type: handlers[typeof object[key]](object[key],key),
        value: object[key]
      }) 
    }

    return result
  }

var handlers = {
    "boolean" : BooleanHandler,
    "number" : NumberHandler,
    "string" : StringHandler,
    "object" : ObjectHandler
}




export default handlers;