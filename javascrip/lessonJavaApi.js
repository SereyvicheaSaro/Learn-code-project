async function fetchData() {
  fetch('http://localhost:5000/lesson/')
  .then(res=>{
    if(!res.ok){
      throw Error('Error')
    }
    return res.json();
  })
  .then(data=>{
    console.log(data.data);
    let showAPI = "";
    data.data.map((lessonJava)=>{
      showAPI += `<div>
      <h3 class="title">${lessonJava.title}</h3>
      <p class ="description">${lessonJava.description}</p>
      <pre class="pre-code">
          <code class="language-java">${lessonJava.code}</code>
      </pre>
      <p class ="answer">${lessonJava.answer}</p>
      </div>`
    });
    document.getElementById('showAPI').innerHTML = showAPI;
  })
  .catch(error =>{
    console.log(error);
  })
    
}
fetchData();
