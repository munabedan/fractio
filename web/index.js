
let dropArea=document.getElementById('drop-area')
let docStats=new Map()
let SYLLABLES=0

let readabilityscore=0
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
            window.location.href="docstats.html"
            let filecontents=reader.result;

            
            //work on file
            docStats.set('title',file.name);
            docStats.set('characters',characterCount(filecontents));
            docStats.set('words',wordCount(filecontents));
            docStats.set('sentences',sentenceCount(filecontents));
            docStats.set('readtime',readTime(docStats.get('words')));
          
            eel.syllablescounter(filecontents.match(/\S+/g))(function(ret){
                calculateScore(docStats.get('words'),docStats.get('sentences'),ret)
            });

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
    return totalchars

}

//This function counts occurences of sentences in a file
function sentenceCount(data){
    let sentencecount=data.match(/\w[.?](\s|$)/g)
    
    return sentencecount.length
}

//This function calculates the expected reading time
function readTime(wordCount){
    const wordsPerMinute=200
    const minutes=wordCount/wordsPerMinute
    const readTime=Math.ceil(minutes)
    return `${readTime} min`
}



//Display output 



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



}

function calculateScore(totalwords,totalsentences,totalsyllables){      
console.log(totalwords,totalsentences,totalsyllables)
let score=206.835-1.015*(totalwords/totalsentences)-84.6*(totalsyllables/totalwords)

let readabilityscore=document.createElement('span')
readabilityscore.innerText=Math.ceil(score)
document.getElementById('readabilityscore').appendChild(readabilityscore)



}
