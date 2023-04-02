const hidden = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        console.log(entry);

        if(entry.isIntersecting){
            entry.target.classList.add('show');

        }else{
            entry.target.classList.remove('show');
        }
    });
});

hidden.forEach((e)=> observer.observe(e));



const button_java = document.getElementById('btn-java');

button_java.addEventListener('click', ()=>{

    location.href= './lesson/lessonJava.html';

});


const routes = (event) =>{
    event=event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();

};

const router ={
    404 : "",
    "/" : "/public/index.html",
    "/course" : "/public/courseList.html",
    "/login": "public/login.html"
}

const handleLocation = async ()=>{
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then(
        (data)=> data.text()
    );
};
window.onpopstate = handleLocation;
window.route = route;
