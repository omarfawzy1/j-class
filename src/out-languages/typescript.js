function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function transform(intermediate, className){
    var code = ""
    const mappings = {
        "String": "string",
        "Double": "double",
        "Int": "int",
        "DateOnly":"DateOnly",
        "DateTime":"DateTime",
        "Float":"float",
        "Boolean" : "bool",
        "Object" : "dynamic"
    }



    for(const item of intermediate){
        code += `\n\tpublic ${mappings[item.type]} ${capitalizeFirstLetter(item.key)} { get; set; }`
    }


    return `public class ${className} { ${code} \n}`
}

export default transform
