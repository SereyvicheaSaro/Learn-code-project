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
