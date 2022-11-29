let animalPoints = 0
let animalSeeds = 0
const animalPointsEl = document.querySelector("#animal-points")
const animalSeedsEl = document.querySelector(".seeds")
const armorEl = document.querySelector(".armor")
//Семечки
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
// что делает Хомя когда ты нажимаешь на клавяши
function hotKey(letter) {
  if (letter === "d") {
    hamster.dig();
  }

  if (letter === "s") {
    hamster.sit();
  }
}
// что делает Хомя когда ты нажимаешь на стрелки
document.addEventListener("keydown", function (event) {
  console.log(event)
  if (scene.paused) return
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

  hotKey(event.key)

// Эсли Хомя сгрызает розу, он получает семечки
  function eatingRose() {
    animalPoints += 1
    animalSeeds += 1
    showSeeds()
    animalPointsEl.innerText = animalPoints
    const x = Math.floor(Math.random() * scene.width)
    const y = Math.floor(Math.random() * scene.height)
    rose.plant(x, y);
// птичка летит
    bird.goTo(x, y + 10)
  }
  // как Хомя сгрызает розу, или роза успевает влючить защиту
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
// что делает Хомя когда ты нажимаешь на клавяши
  if (event.key === "l") {
    hamster.distracted();
  }

}) 
// пересечения растения и животного
function intersect(plant, animal) {
  const { x, y } = animal
  const { x: x1, y: y1 } = plant
  if (Math.abs(x - x1) > 60) {
    return false
  }
  if (Math.abs(y - y1) > 60) {
    return false
  }
  return true

}


//нажми куда-нибуть и к тебе прибежит Хомя
document.addEventListener("click", function (event) {
  if (scene.paused) return
  if (event.target.getAttribute("id") === "scene") {
    hamster.goTo(event.layerX, event.layerY)
  }


})
// нажми на розу и Хомя на неё встанет
rose.el.addEventListener("click", function (event) {
  if (scene.paused) return
  console.log(event)
  const { x, y } = rose
  hamster.goTo(x, y)
})