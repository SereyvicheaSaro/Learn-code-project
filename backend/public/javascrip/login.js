const btnLogin = document.getElementById("login");

btnLogin.addEventListener('click', ()=>{
    var username = document.getElementById('username');
    var password =document.getElementById('password');

    if(username =="" && password ==""){
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
    }
});