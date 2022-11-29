
// сначало все стоят
let paused = true
const sceneEl = document.querySelector("#scene")
const hamsterEl = document.querySelector("#hamster_wrapper")
const birdEl = document.querySelector("#bird_wrapper")
const roseEl = document.querySelector("#rose_wrapper")


//герои
const game = new Game(sceneEl)
const hamster = new Hamster(hamsterEl, game.scene);
const bird = new Bird(birdEl, game.scene);
game.addAnimal(hamster)
game.addAnimal(bird)
const rose = new Rose(roseEl, game.scene);
game.startTicker()
const scene = game.scene
///////todo: move these pesky lines
const x = Math.floor(Math.random() * scene.width)
const y = Math.floor(Math.random() * scene.height)
rose.plant(x, y);

////////////bird.goTo(x, y + 10) 
//время

game.timesUp = () => {
    pause()
    overlay.classList.remove("hidden")
    overlay.style.display = "flex"
    gameOverModal.classList.remove("hidden")
    ////////////////////change winner-name, set crown
    const winner = (animalPoints >= chewRose) ? "hamster" : "rose"
    if (winner === "hamster") {
        winnerAnimal.classList.add("with-crown");
        winnerName.innerText = "славный герой Хомя!"
    } else {
        winnerPlant.classList.add("with-crown");
        winnerName.innerText = "славная колючка Роза!"
    }
}
const chewRose = 3
game.startTimer()
/////play and pause
// как много кнопок и окон
const playPauseBtn = document.querySelector("#play-pause-btn")
const overlay = document.querySelector(".overlay")
const startGameBtn = document.querySelector(".start-game-btn")
const startGameModal = document.querySelector(".start-game-modal")
const gameOverModal = document.querySelector(".game-over-modal")
const winnerName = document.querySelector(".winner-name")
const winnerAnimal = document.querySelector(".winner-animal")
const winnerPlant = document.querySelector(".winner-plant")
const restartGameBtn = document.querySelector(".restart-game-btn")
//всего начало
const play = function () {
    scene.paused = false
    const x = Math.floor(Math.random() * scene.width)
    const y = Math.floor(Math.random() * scene.height)
    rose.plant(x, y);

    //////////// bird.goTo(x, y + 10)
    playPauseBtn.innerText = "Pause"

}
//всем остановиться
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
armoredBtn.onclick = function () {
    hamster.armor()
    animalSeeds -= 3
    showSeeds()
}
const actionsMenu = document.querySelector(".actionsMenu")
actionsMenu.addEventListener("click", function (event) {
    if (event.target.classList.contains("item")) {
        hotkey(event.target.getAttribute("data-key"))

    }
})
// всего не видно
hamster.doBeforeRun = function () {
    actionsMenu.style.opacity = "0"
}
hamster.el.addEventListener("contextmenu", function (event) {
    event.preventDefault()
    console.log(hamster)
    actionsMenu.style.opacity = "1"
    actionsMenu.style.left = parseInt(hamster.el.style.left) + 5 + "px"
    actionsMenu.style.top = parseInt(hamster.el.style.top) + 15 + "px"
})


