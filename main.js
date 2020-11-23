const notes =  stringToArray("A A# B C C# D D# E F F# G G#");

const major = "2 2 1 2 2 2 1";
const melodicMinor = "2 1 2 2 2 2 1";
// TODO update the steps in the scales below
const harmonicMinor = "2 1 2 2 1 3 1";
const harmonicMajor = "2 2 1 2 1 3 1";
const doubleHarmonicMajor = "1 3 1 2 1 3 1";

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
        updateChords();
        hideElement();
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
        updateChords();
        hideElement();
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

var scale;  // array of all notes in the scale build
var chords = []; // array of Strings with chords like ["C", "Dm"...]
var seventh = []; // array of strings with seventh chord notation like ["maj7", "7"...]

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
    scale = [];

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

function updateChords() {
    buildChords();
    console.log(chords);
    console.log(seventh);
    sev1 = document.getElementsByClassName("sev1");
    console.log(sev1);
    console.log(sev1.length);
        for (let i = 1; i < document.getElementsByClassName("Diatonic").length; i++) {
        document.getElementsByClassName("Diatonic")[i].innerHTML = chords[i-1] 
        + '<sup class="sev1"> ' + seventh[i-1] + "</sup";
    }
}

// builds an array of all triads and another array of seventh chord notation
function buildChords() {
    // DIATONIC

    // create as many triads as the notes
    chords = []; // array of strings like ["C", "Em"...]
    var wholeChord = []; // array with 1st, 3rd, 5th and 7th of a scale ['C', 'D'...]
    seventh = [];
    for (let i = 0; i < scale.length; i++) {
        wholeChord = [scale[i], scale[(i+2)%scale.length], scale[(i+4)%scale.length], scale[(i+6)%scale.length]];
        chords[i] = evaluatedChord(wholeChord, i);
    }
    

    // DOMINANT

    //PARALLEL

    //NEGATIVE

}
//TODO eg A A# => no same notes

function evaluatedChord(chord, i) {
    // calculates steps between chord notes eg C-E => 4, E-G => 3
    let first = (notes.indexOf(chord[1])>notes.indexOf(chord[0])) ? 
                    notes.indexOf(chord[1])-notes.indexOf(chord[0]) 
                    : (12 - Math.abs(notes.indexOf(chord[1])-notes.indexOf(chord[0])))%12;
    let second = (notes.indexOf(chord[2])>notes.indexOf(chord[1])) ? 
                    notes.indexOf(chord[2])-notes.indexOf(chord[1]) 
                    : (12 - Math.abs(notes.indexOf(chord[2])-notes.indexOf(chord[1])))%12;
    let third = (notes.indexOf(chord[3])>notes.indexOf(chord[2])) ? 
                    notes.indexOf(chord[3])-notes.indexOf(chord[2]) 
                    : (12 - Math.abs(notes.indexOf(chord[3])-notes.indexOf(chord[2])))%12;

    if (first == 4) {
        if (second == 3) {
            chord = chord[0] + ""; //MAJOR
            if (third == 4) seventh[i] = "maj7"; //MAJOR 7
            else seventh[i] = "7"; //DOMINANT 7
        }
        else chord = chord[0] + "aug"; //AUGMENTED
    } else { //==3
        if (second == 3) {
            chord = chord[0] + "dim"; //DIMINISHED
            if (third == 4) seventh[i] = "hdim7"; //HALF-DIMINISHED 7
            else seventh[i] = "fdim7"; //FULLY-DIMINISHED 7
        } else {
            chord = chord[0] + "m"; //MINOR
            if (third == 3) seventh[i] = "min7"; //MINOR 7
        }
    }
    return chord;
    console.log(chord);
    //console.log(seventh[i]);
}

function hideElement() {
    
    for (let i = 0; i < document.getElementsByClassName("sev1").length; i++) {
        let x = document.getElementsByClassName("sev1")[i];
        console.log(x);
        if (document.getElementById("add7").checked == true) {
            x.style.display = "inline-block";
        } else {
            x.style.display = "none";
        }
    }
    
}



function about() {
    console.log("yooo");
}
