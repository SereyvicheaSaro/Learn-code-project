function loadPage(page) {
    // Use AJAX to load the contents of the page
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Replace the contents of the main content area with the loaded HTML
            document.getElementById('content').innerHTML = xhr.responseText;
        }
    };
    xhr.open('GET', page, true);
    xhr.send();
}
