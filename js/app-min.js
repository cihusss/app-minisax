const AudioContext=window.AudioContext||window.webkitAudioContext,audio=new AudioContext,compressor=audio.createDynamicsCompressor();compressor.connect(audio.destination);const freq={MM:2e3,C4:233.08,C4s:246.94,D4:261.63,D4s:277.18,E4:293.66,F4:311.13,F4s:329.63,G4:349.23,G4s:369.99,A4:392,A4s:415.3,B4:440,C5:466.16,PP:1},fingering={C4:{hole1:1,hole2:1,hole3:1,hole4:1,hole5:1,hole6:1,hole7:1},C4s:{hole1:.5,hole2:1,hole3:1,hole4:1,hole5:1,hole6:1,hole7:1},D4:{hole1:0,hole2:1,hole3:1,hole4:1,hole5:1,hole6:1,hole7:1},D4s:{hole1:0,hole2:.5,hole3:1,hole4:1,hole5:1,hole6:1,hole7:1},E4:{hole1:0,hole2:0,hole3:1,hole4:1,hole5:1,hole6:1,hole7:1},F4:{hole1:0,hole2:0,hole3:0,hole4:1,hole5:1,hole6:1,hole7:1},F4s:{hole1:0,hole2:1,hole3:1,hole4:.5,hole5:1,hole6:1,hole7:1},G4:{hole1:0,hole2:0,hole3:0,hole4:0,hole5:1,hole6:1,hole7:1},G4s:{hole1:0,hole2:1,hole3:1,hole4:1,hole5:0,hole6:1,hole7:1},A4:{hole1:0,hole2:0,hole3:0,hole4:0,hole5:0,hole6:1,hole7:1},A4s:{hole1:0,hole2:0,hole3:1,hole4:1,hole5:1,hole6:0,hole7:1},B4:{hole1:0,hole2:0,hole3:0,hole4:0,hole5:0,hole6:0,hole7:1},C5:{hole1:0,hole2:0,hole3:0,hole4:0,hole5:0,hole6:0,hole7:0}},tunes={scale:["C4:.5","D4:.5","E4:.5","F4:.5","G4:.5","A4:.5","B4:.5","C5:.5","PP:.5","C5:.5","B4:.5","A4:.5","G4:.5","F4:.5","E4:.5","D4:.5","C4:.5"],hpbd:["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","C4:.75","C4:.25","D4:1","C4:1","F4:1","E4:2","C4:.75","C4:.25","D4:1","C4:1","G4:1","F4:2","C4:.75","C4:.25","C5:1","A4:1","F4:1","E4:1","D4:1","PP:1","A4s:.5","A4s:.5","A4:1","F4:1","G4:1","F4:2"],mtk:["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","D4:.75","F4:.25","G4:1","G4:2","D4:.75","F4:.25","G4:1","G4:2","C4:.75","D4s:.25","G4:1","G4:2","C4:.75","D4s:.25","G4:3","F4:.75","A4:.25","C5:1","A4s:2","A4:.75","G4:.25","A4s:1","C4:2","D4:.75","D4s:.25","A4s:1","C4:2","A4s:.5","A4:.5","G4:3"],blmn:["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","A4:.8","A4:3.2","PP:.4","G4:.4","A4:.4","B4:.4","A4:.4","A4:.4","G4:.4","A4:4","E4:.4","F4s:.4","G4:.4","F4s:.4","F4s:.4","E4:.4","F4s:4","D4:.4","E4:.4","F4s:.4","D4:.4","D4:.4","D4:.4","D4:2","PP:.4","D4:.4","D4:.4","D4:.4","E4:.4","E4:.4","E4:.4","E4:.4","F4s:.8","F4s:.8","D4:.8","D4:.8","PP:.4","D4:.4","D4:.4","D4:.4","E4:.4","E4:.4","E4:.4","E4:.4","F4s:.8","F4s:.8","D4:1.6","PP:.4","D4:.4","D4:.4","D4:.4","D4:.4","D4:.4","D4:.4","D4:.4","E4:.8","E4:.8","C4:.8","C4:.8","PP:.4","C4:.4","C4:.4","C4:.4","C4s:.4","C4s:.4","C4s:.4","C4s:.4","E4:.8","E4:.8","A4:1.6","PP:.4","B4:.4","G4:.4","A4:3.6"],lvtd:["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","C4:1","F4:1","E4:.5","F4:1.5","G4:.5","D4:1.5","G4:2","F4:1","E4:1","D4:1","E4:1","F4:2","PP:2","A4:.5","A4:1.5","A4:.5","A4:1.5","A4:.5","A4:1","A4:2.5","A4:1","G4:1","F4:1","G4:1","A4:3","PP:1","A4:.5","A4:1.5","A4s:1","A4:1","G4:.5","D4:1","G4:2.5","F4:1","E4:1","D4:1","E4:1","F4:3","PP:1","C4:1","F4:1","E4:.5","F4:1.5","G4:.5","D4:1.5","G4:2","F4:1","E4:1","D4:1","E4:1","F4:2"],ystmb:["MM:.05","PP:.95","MM:.05","PP:.95","MM:.05","PP:.95","G4:1","A4:1","G4:.5","A4:.5","A4:.5","G4:.5","G4:1","A4:1","G4:.5","A4:.5","A4:.5","G4:.5","G4:1","A4:1","G4:.5","A4:.5","E4:.5","D4:.5","C4:3","D4s:.5","E4:.5","C4:3","G4s:.5","A4:.5","F4:3","E4:.5","D4s:.5","D4:.5","D4:.5","D4:.5","D4:.5","C5:.5","A4:.5","C5:1","B4:2.5"]};let href="",tempo=1;window.location.href.includes("?")?(console.log("has string"),href=window.location.href.split("=")[1].split("?")[0],tempo=window.location.href.split("=")[2],console.log(href),console.log(tempo)):(console.log("no string"),window.history.replaceState(null,null,"??tune=scale?tempo=1"),href=window.location.href.split("=")[1].split("?")[0]);let boo=tempo-1;console.log("boo="+boo);let tracker=[],tune=[],start=0,end,stop=0,holes=document.getElementsByClassName("hole"),display=document.getElementById("display"),selectedTune=href;console.log(selectedTune);const generateTune=t=>{tune=[],start=0,end=0;for(let i=0;i<t.length;i++){let n=t[i].split(":")[0],d=parseFloat(t[i].split(":")[1])*tempo;end=d+start,tune.push([n,eval("freq."+n),start,end]),start+=d}console.log(tune)};playTune=(e=>{document.getElementById("tempo-overlay").style.display="block",document.getElementById("input-overlay").style.display="block",document.getElementById("btn-play").style.display="none",document.getElementById("btn-stop").style.display="block";for(let e=0;e<tune.length;e++){if("PP"==tune[e][0]||"MM"==tune[e][0]);else{tuneNote=tune[e][0],console.log(tuneNote),fingeringKey=fingering[tuneNote];for(let t=0;t<Object.keys(fingeringKey).length;t++){let o=Object.keys(fingeringKey)[t];console.log(o),ii=t+1;let l=document.getElementById("hole"+ii),n=document.getElementById("hole"+ii+"-half"),s=fingeringKey[o];1==s?(setTimeout(function(){l.style.background="#ff4700"},1e3*tune[e][2]),setTimeout(function(){l.style.background="#000000"},1e3*tune[e][3]-100)):.5==s&&(setTimeout(function(){n.style.background="#ff4700"},1e3*tune[e][2]),setTimeout(function(){n.style.background="none"},1e3*tune[e][3]-100))}setTimeout(function(){display.innerHTML=tune[e][0].replace("s","#")},1e3*tune[e][2]),setTimeout(function(){display.innerHTML="&bull;"},1e3*tune[e][3]-1)}new SoundPlayer(audio,compressor).play(tune[e][1],2,"triangle",tune[e][2]).stop(tune[e][3]),tracker.push(audio)}setTimeout(function(){document.getElementById("tempo-overlay").style.display="none",document.getElementById("input-overlay").style.display="none",document.getElementById("btn-play").style.display="block",document.getElementById("btn-stop").style.display="none",console.log("timeout "+1e3*end)},1e3*end)}),stopTune=(e=>{location.reload()}),changeTempo=(e=>{tempo=this.getAttribute("data-tempo")}),document.getElementById("btn-play").addEventListener("click",playTune),document.getElementById("btn-stop").addEventListener("click",stopTune);let tempoButtons=document.getElementsByClassName("tempo");function eventFire(e,t){if(e.fireEvent)e.fireEvent("on"+t);else{let o=document.createEvent("Events");o.initEvent(t,!0,!1),e.dispatchEvent(o)}}const selectTune=()=>{selectedTune=document.getElementById("tunes-selector").value,generateTune(tunes[selectedTune]),window.history.replaceState(null,null,"?tune="+selectedTune+"?tempo="+tempo)};document.getElementById("tunes-selector").addEventListener("change",selectTune),setup=(e=>{for(let e=0;e<tempoButtons.length;e++)ele=document.getElementsByClassName("tempo")[e].addEventListener("click",function(){for(let e=0;e<tempoButtons.length;e++)document.getElementsByClassName("tempo")[e].classList.remove("active");this.classList.add("active"),tempo=this.getAttribute("data-tempo"),console.log("Tempo: "+tempo),console.log("HREF: "+href),generateTune(tunes[selectedTune]),document.querySelector('#tunes-selector [value="'+selectedTune+'"]').selected=!0,window.history.replaceState(null,null,"?tune="+selectedTune+"?tempo="+tempo)})}),setup(),eventFire(document.getElementsByClassName("tempo")[boo],"click");