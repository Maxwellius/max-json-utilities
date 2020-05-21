const fs = require('fs')

function compareJSONObjects(jsonA, jsonB, basekey = ''){
    //Checking That both of them are not strings
    console.log("Je passe dans la fonction")
    if(typeof jsonA === 'string' || typeof jsonB === 'string'){
        return returnedValue = {isIdentical: true, keypath: null};
    } else {
        var returnedValue = {isIdentical: true, keypath: null};
        var i = 0
        var keyset = null
        if (Object.keys(jsonA).length > Object.keys(jsonB).length){
            keyset = Object.keys(jsonA)
        } else {
            keyset = Object.keys(jsonB)
        }
        while (returnedValue.isIdentical && i < keyset.length ) {
            var key = keyset[i]
            console.log(key);
            if (jsonB.hasOwnProperty(key) && jsonA.hasOwnProperty(key)){
                returnedValue = compareJSONObjects(jsonA[key], jsonB[key], basekey+'/'+key)
            } else {
                if(!jsonB.hasOwnProperty(key)){
                    basekey = 'JSONB' + basekey
                } else {
                    basekey = 'JSONA' + basekey
                }
                returnedValue = {isIdentical: false, keypath: basekey+'/'+key};
            }
            i++;
        }
        return returnedValue;
    }
}

if (process.argv.length < 4){
    console.error("Please put two json files to compare");
} else {
    const firstFilePath = process.argv[2];
    const secondFilePath = process.argv[3];

    firstFileJSON = fs.readFileSync(firstFilePath, 'utf-8');
    secondFileJSON = fs.readFileSync(secondFilePath, 'utf-8');

    const jsonFirst = JSON.parse(firstFileJSON); 
    const jsonSecond = JSON.parse(secondFileJSON);
    console.log(compareJSONObjects(jsonFirst, jsonSecond));
}
