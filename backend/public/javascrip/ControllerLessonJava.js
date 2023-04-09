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