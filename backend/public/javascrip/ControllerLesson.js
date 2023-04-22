const btnSave = document.getElementById('save');
btnSave.addEventListener('click', ()=>{
    var title = document.getElementById('title');
    var description = document.getElementById('description');
    var code = document.getElementById('code');
    var answer = document.getElementById('answer');

    if(title=="" || description == "" || code == "" || answer ==""){
        alert('Data is empty');
    }
});

const textareaTitle = document.getElementById("title");
textareaTitle.addEventListener("keyup" , e =>{
    textareaTitle.style.height = "63px";
    let scHeight = e.target.scrollHeight;
    textareaTitle.style.height = `${scHeight}px`;
});

const textareaDescription = document.getElementById("description");
textareaDescription.addEventListener("keyup" , e =>{
    textareaDescription.style.height = "63px";
    let scHeight = e.target.scrollHeight;
    textareaDescription.style.height = `${scHeight}px`;
});

const textareaCode = document.getElementById("code");
textareaCode.addEventListener("keyup" , e =>{
    textareaCode.style.height = "63px";
    let scHeight = e.target.scrollHeight;
    textareaCode.style.height = `${scHeight}px`;
});
const textareaAnswer = document.getElementById("answer");
textareaAnswer.addEventListener("keyup" , e =>{
    textareaAnswer.style.height = "63px";
    let scHeight = e.target.scrollHeight;
    textareaAnswer.style.height = `${scHeight}px`;
});