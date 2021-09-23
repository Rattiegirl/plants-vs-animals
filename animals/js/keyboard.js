let animalPoints=0
const animalPointsEl=document.querySelector ("#animal-points")
document.addEventListener("keydown", function (event) {
  console.log(event)
  if(paused) return
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

  if (event.key === "c") {
    hamster.chew();
    if (intersect(rose, hamster)) {
      if (rose.getDataMode() === "attacking") {
        alert("Хомя не успел")
        alert( "Хомя съел "+animalPoints)
      }
      else {
        animalPoints+=1 
        animalPointsEl.innerText=animalPoints
        rose.plant(
          Math.floor(Math.random() * 1000)           ,
          Math.floor(Math.random() * 600));
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
  if(paused) return
  if (event.target.getAttribute("id") === "scene") {
    hamster.goTo(event.layerX, event.layerY)
  }


})

document.querySelector("#rose_wrapper").addEventListener("click", function (event) {
  if(paused) return
  console.log(event)
  const { x, y } = rose.getCoords()
  hamster.goTo(x, y)
})