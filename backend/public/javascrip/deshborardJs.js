function loadStyleCss(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
}
function loadPage(page, urlCss) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('content').innerHTML = xhr.responseText;
            if (urlCss) {
                loadStyleCss(urlCss);
              }
       
        }
    };
    xhr.open('GET', page, true);
    xhr.send();
}

  