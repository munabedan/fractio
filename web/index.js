
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

    //Only works for text/plain file types
    if (file.type=='text/plain' ){
        let reader=new FileReader();

        reader.readAsText(file)
    
        reader.onload=function(){
            let filecontents=reader.result;
            console.log(filecontents)
            console.log(readTime(wordCount(filecontents)))
        }
    
        reader.onerror=function(){
            console.error("file could not be read")
        }
    }

    //TODO: -if type not available use other means 

    else{
        console.log("Type not supported: " +file.type)
    }

}

//This fuction counts the number of words in the data string
function wordCount(data){
    var words=data.match(/\S+/g);
    console.log(words)
    return words.length
}


//This function calculates the expected reading time
function readTime(wordCount){
    const wordsPerMinute=200
    const minutes=wordCount/wordsPerMinute
    const readTime=Math.ceil(minutes)
    return `${readTime} minute read`
}