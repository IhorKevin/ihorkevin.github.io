$(document).ready(function(){function o(o,n){o.css({"background-color":"hsl("+n+")"})}function n(){var o=$("body").height()-$(window).height(),n=$(window).scrollTop(),c=Math.floor(360*n/o);return c}$(window).on("scroll",function(){var c=n()+145||145,r="72%",i="57%",t=c+","+r+","+i,d=$(".page");o(d,t)})});