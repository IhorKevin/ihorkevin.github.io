$(document).ready(function(){function o(o,n){o.css({"background-color":"hsl("+n+")"})}function n(){var o=$("body").height()-$(window).height(),n=$(window).scrollTop(),a=Math.floor(360*n/o);return a}$(window).on("scroll",function(){var a=n()+145||145,t="72%",e="57%",u=a+","+t+","+e,l=$(".page");o(l,u)})}),$(document).ready(function(){$(".owl-carousel").owlCarousel({loop:!0,nav:!0,autoplay:!0,autoplayTimeout:5e3,autoplayHoverPause:!0,items:3,navText:!1,pagination:!1})});