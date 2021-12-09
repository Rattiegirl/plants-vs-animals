const placeBrick = (x,y,sceneEl) => {
  const brickEl = document.createElement("div")
  brickEl.classList.add("brick")
  brickEl.style.left = x + "px"
  brickEl.style.top = y + "px"
  sceneEl.append(brickEl)
}

const sceneEl = document.querySelector ("#scene")
placeBrick(600, 400, sceneEl)
placeBrick(600, 450, sceneEl) 
placeBrick(600, 500, sceneEl) 
placeBrick(600, 550, sceneEl) 
placeBrick(600, 600, sceneEl) 


placeBrick(650, 400, sceneEl) 
placeBrick(700, 400, sceneEl) 
placeBrick(750, 400, sceneEl) 
placeBrick(800, 400, sceneEl) 
placeBrick(850, 400, sceneEl) 



