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

// key dropdown 
const keySelected = document.querySelector(".key-selected");
const keyOptionsContainer = document.querySelector(".key-options-container");
const keyOptionsList = document.querySelectorAll(".key-option");

keySelected.addEventListener("click", () => {
    // add or remove class "active" from selected
    keyOptionsContainer.classList.toggle("active");
})

keyOptionsList.forEach( o => {
    o.addEventListener("click", () => {
        keySelected.innerHTML = o.querySelector("label").innerHTML;
        keyOptionsContainer.classList.remove("active");
    })
})

// scale type dropdown 
const scaleSelected = document.querySelector(".scale-selected");
const scaleOptionsContainer = document.querySelector(".scale-options-container");
const scaleOptionsList = document.querySelectorAll(".scale-option");

scaleSelected.addEventListener("click", () => {
    // add or remove class "active" from selected
    scaleOptionsContainer.classList.toggle("active");
})

scaleOptionsList.forEach( o => {
    o.addEventListener("click", () => {
        scaleSelected.innerHTML = o.querySelector("label").innerHTML;
        scaleOptionsContainer.classList.remove("active");
    })
})

// mode dropdown 
const modeSelected = document.querySelector(".mode-selected");
const modeOptionsContainer = document.querySelector(".mode-options-container");
const modeOptionsList = document.querySelectorAll(".mode-option");

modeSelected.addEventListener("click", () => {
    // add or remove class "active" from selected
    modeOptionsContainer.classList.toggle("active");
})

modeOptionsList.forEach( o => {
    o.addEventListener("click", () => {
        modeSelected.innerHTML = o.querySelector("label").innerHTML;
        modeOptionsContainer.classList.remove("active");
    })
})
