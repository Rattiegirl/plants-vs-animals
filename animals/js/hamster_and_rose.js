
let paused = true
const hamster = new Hamster();

const rose = new Rose();

rose.plant(
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 600));

const timer = document.querySelector(".timer")
let seconds = 10
const intervalId = setInterval(
    function () {
        if (paused) return
        seconds = seconds - 1
        timer.innerText = "00:" + (seconds + "").padStart(2, "0")
        if (seconds < 1) {
            seconds = 0
            clearInterval(intervalId)
           pause()
            alert("Game Over!")
        }
    }, 1000
)
/////play and pause
const playPauseBtn = document.querySelector("#play-pause-btn")
const overlay = document.querySelector(".overlay")
const startGameBtn = document.querySelector(".start-game-btn")
const play = function (){
    paused = false
    rose.plant(
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 600));
    playPauseBtn.innerText="Pause"

}
const pause= function(){
    paused = true
    playPauseBtn.innerText="Play"
}
playPauseBtn.onclick = function () {
   //// alert("You started the game!")
    if (
        paused === true
    ) {
       play()
    } else {
       pause()
    }

}
startGameBtn.onclick = function () {
overlay.style.display="none"
play()
}