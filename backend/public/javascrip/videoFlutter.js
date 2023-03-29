let videoList = document.querySelectorAll('.video-list-container .list');
videoList.forEach(video =>{
    video.onclick =()=>{
        let src = video.querySelector('.list-video').src;
        let title = video.querySelector('.list-title').innerHTML;
        document.querySelector('.main-video-container .main-video').src = src;
        document.querySelector('.main-video-container .main-video').play();
        document.querySelector('.main-video-container .main-title').innerHTML = title;



    };
});