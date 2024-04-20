
function BooleanHandler(){
    console.log("Boolean handling")
    return "Boolean";
}

function NumberHandler(number){
    console.log("Number handling " + number)

    var text = number.toString();
    if(!text.includes('.')){
        if(number < -2147483648 || (number > 2147483647)){
            return "Long"
        }
        return "Int"
    }
    if(text.split('.')[1].length > 7){
        return "Double";
    }
    return "Float"
}
function StringHandler(text){
    console.log("String handling " + text)

    if(checkDateString(text) != "Invalid format"){
        return checkDateString(text)
    }
    return "String"
}

function checkDateString(input) {
    const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD
    const dateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/; // Matches YYYY-MM-DDTHH:MM:SS and variants

    if (dateOnlyPattern.test(input)) {
        return "Date only";
    } else if (dateTimePattern.test(input)) {
        return "DateTime";
    } else {
        return "Invalid format";
    }
}

export default {
    "boolean" : BooleanHandler,
    "number" : NumberHandler,
    "string" : StringHandler 
};