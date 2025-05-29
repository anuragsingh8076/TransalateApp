const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const icons = document.querySelectorAll("img");

selectTag.forEach((tag, id)=>{
    
  for (const countriesCode in countries) {
     let selected ;
     if(id ==0 && countriesCode == "en-GB"){
      selected ="selected";
     }else if(id ==1 && countriesCode == "hi-IN"){
      selected = " selected";
     }
  let option = `<option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;
  tag.insertAdjacentHTML("beforeend", option);
         }

});

translateBtn.addEventListener(("click") , ()=> {
  let Text = fromText.value,
  translateFrom = selectTag[0].value,
  translateTo = selectTag[1].value;

  let apiURL =`https://api.mymemory.translated.net/get?q=${Text}!&langpair=${translateFrom}|${translateTo}`;

  fetch(apiURL).then(res => res.json()).then(data =>{


    toText.value = data.responseData.translatedText;
  });


});

icons.forEach(icon => {
icon.addEventListener( "click", ({target}) => {
  if(target.classList.contains("copy")){ 
    if(target.id == "from"){
        navigator.clipboard.writeText(fromText.value) 
    }else{
        navigator.clipboard.writeText(toText.value)
    }
  }else{
    let utterence;
    if(target.id == "from"){
      utterence = new SpeechSynthesisUtterance(fromText.value)
      utterence.lang = selectTag[0].value
    }else{
      utterence = new SpeechSynthesisUtterance(toText.value)
      utterence.lang = selectTag[1].value
    }
    speechSynthesis.speak(utterence);
  }
});
});

