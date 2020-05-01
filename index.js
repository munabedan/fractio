//get drop area
let dropArea=document.getElementById('drop-area')

//prevent default behaviour
;['dragenter','dragover','dragleave','drop'].forEach(eventName =>{
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e){
    e.preventDefault()
    e.stopPropagation()
}

//drag idicator
;['dragenter','dragover'].forEach(eventName =>{
    dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave','drop'].forEach(eventName =>{
    dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e){
    dropArea.classList.add('highlight')
}

function unhighlight(e){
    dropArea.classList.remove('highlight')
}

//handle drop

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e){
    let dt=e.dataTransfer
    let files=dt.files
    handleFiles(files)
}

function handleFiles(files){
    ([...files]).forEach(uploadFile)

}

function readTheFile(file){
    var reader=new FileReader();

    reader.readAsText(file)

    reader.onload=function(){
        let contents=reader.result;
        console.log(contents)
    }

    reader.onerror=function(event){
        console.error("file could not be read"+event.target.error.code)
    }
}

function uploadFile(file){
    console.log(file)
    readTheFile(file)
   }