const hamster = new Hamster();
hamster.goTo(39, 62)
bird.goTo(39, 86)
let hero = bird
hamster.el.onclick = function () {

    hero = hamster
}
bird.el.onclick = function () {

    hero = bird
}


document.addEventListener("click", function (event) {
    if (paused) return
    if (event.target.getAttribute("id") === "scene") {
        hero.goTo(event.layerX, event.layerY)
    }


})


document.addEventListener("keydown", function (event) {
    console.log(event)
    if (paused) return

    if (event.key === "1") {
        hero = hamster;

    }
    if (event.key === "2") {
        hero = bird;

    }

})

document.querySelector("#rose_wrapper").addEventListener("click", function (event) {
    if (paused) return
    console.log(event)
    const { x, y } = rose.getCoords()
    hero.goTo(x, y)
})