document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById('video');
    video.muted = true;
    if(Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource('http://localhost:8000/stream/videoplayback.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play().catch(e => console.log(e));
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'http://localhost:8000/stream/videoplayback.m3u8';
        video.addEventListener('canplay',function() {
        video.play().catch(e => console.log(e));
        });
    }
});