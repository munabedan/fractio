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
