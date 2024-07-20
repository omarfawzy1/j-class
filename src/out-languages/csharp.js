function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




function transform(intermediate, className){
    var code = ""
    const mappings = {
        "String": "string",
        "Double": "double",
        "Int": "int",
        "Long":"long",
        "DateOnly":"DateOnly",
        "DateTime":"DateTime",
        "Float":"float",
        "Boolean" : "bool",
        "Object" : "dynamic",
    }



    for(const item of intermediate){
        if(item.type.type == "Array"){
            code += `\n\tpublic ${mappings[item.type.innerType]}[] ${capitalizeFirstLetter(item.key)} { get; set; }`
        }
        else if(item.type.type == "List"){
            code += `\n\tpublic List<${mappings[item.type.innerType]}> ${capitalizeFirstLetter(item.key)} { get; set; }`
        }
        else{

            code += `\n\tpublic ${mappings[item.type.type]} ${capitalizeFirstLetter(item.key)} { get; set; }`
        }
    }


    return `public class ${className} { ${code} \n}`
}

export default transform
