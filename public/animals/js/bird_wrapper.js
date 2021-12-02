function Bird() {
  const el = document.querySelector("#bird_wrapper")
  this.el = el
  let birdFlyEl = el.querySelector("#bird_fly")
  // let humsterRunEl = el.querySelector("#hamster_run")
  // if (
  //   el.classList.contains("armored")
  // ) {
  //   humsterRunEl = el.querySelector("#hamster_knight_run")

  // }

  let x = 0;
  let y = 0;
  const size = 50;
  const step = 10;
  let isBusy = false;


  const scene = {
    width: 1500,
    height: 700,
  }

  el.style.width = size + "px"
  el.style.height = size + "px"

  this.direction = "up"

  const me = this;
  this.render = function () {
    el.style.left = x + "px"
    el.style.top = y + "px"
  }



  //this.sit = function () {
  //   el.setAttribute("data-mode", "sitting");
  // }

  this.fly = function () {
    el.setAttribute("data-mode", "flying")
  }

  this.attack = function () {
    el.setAttribute("data-mode", "attacking")
  }

  // this.chew = function () {
  //   el.setAttribute("data-mode", "chewing")
  // }

  // this.dig = function () {
  //   el.setAttribute("data-mode", "digging")
  // }

  // this.distracted = function () {
  //   el.setAttribute("data-mode", "distracted")
  // }

  this.goTo = function (destinationX, destinationY) {
    if (isBusy) return
    isBusy = true
    const deltaX = destinationX - x
    const deltaY = y - destinationY

    const deltaXTime = Math.round(Math.abs(deltaX) * 2)
    const deltaYTime = Math.round(Math.abs(deltaY) * 2)
    const deltaTime = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) * 2
    let angle = (Math.atan(deltaX / deltaY) * 180 / Math.PI)
    if (deltaY < 0) {
      angle += 180
    }
    birdFlyEl.style.transform = `rotate(${angle}deg)`

    el.style.transition = deltaTime + 'ms'
    x = destinationX;
    y = destinationY;
    this.fly()

    //   if (deltaX > 0) {
    //     this.goRight()

    //   } else {
    //     this.goLeft()

    //   }
    setTimeout(function () {
      //////////  el.style.transition = deltaYTime + 'ms'
      // отправляем хомячка на север или Юг
      ///////  y = destinationY
      // if (deltaY > 0) {
      //   me.goDown()

      // } else {
      //   me.goUp()

      // }
      /////// setTimeout(function () {
      //   me.sit()
      isBusy = false
      el.style.transition = 300 + 'ms'
      ////////// }, deltaYTime)
    }, deltaTime)
  }

  // this.goUp = function () {
  //   this.run();
  //   this.direction = "top";
  //   humsterRunEl.style.transform = "rotate(90deg)"
  //   if (y - step < 0) {
  //     return false;
  //   }
  //   y = y - step
  // }

  // this.goDown = function () {
  //   this.run();
  //   this.direction = "down";
  //   humsterRunEl.style.transform = "rotate(-90deg)"
  //   if (y + step + size > scene.height) {
  //     return false;
  //   }
  //   y = y + step
  // }

  // this.goRight = function () {
  //   this.run();
  //   this.direction = "right";
  //   humsterRunEl.style.transform = "scale(-1,1)"
  //   if (x + step + size > scene.width) {
  //     return false;
  //   }
  //   x = x + step
  // }

  // this.goLeft = function () {
  //   this.run();
  //   this.direction = "left";
  //   humsterRunEl.style.transform = "none"
  //   if (x - step < 0) {
  //     return false;
  //   }

  //   x = x - step;
  // }

  // this.armor = function () {
  //   el.classList.add("armored")
  //   humsterRunEl = el.querySelector("#hamster_knight_run")
  // }

  // this.isArmored = function(){
  //  return el.classList.contains("armored")
  // }
  // this.noArmor = function(){
  //   el.classList.remove("armored")
  //   humsterRunEl = el.querySelector("#hamster_run")
  // }
  this.getCoords = function () {
    return { x, y }
  }

  setInterval(function () {
    if (paused) return
    me.render();
  }, 100)



}



