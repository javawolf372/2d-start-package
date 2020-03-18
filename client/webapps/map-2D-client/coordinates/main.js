var mainDivW = 1230;
var mainDivH = 650;
$(document).ready(function(){
    $("#coordinatesMainDiv").css({
        "width": mainDivW+"px",
        "height": mainDivH+"px",
        "background-size": mainDivW+"px "+mainDivH+"px"
    });
});

function mo(e) {
    $("#spanX").html(e.pageX-20);
    $("#spanY").html(e.pageY-20);
}