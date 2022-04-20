// probably didn't delete anything redundant because of how lazy I am. Hope I didn't :)

var img = document.getElementById("img")
var bar = document.getElementById("bar")
var progressTime = document.getElementById("time") 
var song_name = document.getElementById("sn")
var artist = document.getElementById('artist');
var vol = document.getElementById('vol')
var genres = document.getElementById('genres')
var songSelect = document.getElementsByClassName('songSelect')
var genre_clicked = 0;
var playing = false;
var container = document.getElementById('container_p')

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
    let genre_name = document.getElementById('genreName') 
    genre_name.innerText = document.getElementById(id).parentNode.id
    var audio = new Audio(`audio/${played}.mp3`);
    img.src = `img/${played}.jpg`
    var text = document.getElementById(id).children[1].innerText
    song_name.innerText = played
    artist.innerText = text
    bar.style.backgroundColor = "white";

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

            // Slide bar # Volume
            songplay.volume = vol.value / 50
            bar.style.width = `${Math.round(progressValue * 100)}%`;
            document.getElementById("time") .innerHTML = `0${progressCurrent_M}:${progressCurrent_S} | ${progressMinutes}:${progressSeconds}`;
            // resets music player
            if (songplay.ended == true){
                img.src = ''
                sn.innerText = ""
                artist.innerText = ""
                time.innerText = ""
                playing = false;
                bar.style.width = "0px";
            }
            if (reachedEnd == true){
                songplay.currentTime = 0
                reachedEnd = false
            }
            if (reachedEnd == false){
                setTimeout(track, 500)
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
        consoleSong = songplay.src
        consoleTest = audio.src
        progress = songplay.currentTime

        if (consoleTest == consoleSong) {
            playing = false
            songplay.pause();
            bar.style.backgroundColor = "rgb(197,193,186)";
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

function show(click){
        let id_g = document.getElementById(click)
        let spanText = document.getElementById(click).innerText
        let id = document.getElementById(spanText)
        appearance()
        id.style.display = "unset";
        id.style.overflowY = "visible";
        hide(click);
        //genre button
        disappearance();
        id_g.style.backgroundColor = "white"
        id_g.style.color = "black"
        id_g.style.cursor = "default"
        id_g.onclick = ""; 
    }

function hide(genre_id){
    let genre_a = genre_id
        setTimeout(function(){
            let genre_b = genre_id
            if (genre_b == genre_a){
            let spanText = document.getElementById(genre_id).innerText
            let id = document.getElementById(spanText)
            id.style.overflowY = "scroll"
        }
        }, 3000)
    }

function appearance(){
    for (let i = 0; i < songSelect.length; i++) {
        songSelect[i].style.display = "none"
      }
}

function disappearance(){
    let subgenres = document.getElementsByClassName('genre_E')
    for (let i = 0; i < subgenres.length; i++){
        subgenres[i].setAttribute('onclick', 'show(this.id)');
        subgenres[i].style.backgroundColor = "black"
        subgenres[i].style.color = "white"
        subgenres[i].style.cursor = "pointer"
}
}

showTIme()
