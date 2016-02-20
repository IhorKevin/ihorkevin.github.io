$(document).ready(function(){

    $(window).on('scroll', function(){

        var h = getHue() + 145 || 145,
            s = '72%',
            l = '57%';

        var color = h + ',' + s + ',' + l;

        var page = $('.page');

        setBgColor(page, color);
    });

    function setBgColor($elem, color) {

        $elem.css({
            'background-color': 'hsl(' + color + ')'
        });
    }

    function getHue() {

        var range = $('body').height() - $(window).height(),
            position = $(window).scrollTop();

        var hue = Math.floor(position * 360 / range);

        return hue;
    }

});