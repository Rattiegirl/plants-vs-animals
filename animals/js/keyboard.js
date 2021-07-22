document.addEventListener("keydown", function(event){
  console.log(event)

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
  }

  if (event.key === "l") {
    hamster.distracted();
  }

})


document.addEventListener("click", function(event){
  console.log(event)
  if (event.target.getAttribute ("id")==="scene"){
    hamster.goTo(event.layerX, event.layerY)
  }
  
})