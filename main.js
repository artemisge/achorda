const notes =  stringToArray("A A# B C C# D D# E F F# G G#");

const major = "2 2 1 2 2 2 1";
const melodicMinor = "2 1 2 2 2 2 1";
// TODO update the steps in the scales below
const harmonicMinor = "2 1 2 2 1 3 1";
const harmonicMajor = "2 2 1 2 2 2 1";
const doubleHarmonicMajor = "2 2 1 2 2 2 1";

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
        updateScale(
            document.getElementsByClassName("key-selected")[0].innerText,
            document.getElementsByClassName("scale-selected")[0].innerText,
            document.getElementsByClassName("mode-selected")[0].innerText);
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
        updateScale(
            document.getElementsByClassName("key-selected")[0].innerText,
            document.getElementsByClassName("scale-selected")[0].innerText,
            document.getElementsByClassName("mode-selected")[0].innerText);
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
        updateScale(
            document.getElementsByClassName("key-selected")[0].innerText,
            document.getElementsByClassName("scale-selected")[0].innerText,
            document.getElementsByClassName("mode-selected")[0].innerText);
    })
})

// ------------UPDATE SCALE----------

//check if there is overflow in scale
function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

function stringToArray(str) {
    let arrayScale = str.split(" ");
    return arrayScale;
}

function arrayToString(array) {
    let str = 'ga';
    return str;
}

function updateScale(key, scaletype, mode) {
    var strscale = buildScale(key, scaletype, mode);
    
    document.getElementById("scaledisplay").innerHTML = strscale;
}

function cyclicRotation(array, position) {
    let array2 = [];
        for (var i = 0; i < array.length; i++) {
            array2[i] = array[(i+position) % array.length];
        }
        console.log("array2:"+array2);
    return array2;
}

// returns a string array aof all notes of the scale that builds
// TODO make mode option work
function buildScale(key, scaletype, mode) {
    var steps; // array of steps to build scale
    switch(scaletype) {
        case "Major":
            steps = stringToArray(major); 
            break;
        case "Melodic Minor":
            steps = stringToArray(melodicMinor); 
            break;
        case "Harmonic Minor":
            steps = stringToArray(harmonicMinor); 
            break;
        case "Harmonic Major":
            steps = stringToArray(harmonicMajor); 
            break;
        case "Double Harmonic Major":
            steps = stringToArray(doubleHarmonicMajor); 
            break;
    } 
    steps = steps.map(Number);
    console.log(steps);

    var scale = []; // array of all notes in the scale build
    let index = notes.indexOf(key); // index in array "notes" 
    scale[0] = key; // initialize scale with first note.
    
    for (var i = 1; i < steps.length; i++) {
        index += steps[i-1];
        scale[i] = notes[(index) % notes.length];
    }

    let position;
    switch (mode) {
        case "Ionian":
        case "1st":
            position = 0;
            break;

        case "Dorian":
        case "2nd":
            position = 1;
            break;

        case "Phrygian":
        case "3rd":
            position = 2;
            break;

        case "Lydian":
        case "4th":
            position = 3;
            break;
        
        case "Mixolydian":
        case "5th":
            position = 4;
            break;
        
        case "Aeolian":
        case "6th":
            position = 5;
            break;

        case "Locrian":
        case "7th":
            position = 6;
            break;
    }

    return cyclicRotation(scale, position).join(" ");
} 