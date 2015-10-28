(function() {
    var secondsDom = document.querySelector('.seconds'),
        millisecondsDom = document.querySelector('.milliseconds');

    var timeLimit = 60 * 1000;
    var startTime = new Date();
    var currentTime;

    timer();


    function timer() {
        currentTime = new Date();

        var timeLeft = timeLimit - (currentTime.getTime() - startTime.getTime());
        renderTimer(timeLeft);

        if(timeLeft > 100) {
            setTimeout(timer, 90);
        } else {
            renderTimer(0);
        }
    }

    function renderTimer(timeLeft) {
        var seconds,
            milliseconds;

        if(timeLeft > 999) {
            seconds = Math.floor(timeLeft/1000);
        } else {
            seconds = 0;
        }
        if(seconds > 0) {
            milliseconds = Math.floor((timeLeft % (seconds * 1000))/10);

        } else {
            milliseconds = Math.floor(timeLeft/10);
        }

        if(seconds < 10) seconds = '0' + seconds;
        if(Math.abs(milliseconds) < 10) milliseconds = '0' + Math.abs(milliseconds);

        secondsDom.textContent = seconds;
        millisecondsDom.textContent = milliseconds;
    }
})(window);