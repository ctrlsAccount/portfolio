var songs = document.getElementById("Menu")
var img = document.getElementById("img")
var bar = document.getElementById("bar")
var progressTime = document.getElementById("time") 
var song_name = document.getElementById("sn")
var artist = document.getElementById('artist');
var playing = false;

function showTIme() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var period = "AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        period = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;

    var time = h + ":" + m + " " + period;
    document.getElementById("clock").innerHTML = time;

    setTimeout(showTIme, 1000);
}

function loadSong(click_id) {

    let id = click_id
    var played = document.getElementById(id).firstElementChild.innerText;
    var audio = new Audio(`audio/${played}.mp3`);
    img.src = `img/${played}.jpg`
    var text = document.getElementById(id).children[1].innerText
    song_name.innerText = played
    artist.innerText = text

    reachedEnd = false

    if (playing == false) {
        songplay = audio
        songplay.play();
        playing = true;

        consoleTest = audio.src

        function track(){
            // Progress bar calculation
            currentTime = songplay.currentTime
            songD = songplay.duration
            progressValue = currentTime / songD
            progressMath = songD/ 60
            progressMinutes = Math.trunc(progressMath)
            progressSeconds = Math.trunc(progressMath % 1 * 60);
            progressSeconds = (progressSeconds < 10) ? "0" + progressSeconds : progressSeconds;
            
            // Current time calculation

            intTime = Math.trunc(currentTime)
            progressCurrent_M_raw = (intTime > 59) ? intTime / 60 : 00;
            progressCurrent_M = Math.trunc(progressCurrent_M_raw)
            progressCurrent_S = Math.trunc(progressCurrent_M_raw % 1 * 60.1)
            progressCurrent_S = (progressCurrent_S < 10) ? "0" + progressCurrent_S : progressCurrent_S
            intTime = (intTime < 10) ? "0" + intTime : intTime 

            if (progressCurrent_S == 0, intTime < 60) {
                progressCurrent_S = intTime
            }
            /* 

            songplay.currentTime =


           // # DISPLAY # Duration
            console.log(`Duration: ${songD}`)
            console.log(`Decimal: ${progressMath}`)
            console.log(`Minutes: ${progressMinutes}`)
            console.log(`Seconds: ${progressSeconds}`)
            */

            /*
            // # DISPLAY # Duration
            console.log(`Raw: ${progressCurrent_M_raw}`)
            console.log(`Minutes: ${progressCurrent_M}`)
            console.log(`Seconds: ${progressCurrent_S}`)
            console.log(intTime)
            */

            bar.style.width = `${Math.round(progressValue * 100)}%`;
            document.getElementById("time") .innerHTML = `0${progressCurrent_M}:${progressCurrent_S} | ${progressMinutes}:${progressSeconds}`;
            if (currentTime == songplay.duration){
                reachedEnd = true
            }
            if (reachedEnd == true){
                songplay.currentTime = 0
                reachedEnd = false
            }
            if (reachedEnd == false){
                setTimeout(track, 1000)
            }

            if (currentTime != 0){
                bar.style.opacity = 1;
                progressTime.style.opacity = 1;
            } 
            else {
                progressTime.style.opacity = 0;
            }

            }
    
        track()
    
        if (consoleTest == consoleSong) {            
            songplay.currentTime = progress
            songplay.play();
            playing = true;
        }
    }
    else {
        // if audio path is not the same then copy code from if playing == true
        // if audio path is the same as current audiopath then get currentTime when pausing and set previous currentTime when playing
        consoleSong = songplay.src
        consoleTest = audio.src
        progress = songplay.currentTime

        if (consoleTest == consoleSong) {
            playing = false
            songplay.pause();
        }
        else {
            songplay.currentTime = 0
            songplay.pause();
            songplay = audio
            songplay.play();
            playing = true;
            var audio = new Audio(`audio/${played}.mp3`);
        }
    }
}

setTimeout(function(){
    songs.style.overflowY = "scroll"
}, 3000)

showTIme()
