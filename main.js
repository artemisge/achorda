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
var scaletype;
var chords = []; // array of Strings with chords like ["C", "Dm"...]
var seventh = []; // array of strings with seventh chord notation like ["maj7", "7"...]
var domchords = []; //only in major/h. minor
var domseventh = [];
var parchords = []; //only in major/h. minor
var parseventh = [];
var negchords = []; //only in major/h. minor

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

function updateScale(key, type, mode) {
    scaletype = type;
    let tempscales = buildScale(key, scaletype, mode);
    var strscale = tempscales[0].join(" "); // scale that has been rotated, will be displayed
    scale = tempscales[1]; //original scale
    document.getElementById("scaledisplay").innerHTML = strscale;
}

function cyclicRotation(array, position) {
    let array2 = [];
        for (var i = 0; i < array.length; i++) {
            array2[i] = array[(i+position) % array.length];
        }
    return array2;
}

// returns an array of all notes of the scale that builds in the mode choses and one pure
function buildScale(key, scaletype, mode) {
    var steps = []; // array of steps to build scale
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
    let tmpscale = [];

    let index = notes.indexOf(key); // index in array "notes" 
    tmpscale[0] = key; // initialize scale with first note.
    
    for (var i = 1; i < steps.length; i++) {
        index += steps[i-1];
        tmpscale[i] = notes[(index) % notes.length];
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

    return [cyclicRotation(tmpscale, position), tmpscale];
} 

function updateChords() {
    buildChords();
    sev1 = document.getElementsByClassName("sev1");
    for (let i = 1; i < document.getElementsByClassName("Diatonic").length; i++) {
        document.getElementsByClassName("Diatonic")[i].innerHTML = chords[i-1] 
        + '<sup class="sev1"> ' + seventh[i-1] + "</sup";
    }
    for (let i = 1; i < document.getElementsByClassName("Dominant").length; i++) {
        document.getElementsByClassName("Dominant")[i].innerHTML = domchords[i-1] 
        + '<sup class="sev2"> ' + domseventh[i-1] + "</sup";
    }
    for (let i = 1; i < document.getElementsByClassName("Parallel").length; i++) {
        document.getElementsByClassName("Parallel")[i].innerHTML = parchords[i-1] 
        + '<sup class="sev3"> ' + parseventh[i-1] + "</sup";
    }
}

// builds an array of all triads and another array of seventh chord notation
function buildChords() {
    // DIATONIC

    // create as many triads as the notes
    chords = []; // array of strings like ["C", "Em"...]
    var wholeChord = []; // array with 1st, 3rd, 5th and 7th of a scale ['C', 'D'...]
    seventh = [];
    let values = [];
    for (let i = 0; i < scale.length; i++) {
        wholeChord = [scale[i], scale[(i+2)%scale.length], scale[(i+4)%scale.length], scale[(i+6)%scale.length]];
        values = evaluatedChord(wholeChord);
        chords[i] = values[0]; //chord
        seventh[i] = values[1]; //seventh
    }
    
    // DOMINANT
    domchords = [];
    // 1st and 7th chords dominant wont be calculated
    for (let i = 1; i < scale.length-1; i++) {
        domchords[i] = notes[(notes.indexOf(scale[i]) + 7) % 12]; 
        // in major minor always a perfect fifth from the current note
        domseventh[i] = "7";
    }
    domchords[0] = "-";
    domchords[scale.length-1] = "-";
    domseventh[0] = "";
    domseventh[scale.length-1] = "";

    //PARALLEL
    if (scaletype == "Major" | scaletype == "Harmonic Minor" | scaletype == "Melodic Minor") {
        parchords = []; // array of strings like ["C", "Em"...]
        wholeChord = []; // array with 1st, 3rd, 5th and 7th of a scale ['C', 'D'...]
        parseventh = [];
        let tmpscaletype;
        if (scaletype == "Major") tmpscaletype = "Harmonic Minor";
        if (scaletype == "Harmonic Minor" | scaletype == "Melodic Minor") tmpscaletype = "Major";
        //if (scaletype == "Major Pentatonic") tmpscaletype = "Minor Pentatonic";
        //if (scaletype == "Major") tmpscaletype = "Minor";
        let parscale = buildScale(scale[0], tmpscaletype, 0)[1];
        for (let i = 0; i < parscale.length; i++) {
            wholeChord = [parscale[i], parscale[(i+2)%parscale.length], parscale[(i+4)%parscale.length], parscale[(i+6)%parscale.length]];
            values = evaluatedChord(wholeChord);
            parchords[i] = values[0];
            parseventh[i] = values[1];
        }
    } else {
        parscale = ["-", "-", "-", "-", "-", "-", "-"];
        parchords = ["", "", "", "", "", "", ""];
        parseventh = ["", "", "", "", "", "", ""];
    }
    

    //NEGATIVE

}
//TODO eg A A# => no same notes

//returns pos 0: chord evaluation eg "Em"
//returns pos 1: seventh evaluation eg "M7"
function evaluatedChord(wholechord) {
    // calculates steps between chord notes and root eg C-E => 4, C-G => 7
    let third = (notes.indexOf(wholechord[1])>notes.indexOf(wholechord[0])) ? 
                    notes.indexOf(wholechord[1])-notes.indexOf(wholechord[0]) 
                    : (12 - Math.abs(notes.indexOf(wholechord[1])-notes.indexOf(wholechord[0])))%12;
    let fifth = (notes.indexOf(wholechord[2])>notes.indexOf(wholechord[0])) ? 
                    notes.indexOf(wholechord[2])-notes.indexOf(wholechord[0]) 
                    : (12 - Math.abs(notes.indexOf(wholechord[2])-notes.indexOf(wholechord[0])))%12;
    let seven = (notes.indexOf(wholechord[3])>notes.indexOf(wholechord[0])) ? 
                    notes.indexOf(wholechord[3])-notes.indexOf(wholechord[0]) 
                    : (12 - Math.abs(notes.indexOf(wholechord[3])-notes.indexOf(wholechord[0])))%12;

    // ----THIRDS----
    if (third == 4) { //MAJOR third
        chord = wholechord[0];
    } else if (third == 3) { //MINOR third
        chord = wholechord[0] + "m";
    } else if (third == 2) { //FLAT third
        chord = wholechord[0] + "b3";
    } else if (third == 5) { //SHARP third
        chord = wholechord[0] + "#3";
    }

    // ----FIFTHS----
    // if perfect fifth don't do anything
    if (fifth == 8) { //SHARP fifth
        //AUGMENTED
        if (third == 4) chord = wholechord[0] + "aug";
        //UNLABELED chords
        else chord += "#5";
    } else if (fifth == 6) { //FLAT fifth
        //DIMINISHED
        if (third == 3) chord = wholechord[0] + "dim";
        //UNLABELED chords
        else chord += "b5";
    }
    
    // ----SEVENTHS----
    if (seven == 11) { //MAJOR seventh
        tmpseventh = "M7";
    } else if (seven == 10) { //MINOR seventh
        tmpseventh = "m7";
    } else if (seven == 9) { //FLAT seventh
        tmpseventh = "b7";
    }

    return [chord, tmpseventh];
}

function hideElement() {
    // DIATONIC
    for (let i = 0; i < document.getElementsByClassName("sev1").length; i++) {
        let x = document.getElementsByClassName("sev1")[i];
        if (document.getElementById("add7").checked == true) {
            x.style.display = "inline-block";
        } else {
            x.style.display = "none";
        }
    }
    // DOMINANT
    for (let i = 0; i < document.getElementsByClassName("sev2").length; i++) {
        let y = document.getElementsByClassName("sev2")[i];
        if (document.getElementById("add7").checked == true) {
            y.style.display = "inline-block";
        } else {
            y.style.display = "none";
        }
    }
    // PARALLEL
    for (let i = 0; i < document.getElementsByClassName("sev3").length; i++) {
        let x = document.getElementsByClassName("sev3")[i];
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
