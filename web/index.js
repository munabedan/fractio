
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
            wordCount(filecontents)
            characterCount(filecontents)
            sentenceCount(filecontents)
            console.log(file.name)
            displayDocStats(docStats)
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

    return words.length
}

//This function counts the number of characters in the file
function characterCount(data){

    let datalen=data.length
    
    let chars=data.match(/\s+/g)

    let totalchars=datalen-chars.length
    console.log(totalchars)

}

//This function counts occurences of sentences in a file
function sentenceCount(data){
    let sentencecount=data.match(/\w[.?](\s|$)/g)
    console.log(sentencecount.length)
}

//This function calculates the expected reading time
function readTime(wordCount){
    const wordsPerMinute=200
    const minutes=wordCount/wordsPerMinute
    const readTime=Math.ceil(minutes)
    return `${readTime} minute read`
}


//Display output 

let docStats=new Map()

function setdocStats(title,characters,word,sentences,readtime,speaktime,wordlen,sentencelen,readabilityscore){

    docStats.set('title',title)
    .set('characters',characters)
    .set('words',word)
    .set('sentences',sentences)
    .set('readtime',readtime)
    .set('speaktime',speaktime)
    .set('wordlen',wordlen)
    .set('sentencelen',sentencelen)
    .set('readabilityscore',readabilityscore);


}


function displayDocStats(docStats){

    //title
    let title=document.createElement('h2')
    title.innerText=docStats.get('title')
    document.getElementById('display-title').appendChild(title)

    //word count list
    let characters=document.createElement('span')
    characters.innerText=docStats.get('characters')
    document.getElementById('characters').appendChild(characters)

    let words=document.createElement('span')
    words.innerText=docStats.get('words')
    document.getElementById('words').appendChild(words)

    let sentences=document.createElement('span')
    sentences.innerText=docStats.get('sentences')
    document.getElementById('sentences').appendChild(sentences)

    let readtime=document.createElement('span')
    readtime.innerText=docStats.get('readtime')
    document.getElementById('readtime').appendChild(readtime)

    let speaktime=document.createElement('span')
    speaktime.innerText=docStats.get('speaktime')
    document.getElementById('speaktime').appendChild(speaktime)

    //readibility list

    let wordlen=document.createElement('span')
    wordlen.innerText=docStats.get('wordlen')
    document.getElementById('wordlen').appendChild(wordlen)

    let sentencelen=document.createElement('span')
    sentencelen.innerText=docStats.get('sentencelen')
    document.getElementById('sentencelen').appendChild(sentencelen)

    let readabilityscore=document.createElement('span')
    readabilityscore.innerText=docStats.get('readabilityscore')
    document.getElementById('readabilityscore').appendChild(readabilityscore)

}

