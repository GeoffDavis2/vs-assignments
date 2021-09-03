var theSquare = document.getElementById("da-square");

function chgBackgroundColor (theColorParam) {
    theSquare.style.backgroundColor = theColorParam;
}

theSquare.addEventListener("mouseenter", function () {chgBackgroundColor("blue")});
theSquare.addEventListener("mousedown", function () {chgBackgroundColor("red")});
theSquare.addEventListener("mouseup", function () {chgBackgroundColor("yellow")});
theSquare.addEventListener("dblclick", function () {chgBackgroundColor("green")});

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