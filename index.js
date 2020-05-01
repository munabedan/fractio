
let dropArea=document.getElementById('drop-area')

//This code prevents default behaviour for drag events
;['dragenter','dragover','dragleave','drop'].forEach(eventName =>{
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e){
    e.preventDefault()
    e.stopPropagation()
}

//This code highlights the drop area if an item is dragged over
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

//This is an event handler for the button and drop area

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e){
    let dt=e.dataTransfer
    let files=dt.files
    handleFiles(files)
}

function handleFiles(files){
    ([...files]).forEach(readTheFile)

}

//This function oppens the file and prints content to the console
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

   