const placeRock = (x,y,sceneEl) => {
    const rockEl = document.createElement("div")
    rockEl.classList.add("rock")
    rockEl.style.left = x + "px"
    rockEl.style.top = y + "px"
    sceneEl.append(rockEl)
  }
  
//   const sceneEl = document.querySelector ("#scene")
  placeRock(650, 400, sceneEl)
  placeRock(700, 450, sceneEl) 
  placeRock(750, 450, sceneEl) 