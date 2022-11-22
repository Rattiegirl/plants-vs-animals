
let paused = true
const hamsterEl = document.querySelector("#hamster_wrapper")
const birdEl = document.querySelector("#bird_wrapper")
const roseEl = document.querySelector("#rose_wrapper")

const scene = {
    paused:true,
    width: 1500,
    height: 700,
  }
const hamster = new Hamster(hamsterEl, scene);
const bird = new Bird(birdEl, scene);
setInterval(function () {
    if (scene.paused) return
    hamster.render();
    bird.render();
  }, 100)


  


const rose = new Rose(roseEl, scene);
const x = Math.floor(Math.random() *scene.width)
const y = Math.floor(Math.random() *scene.height)
rose.plant(x,y );

bird.goTo(x, y + 10) 

const timer = document.querySelector(".timer")
let seconds = 30
const chewRose = 3
const intervalId = setInterval(
    function () {
        if (scene.paused) return
        seconds = seconds - 1
        timer.innerText = "00:" + (seconds + "").padStart(2, "0")
        if (seconds < 1) {
            seconds = 0
            clearInterval(intervalId)
        
            pause()
            overlay.classList.remove("hidden")
            overlay.style.display = "flex"
            gameOverModal.classList.remove("hidden")
            ////////////////////change winner-name, set crown
            const winner = (animalPoints>=chewRose)?"hamster":"rose"
            if (winner === "hamster") {
                winnerAnimal.classList.add("with-crown");
                winnerName.innerText = "славный герой Хомя!"
            } else {
                winnerPlant.classList.add("with-crown");
                winnerName.innerText = "славная колючка Роза!"
            }
        }
    }, 1000
)
/////play and pause
const playPauseBtn = document.querySelector("#play-pause-btn")
const overlay = document.querySelector(".overlay")
const startGameBtn = document.querySelector(".start-game-btn")
const startGameModal = document.querySelector(".start-game-modal")
const gameOverModal = document.querySelector(".game-over-modal")
const winnerName = document.querySelector(".winner-name")
const winnerAnimal = document.querySelector(".winner-animal")
const winnerPlant = document.querySelector(".winner-plant")
const restartGameBtn = document.querySelector(".restart-game-btn")
const play = function () {
    scene.paused = false
    const x = Math.floor(Math.random() *scene.width)
const y = Math.floor(Math.random() *scene.height)
rose.plant(x,y );

bird.goTo(x, y + 10)  
    playPauseBtn.innerText = "Pause"

}
const pause = function () {
    scene.paused = true
    playPauseBtn.innerText = "Play"
}
playPauseBtn.onclick = function () {
    //// alert("You started the game!")
    if (
        scene.paused === true
    ) {
        play()
    } else {
        pause()
    }

}
startGameBtn.onclick = function () {
    overlay.classList.add("hidden")
    setTimeout(function () {
        play()
        overlay.style.display = "none"
        startGameModal.classList.add("hidden")
    }, 300)

}
restartGameBtn.onclick = function () { location.reload() }
////////////////////////////////////////Покупайте за низкую цену
const armoredBtn = document.querySelector("#shop .armor")
armoredBtn.onclick  = function(){
   hamster.armor() 
   animalSeeds-=3
   showSeeds()
}
const actionsMenu =document.querySelector(".actionsMenu")
actionsMenu.addEventListener("click", function(event){
if (event.target.classList.contains("item")){
    hotey( event.target.getAttribute("data-key"))

}
}) 

hamster.doBeforeRun = function(){
    actionsMenu.style.opacity = "0"
}
hamster.el.addEventListener("contextmenu", function(event){
    event.preventDefault()
    console.log(hamster)
    actionsMenu.style.opacity = "1"
    actionsMenu.style.left=parseInt (hamster.el.style.left)+5+"px"
    actionsMenu.style.top=parseInt (hamster.el.style.top)+15+"px"
})


