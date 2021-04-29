const fileSelector = document.querySelector('.file');
let jsonTextarea = document.querySelector('.json');
let csvTextarea = document.querySelector('.csv');
const convertBtn = document.querySelector('.convert');



convertBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    let jsonString = jsonTextarea.value;
    let arr = isValidJSONString(jsonString) ? JSON.parse(jsonString) : alertUser();
    let headers = [];
    let data = [];
    let key = Object.keys(arr[0]);
    headers.push(key);
    arr.forEach(obj => {
        let value = Object.values(obj);
        data.push(value)
    })
    headers = headers.join("");
    data = data.join("\n");

    csvTextarea.value = headers + "\n" + data;
})

fileSelector.addEventListener('change', (ev) => {
    const reader = new FileReader();
    // returns a FileList Array like Object not array. Numbered properties that point to objects which are files with properties
    reader.onload = () => {
        let JSONFile = reader.result;
        let arr = isValidJSONString(JSONFile) ? JSON.parse(JSONFile) : alertUser();
        if(arr.length > 0) {
            console.log('hello')
            jsonTextarea.value = JSONFile;
        }
    }
    
    let file = ev.target.files[0];
    reader.readAsText(file)
    
})

jsonTextarea.addEventListener('input',()=> {
    let jsonString = jsonTextarea.value;
    let arr = isValidJSONString(jsonString) ? JSON.parse(jsonString) : alertUser();
    if(arr.length > 0) {
        
        
    }
})

function alertUser() {
    return []; //If not JSON file
}

function isValidJSONString(str) {
    try {
        JSON.parse(str)
    } catch(err) {
        return false;
    }
    return true;
}