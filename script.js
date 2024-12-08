const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit',(e)=>{

    e.preventDefault();
    getWordInfo(form.elements[0].value);


});

const getWordInfo = async (word)=>{
   
try{

    resultDiv.innerHTML = "Fetching Data";

    const response = await fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

     const data = await response.json();

     let definitions = data[0].meanings[0].definitions[0];

     resultDiv.innerHTML=  `<h1> <strong>word:</strong>  ${data[0].word}</h1> 

     <p> <strong>Part of Speech:</strong><i>${data[0].meanings[0].partOfSpeech}</i></p>

      <p><strong>Meaning:</strong>${definitions.definition === undefined ? "not found " : definitions.definition}</p>

       <p><strong>Example:</strong>${definitions.example === undefined ? "not found" : definitions.example}</p>

       <p> <strong>Antonyms:</strong></p>

     
     `;

     // featching antonyms

     if(definitions.antonyms.length === 0 ) {

        resultDiv.innerHTML+=`<span> not found </span>`;
     }

else{

    for(let i=0; i<definitions.antonyms.length; i++){
        resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
    }
}

//adding read more buttoon


resultDiv.innerHTML += `<div><a href = "${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

}
catch (error){

    resultDiv.innerHTML = `<p>Sorry the word could not be found</p>`;
}
    
     
}
























