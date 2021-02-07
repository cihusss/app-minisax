const AudioContext = window.AudioContext || window.webkitAudioContext;
const audio = new AudioContext();
const compressor = audio.createDynamicsCompressor();
compressor.connect(audio.destination);

// const freq = {MM:160, C4: 261.626,C4s: 277.18, D4: 293.66, D4s: 311.13, E4: 329.63, F4: 349.23, F4s: 369.99, G4: 392.00, Gs: 415.30, A4: 440.00, A4s: 466.16, B4: 493.88, C5: 523.25, PP: 1};
const freq = {MM:2000, C4:233.08, C4s:246.94, D4:261.63, D4s:277.18, E4:293.66, F4:311.13, F4s:329.63, G4:349.23, G4s:369.99, A4:392.00, A4s:415.30, B4:440.00, C5:466.16, PP:1};

const fingering = {
    C4: {hole1: 1, hole2: 1, hole3: 1, hole4: 1, hole5: 1, hole6: 1, hole7: 1},
    C4s: {hole1: .5, hole2: 1, hole3: 1, hole4: 1, hole5: 1, hole6: 1, hole7: 1},
    D4: {hole1: 0, hole2: 1, hole3: 1, hole4: 1, hole5: 1, hole6: 1, hole7: 1},
    D4s: {hole1: 0, hole2: .5, hole3: 1, hole4: 1, hole5: 1, hole6: 1, hole7: 1},
    E4: {hole1: 0, hole2: 0, hole3: 1, hole4: 1, hole5: 1, hole6: 1, hole7: 1},
    F4: {hole1: 0, hole2: 0, hole3: 0, hole4: 1, hole5: 1, hole6: 1, hole7: 1},
    F4s: {hole1: 0, hole2: 1, hole3: 1, hole4: .5, hole5: 1, hole6: 1, hole7: 1},
    G4: {hole1: 0, hole2: 0, hole3: 0, hole4: 0, hole5: 1, hole6: 1, hole7: 1},
    G4s: {hole1: 0, hole2: 1, hole3: 1, hole4: 1, hole5: 0, hole6: 1, hole7: 1},
    A4: {hole1: 0, hole2: 0, hole3: 0, hole4: 0, hole5: 0, hole6: 1, hole7: 1},
    A4s: {hole1: 0, hole2: 0, hole3: 1, hole4: 1, hole5: 1, hole6: 0, hole7: 1},
    B4: {hole1: 0, hole2: 0, hole3: 0, hole4: 0, hole5: 0, hole6: 0, hole7: 1},
    C5: {hole1: 0, hole2: 0, hole3: 0, hole4: 0, hole5: 0, hole6: 0, hole7: 0}
};

const tunes = {
    scale: ["C4:.5","D4:.5","E4:.5","F4:.5","G4:.5","A4:.5","B4:.5","C5:.5","PP:.5","C5:.5","B4:.5","A4:.5","G4:.5","F4:.5","E4:.5","D4:.5","C4:.5"],
    hpbd: ["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","C4:.75","C4:.25","D4:1","C4:1","F4:1","E4:2","C4:.75","C4:.25","D4:1","C4:1","G4:1","F4:2","C4:.75","C4:.25","C5:1","A4:1","F4:1","E4:1","D4:1","PP:1","A4s:.5","A4s:.5","A4:1","F4:1","G4:1","F4:2"],
    mtk: ["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","D4:.75","F4:.25","G4:1","G4:2","D4:.75","F4:.25","G4:1","G4:2","C4:.75","D4s:.25","G4:1","G4:2","C4:.75","D4s:.25","G4:3","F4:.75","A4:.25","C5:1","A4s:2","A4:.75","G4:.25","A4s:1","C4:2","D4:.75","D4s:.25","A4s:1","C4:2","A4s:.5","A4:.5","G4:3"],
    blmn: ["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","A4:.8","A4:3.2","PP:.4","G4:.4","A4:.4","B4:.4","A4:.4","A4:.4","G4:.4","A4:4","E4:.4","F4s:.4","G4:.4","F4s:.4","F4s:.4","E4:.4","F4s:4","D4:.4","E4:.4","F4s:.4","D4:.4","D4:.4","D4:.4","D4:2","PP:.4","D4:.4","D4:.4","D4:.4","E4:.4","E4:.4","E4:.4","E4:.4","F4s:.8","F4s:.8","D4:.8","D4:.8","PP:.4","D4:.4","D4:.4","D4:.4","E4:.4","E4:.4","E4:.4","E4:.4","F4s:.8","F4s:.8","D4:1.6","PP:.4","D4:.4","D4:.4","D4:.4","D4:.4","D4:.4","D4:.4","D4:.4","E4:.8","E4:.8","C4:.8","C4:.8","PP:.4","C4:.4","C4:.4","C4:.4","C4s:.4","C4s:.4","C4s:.4","C4s:.4","E4:.8","E4:.8","A4:1.6","PP:.4","B4:.4","G4:.4","A4:3.6"],
    lvtd: ["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","C4:1","F4:1","E4:.5","F4:1.5","G4:.5","D4:1.5","G4:2","F4:1","E4:1","D4:1","E4:1","F4:2","PP:2","A4:.5","A4:1.5","A4:.5","A4:1.5","A4:.5","A4:1","A4:2.5","A4:1","G4:1","F4:1","G4:1","A4:3","PP:1","A4:.5","A4:1.5","A4s:1","A4:1","G4:.5","D4:1","G4:2.5","F4:1","E4:1","D4:1","E4:1","F4:3","PP:1","C4:1","F4:1","E4:.5","F4:1.5","G4:.5","D4:1.5","G4:2","F4:1","E4:1","D4:1","E4:1","F4:2"],
    ystmb: ["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","G4:1","A4:1","G4:.5","A4:.5","A4:.5","G4:.5","G4:1","A4:1","G4:.5","A4:.5","A4:.5","G4:.5","G4:1","A4:1","G4:.5","A4:.5","E4:.5","D4:.5","C4:3","D4s:.5","E4:.5","C4:3","G4s:.5","A4:.5","F4:3","E4:.5","D4s:.5","D4:.5","D4:.5","D4:.5","D4:.5","C5:.5","A4:.5","C5:1","B4:2.5"]
};

// const hpbd = ["C4:0.5","C4:0.25","D4:0.75","C4:0.75","F4:0.75","E4:1","PP:1","C4:0.5","C4:0.25","D4:0.75","C4:0.75","G4:0.75","F4:1"];

let href = "";
let tempo = 1;

if (window.location.href.includes("?")) {
    console.log("has string");
    href = window.location.href.split("=")[1].split("?")[0];
    tempo = window.location.href.split("=")[2];
    console.log(href);
    console.log(tempo);
}
else {
    console.log("no string");
    // href = "?tune=scale?tempo=1";
    window.history.replaceState(null, null, "?" + "?tune=scale?tempo=1");
    href = window.location.href.split("=")[1].split("?")[0];
};

let boo = tempo - 1;
console.log("boo=" + boo);

let tracker = [];
let tune = [];
let start = 0;
let end;
let stop = 0;
let holes = document.getElementsByClassName("hole");
let display = document.getElementById("display");
// let selectedTune = document.getElementById("tunes-selector").value;
let selectedTune = href
console.log(selectedTune);

const generateTune = (t) => {

    tune = [];
    start = 0;
    end = 0;

    for (let i = 0; i < t.length; i++) {
        let n = t[i].split(':')[0];
        let d = parseFloat(t[i].split(':')[1]) * tempo;
        // console.log(n);
        // console.log(d);

        end = (d + start);

        tune.push([n, eval('freq.' + n), start, end]);

        start = (start + d);
    }

    console.log(tune);
};

playTune = (e) => {

    document.getElementById("tempo-overlay").style.display = "block";
    document.getElementById("input-overlay").style.display = "block";
    document.getElementById("btn-play").style.display = "none";
    document.getElementById("btn-stop").style.display = "block";

    for (let note = 0; note < tune.length; note++) {


        if (tune[note][0] == "PP" || tune[note][0] == "MM") {
            // dont press key
        }
        else {
            tuneNote = tune[note][0];
            console.log(tuneNote);

            fingeringKey = fingering[tuneNote];
            // console.log(fingeringKey);

            for (let i = 0; i < Object.keys(fingeringKey).length; i++) {
                let keyname = Object.keys(fingeringKey)[i];
                console.log(keyname);
                // let holeKey = document.getElementsByClassName("whole")[i];
                ii = i + 1;
                let holeKey = document.getElementById("hole" + ii);
                let holeKeyHalf = document.getElementById("hole" + ii + "-half");
                // console.log(holeKey);
                let holeVal = fingeringKey[keyname];
                // console.log(holeVal);

                // console.log(i);

                // holeKey.classList.add("orange");
                if (holeVal == 1) {
                    setTimeout(function(){holeKey.style.background = "#ff4700"}, tune[note][2] * 1000);
                    setTimeout(function(){holeKey.style.background = "#000000"}, tune[note][3] * 1000 - 100);
                }

                else if (holeVal == .5) {
                    setTimeout(function(){holeKeyHalf.style.background = "#ff4700"}, tune[note][2] * 1000);
                    setTimeout(function(){holeKeyHalf.style.background = "none"}, tune[note][3] * 1000 - 100);
                }
            }
            // setTimeout(function(){display.innerHTML = tune[note][0]}, tune[note][2] * 1000);
            setTimeout(function(){display.innerHTML = tune[note][0].replace("s", "#")}, tune[note][2] * 1000);
            setTimeout(function(){display.innerHTML = "&bull;"}, tune[note][3] * 1000 - 1);
        };
        (new SoundPlayer(audio, compressor)).play(tune[note][1], 2, "triangle", tune[note][2]).stop(tune[note][3]);
        tracker.push(audio);
    };

    setTimeout(function(){
        document.getElementById("tempo-overlay").style.display = "none";
        document.getElementById("input-overlay").style.display = "none";
        document.getElementById("btn-play").style.display = "block";
        document.getElementById("btn-stop").style.display = "none";
        console.log("timeout " + end * 1000);
    }, end * 1000);
};

stopTune = (e) => {
    location.reload();
};

changeTempo = (e) => {
    tempo = this.getAttribute("data-tempo");
    // console.log(tempo);
};

document.getElementById("btn-play").addEventListener("click", playTune);
document.getElementById("btn-stop").addEventListener("click", stopTune);

let tempoButtons = document.getElementsByClassName("tempo");

function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        let evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

const selectTune = () => {
    selectedTune = document.getElementById("tunes-selector").value;
    generateTune(tunes[selectedTune]);
    window.history.replaceState(null, null, "?" + "tune=" + selectedTune + "?" + "tempo=" + tempo);
}

document.getElementById("tunes-selector").addEventListener("change", selectTune);

setup = (e) => {

    for (let i = 0; i < tempoButtons.length; i++) {
        ele = document.getElementsByClassName("tempo")[i].addEventListener("click", function() {
            for (let i = 0; i < tempoButtons.length; i++) {
                document.getElementsByClassName("tempo")[i].classList.remove('active');
            }
            this.classList.add('active');
            tempo = this.getAttribute("data-tempo");
            console.log("Tempo: " + tempo);
            console.log("HREF: " + href);
            generateTune(tunes[selectedTune]);
            document.querySelector('#tunes-selector [value="' + selectedTune + '"]').selected = true;
            window.history.replaceState(null, null, "?" + "tune=" + selectedTune + "?" + "tempo=" + tempo);
        });
    }
};

setup();
eventFire(document.getElementsByClassName("tempo")[boo], "click");