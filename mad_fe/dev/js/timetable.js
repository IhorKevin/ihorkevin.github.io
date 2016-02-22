$(document).ready(function () {
    var timetableFlag = false;

    var li = $('.timetable__item'),
        wrapper = $('.timetable__list');

    $(window).on('scroll', openList);

    function openList(e){
        if(timetableFlag) return;

        if(wrapper.offset().top < $(window).scrollTop() + 500) {
            timetableFlag = true;
            li.css({
                'animation-play-state': 'running'
            });
        }
    }

});