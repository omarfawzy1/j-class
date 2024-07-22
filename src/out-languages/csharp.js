/* eslint-disable no-debugger */
function capitalizeFirstLetter(string) {
    if(!string || string == "")
        return ""
    return string.charAt(0).toUpperCase() + string.slice(1);
}




function transform(intermediate, className) {
    var code = ""
    const mappings = {
        "String": "string",
        "Double": "double",
        "Int": "int",
        "Long": "long",
        "DateOnly": "DateOnly",
        "DateTime": "DateTime",
        "Float": "float",
        "Boolean": "bool",
        "Object": "dynamic",
    }

    let customTypes = []

    for (const item of intermediate) {
        let typeName = "";
        let fieldName = capitalizeFirstLetter(item.key);

        if (item.type.type.includes("Custom")) {
            console.log("Custom Class")
            customTypes.push({type:item.type.customType, name: item.type.name})
            typeName = item.type.name;
        }
        
        debugger;

        if (item.type.type.includes("Array")) {
            if(typeName == "")
                typeName = `${mappings[item.type.innerType]}`
            typeName = `${typeName}[]`
        }
        else if (item.type.type == "List") {
            typeName = `List<${mappings[item.type.innerType]}>`
        }
        else if(typeName == ""){
            typeName = `${mappings[item.type.type]}`
        }

        code += `\n\tpublic ${typeName} ${fieldName} { get; set; }`

    }

    let otherClass = ""
    for(let type of customTypes){
        otherClass += `\n${transform(type.type, type.name)}`
    }
    return `public class ${className} { ${code} \n} \n${otherClass}` 
}

export default transform
