$(document).ready(function () {
    var playButton = $('.online-player__button');
    var stream = new Audio();
    stream.src = "http://rkpi.me/getStream";

    playButton.on('click', playPause);

    function playPause() {
        if(stream.paused) {
            stream.play();
        } else {
            stream.pause();
        }
    }
});
