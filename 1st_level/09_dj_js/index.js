var theSquare = document.getElementById("da-square");

var chgBackgroundColor = function(theColorParam) {
    theSquare.style.backgroundColor = theColorParam;
}

theSquare.addEventListener("mouseover", e => chgBackgroundColor("blue"));
theSquare.addEventListener("mousedown", e => chgBackgroundColor("red"));
theSquare.addEventListener("mouseup", e => chgBackgroundColor("yellow"));
theSquare.addEventListener("dblclick", e => chgBackgroundColor("green"));

document.addEventListener("wheel", function (){theSquare.style.backgroundColor = "orange";});
document.addEventListener("keydown", function(event) {
    switch (event.code) {
        case "KeyB" : chgBackgroundColor("blue"); break;
        case "KeyR" : chgBackgroundColor("red"); break;
        case "KeyY" : chgBackgroundColor("yellow"); break;
        case "KeyG" : chgBackgroundColor("green"); break;
        case "KeyO" : chgBackgroundColor("orange"); break;
    }
})