function Hamster() {
  const me = this
  ////render
  const el = document.querySelector("#hamster_wrapper")
  this.el = el
  let humsterRunEl = el.querySelector("#hamster_run")
  if (
    el.classList.contains("armored")
  ) {
    humsterRunEl = el.querySelector("#hamster_knight_run")

  }
////logic
  let x = 0;
  let y = 0;
  const size = 50;
  const step = 10;
  let isBusy = false;


  const scene = {
    width: 1500,
    height: 700,
  }
////render
  el.style.width = size + "px"
  el.style.height = size + "px"

  this.direction = "left"

  

  this.render = function () {
    el.style.left = x + "px"
    el.style.top = y + "px"
  }



  this.sit = function () {
    el.setAttribute("data-mode", "sitting");
  }

  this.run = function () {
      ////a tiny bit of logic
    if (this.beforeRunCallback) {
      this.beforeRunCallback()

    }
    el.setAttribute("data-mode", "running")
  }

  this.chew = function () {
    el.setAttribute("data-mode", "chewing")
  }

  this.dig = function () {
    el.setAttribute("data-mode", "digging")
  }

  this.distracted = function () {
    el.setAttribute("data-mode", "distracted")
  }
////logic
  this.goTo = function (destinationX, destinationY) {
    if (isBusy) return
    isBusy = true
    const deltaX = destinationX - x
    const deltaY = destinationY - y

    const deltaXTime = Math.round(Math.abs(deltaX) * 2)
    const deltaYTime = Math.round(Math.abs(deltaY) * 2)
    // отправляем хомячка на восток или на запад
    el.style.transition = deltaXTime + 'ms'
    x = destinationX;
  
    if (deltaX > 0) {
      this.goRight()
     
    } else {
      this.goLeft()
     
    }
    setTimeout(function () {
      el.style.transition = deltaYTime + 'ms'
      // отправляем хомячка на север или Юг
      y = destinationY
      if (deltaY > 0) {
        me.goDown()
       
      } else {
        me.goUp()
       
      }
      setTimeout(function () {
        me.sit()
        isBusy = false
        el.style.transition = 300 + 'ms'
      }, deltaYTime)
    }, deltaXTime)
  }
////logical render
  this.goUp = function () {
    this.run();
    this.direction = "top";
    humsterRunEl.style.transform = "rotate(90deg)"
    if (y - step < 0) {
      return false;
    }
    y = y - step
  }

  this.goDown = function () {
    this.run();
    this.direction = "down";
    humsterRunEl.style.transform = "rotate(-90deg)"
    if (y + step + size > scene.height) {
      return false;
    }
    y = y + step
  }

  this.goRight = function () {
    this.run();
    this.direction = "right";
    humsterRunEl.style.transform = "scale(-1,1)"
    if (x + step + size > scene.width) {
      return false;
    }
    x = x + step
  }

  this.goLeft = function () {
    this.run();
    this.direction = "left";
    humsterRunEl.style.transform = "none"
    if (x - step < 0) {
      return false;
    }

    x = x - step;
  }
////render
  this.armor = function () {
    el.classList.add("armored")
    humsterRunEl = el.querySelector("#hamster_knight_run")
  }

  this.isArmored = function () {
    return el.classList.contains("armored")
  }
  this.noArmor = function () {
    el.classList.remove("armored")
    humsterRunEl = el.querySelector("#hamster_run")
  }
  ////logic
  this.getCoords = function () {
    return { x, y }
  }
////render
  setInterval(function () {
    if (paused) return
    me.render();
  }, 100)
////logic
  this.doBeforeRun = function (callback) {
    this.beforeRunCallback = callback
  }

}




//hamster.sit();
//hamster.run();
//hamster.goUp();
//hamster.goDown();
// hamster.goRight();
//hamster.goLeft();
//hamster.chew();
//hamster.dig();
//hamster.distracted();