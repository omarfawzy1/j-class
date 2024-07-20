
function transform(intermediate, className){
    var code = ""
    const mappings = {
        "String": "string",
        "Double": "number",
        "Int": "number",
        "Long":"number",
        "DateOnly":"Date",
        "DateTime":"Date",
        "Float":"number",
        "Boolean" : "boolean",
        "Object" : "any",
    }



    for(const item of intermediate){
        if(item.type.type == "Array"){
            code += `,\n\t ${item.key}: ${mappings[item.type.innerType]}[]`
        }
        else if(item.type.type == "List"){
            code += `,\n\t ${item.key}: List<${mappings[item.type.innerType]}>:`
        }
        else{

            code += `,\n\t ${item.key}: ${mappings[item.type.type]}`
        }
    }


    return `interface ${className} { ${code.substring(1)} \n}`
}

export default transform
