
// сначало все стоят
let paused = true
const sceneEl = document.querySelector("#scene")
const hamsterEl = document.querySelector(".hamster_wrapper")
const birdEl = document.querySelector("#bird_wrapper")
const roseEl = document.querySelector(".rose_wrapper")


//герои
const game = new Game(sceneEl, 180, 10)
const hamster = new Hamster(hamsterEl, game.scene);
const bird = new Bird(birdEl, game.scene);
game.addAnimal(hamster)
game.addAnimal(bird)
//game.activeHero = hamster
const rose = new Rose(roseEl, game.scene, 10000, 7000);
game.activeHero = rose
game.startTicker()
const scene = game.scene
///////todo: move these pesky lines
const x = Math.floor(Math.random() * (scene.width - rose.size)) 
const y = Math.floor(Math.random() * (scene.height  - rose.size))
rose.plant(x, y);

////////////bird.goTo(x, y + 10) 
//время


game.startTimer()

//всего начало


    //////////// bird.goTo(x, y + 10)
   


//всем остановиться



const shopEl = document.querySelector('#shop')
////////////////////////////////////////Покупайте за низкую цену
const shop = new Shop (shopEl, "plant", game)
// const armoredBtn = document.querySelector("#shop .armor")
// armoredBtn.onclick = function () {
//     hamster.armor()
//     animalSeeds -= 3
//     showSeeds()
// }
const actionsMenu = document.querySelector(".actionsMenu")
actionsMenu.addEventListener("click", function (event) {
    if (event.target.classList.contains("item")) {
        hotkey(event.target.getAttribute("data-key"))

    }
})
// всего не видно



