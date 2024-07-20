
function BooleanHandler(){
    console.log("Boolean handling")
    return {type:"Boolean"};
}

function NumberHandler(number){
    console.log("Number handling " + number)

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

function ObjectHandler(object){
    if(Array.isArray(object)){
        let innerTypes = []
        for(let key in object){
            let type = handlers[typeof object[key]](object[key]).type
            if(type == "Object")
                type = convertObjectToIntermediate(object[key]).type
            innerTypes.push(type)
        }
        let allSame = true;
        for(let type of innerTypes){
            allSame = allSame && (type == innerTypes[0]) 
        }
        console.log("innerTypes " + innerTypes[0] + " all same = " + allSame )
        if(allSame)
            return {type:"Array", innerType:innerTypes[0]}
        return {type:"Array", innerType:"Object"} 
    }

    return {type:"Object"}
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

function convertObjectToIntermediate(object){
    
    var result = []
    for(const key in object){
      console.log("Converting to Object intermediate " + key + " " + object[key] + " " + typeof object[key] + " " + handlers[typeof object[key]](object[key]).type) 
      result.push({
        key: key,
        type: handlers[typeof object[key]](object[key]).type,
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