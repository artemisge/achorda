// GO TO *__* FUNCTIONS

function loadmenu() {
    console.log("clicked");
    location.href="menu.html";
}

function backtostart() {
    console.log("clicked");
    location.href="index.html";
}

function scales() {
    console.log("clicked");
    location.href="scales.html";
}

// SCALE/CHORDS/MODES FUNCTIONS

// reloads scale display everytime an attribute is changed
function changeDisplayScale() {
    var scale = "TODO: getStringScale();";
    document.getElementById("scaledisplay").innerHTML = scale;
  }
