let animalPoints = 0
let animalSeeds = 0
const animalPointsEl = document.querySelector("#animal-points")
const animalSeedsEl = document.querySelector(".seeds")
const armorEl = document.querySelector(".armor")
function showSeeds() {
  animalSeedsEl.innerHTML = ""
  for (let i = 0; i < animalSeeds; i += 1) {
    const imgEl = document.createElement("img")
    imgEl.setAttribute("src", "../img/sunflower_seed.png")
    animalSeedsEl.append(imgEl)
  }
  if (animalSeeds > 2) {
    armorEl.style.opacity = 1
  } else {
    armorEl.style.opacity = 0
  }
}
document.addEventListener("keydown", function (event) {
  console.log(event)
  if (paused) return
  if (event.key === "ArrowDown") {
    hamster.goDown();
  }

  if (event.key === "ArrowUp") {
    hamster.goUp();
  }

  if (event.key === "ArrowRight") {
    hamster.goRight();
  }

  if (event.key === "ArrowLeft") {
    hamster.goLeft();
  }

  if (event.key === "d") {
    hamster.dig();
  }

  if (event.key === "s") {
    hamster.sit();
  }


function eatingRose(){
  animalPoints += 1
  animalSeeds += 1
  showSeeds()
  animalPointsEl.innerText = animalPoints
  rose.plant(
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 600));
}
  if (event.key === "c") {
    hamster.chew();
    if (intersect(rose, hamster)) {
      if (rose.getDataMode() === "attacking") {
        if (hamster.isArmored()) {
        hamster.noArmor()
eatingRose()
        } else {
          alert("Хомя не успел")
          alert("Хомя съел " + animalPoints)
          ////////todo:GAME OVER
        }

      }
      else {
       eatingRose()
      }

    }
  }

  if (event.key === "l") {
    hamster.distracted();
  }

})
function intersect(plant, animal) {
  const { x, y } = animal.getCoords()
  const { x: x1, y: y1 } = plant.getCoords()
  if (Math.abs(x - x1) > 60) {
    return false
  }
  if (Math.abs(y - y1) > 60) {
    return false
  }
  return true

}



document.addEventListener("click", function (event) {
  if (paused) return
  if (event.target.getAttribute("id") === "scene") {
    hamster.goTo(event.layerX, event.layerY)
  }


})

document.querySelector("#rose_wrapper").addEventListener("click", function (event) {
  if (paused) return
  console.log(event)
  const { x, y } = rose.getCoords()
  hamster.goTo(x, y)
})