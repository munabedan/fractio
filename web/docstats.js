function navigateHome(){
    window.location.href="index.html"
}

console.log(sessionStorage)
//Display output 

function displayDocStats(){

    //title
    let title=document.createElement('h2')
    title.innerText=sessionStorage.getItem("title")
    document.getElementById('display-title').appendChild(title)

    //word count list
    let characters=document.createElement('span')
    characters.innerText=sessionStorage.getItem("characters")
    document.getElementById('characters').appendChild(characters)

    let words=document.createElement('span')
    words.innerText=sessionStorage.getItem("words")
    document.getElementById('words').appendChild(words)

    let sentences=document.createElement('span')
    sentences.innerText=sessionStorage.getItem("sentences")
    document.getElementById('sentences').appendChild(sentences)

    let readtime=document.createElement('span')
    readtime.innerText=sessionStorage.getItem("readtime")
    document.getElementById('readtime').appendChild(readtime)


    let readabilityscore=document.createElement('span')
    readabilityscore.innerText=sessionStorage.getItem("readscore")
    document.getElementById('readabilityscore').appendChild(readabilityscore)
    
    

}
displayDocStats()
