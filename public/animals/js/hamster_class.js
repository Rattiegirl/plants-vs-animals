class Hamster {
  constructor(el, scene, x = 0, y = 0, size = 50, step = 10) {
    this.x = x;
    this.y = y;
    this.size = size
    this.step = step
    this.isBusy = false
    this.scene = scene
    this.direction = "left"
    this.type = "hamster"
    ////render
    this.el = el;
    this.hamsterRunEl = el.querySelector("#hamster_run")
    this.initRender()

    this.doBeforeRun = function () {
      ////////////////  actionsMenu.style.opacity = "0"
    }
    this.el.addEventListener("contextmenu", function (event) {
      event.preventDefault()
      //console.log(hamster)
      // actionsMenu.style.opacity = "1"
      // actionsMenu.style.left = parseInt(hamster.el.style.left) + 5 + "px"
      // actionsMenu.style.top = parseInt(hamster.el.style.top) + 15 + "px"
    })
  }

  ////render
  initRender() {
    this.el.style.width = this.size + "px"
    this.el.style.height = this.size + "px"
  }
  render() {
    this.el.style.left = this.x + "px"
    this.el.style.top = this.y + "px"
  }

  armor() {

    this.el.classList.add("armored")
    this.humsterRunEl = this.el.querySelector("#hamster_knight_run")
  }

  isArmored() {
    return this.el.classList.contains("armored")
  }
  noArmor() {
    this.el.classList.remove("armored")
    this.humsterRunEl = this.el.querySelector("#hamster_run")
  }

  camouflaugeVest() {
    ///изменить вид Хоми
    ///лианы не видят
    

  }

  rocketBooster() {
    ///добавляется на Хомяка
    ///при нажати на пробел скорость увеличивается на 5 секунд

  }

  bucketOfWater() {
    ///добавляется на Хомяка
    ///при выливании смывает ростки растенний

  }

  //saddle() {
  //У Хомяка в инвентаре седло
  //Хомяк надевает на ездовых животных седло
  //
  //}
  sit() {
    this.el.setAttribute("data-mode", "sitting");
  }

  run() {
    ////a tiny bit of logic
    // if (beforeRunCallback) {
    //   beforeRunCallback()

    // }
    this.el.setAttribute("data-mode", "running")
  }

  chew() {
    this.el.setAttribute("data-mode", "chewing")
  }

  dig() {
    this.el.setAttribute("data-mode", "digging")
  }

  distracted() {
    this.el.setAttribute("data-mode", "distracted")
  }
  //////logic

  goTo(destinationX, destinationY) {
    if (this.isBusy) return
    this.isBusy = true
    const deltaX = destinationX - this.x
    const deltaY = destinationY - this.y

    const deltaXTime = Math.round(Math.abs(deltaX) * 2)
    const deltaYTime = Math.round(Math.abs(deltaY) * 2)
    // отправляем хомячка на восток или на запад
    this.el.style.transition = deltaXTime + 'ms'
    this.x = destinationX;

    if (deltaX > 0) {
      this.goRight()

    } else {
      this.goLeft()

    }
    setTimeout(() => {
      this.el.style.transition = deltaYTime + 'ms'
      // отправляем хомячка на север или Юг
      this.y = destinationY
      if (deltaY > 0) {
        this.goDown()

      } else {
        this.goUp()

      }
      setTimeout(() => {
        this.sit()
        this.isBusy = false
        this.el.style.transition = 300 + 'ms'
      }, deltaYTime)
    }, deltaXTime)
  }

    useGood(good) {
      if (good === "armor") {
        this.armor()
      ////  hamster.css.img = (`/public/animals/img/armor/armor-0.1.svg`);
      } else if (good === "camouflauge-vest") {
        this.camouflaugeVest()
      } else if (good === "rocket-booster"){
        this.rocketBooster()
      }else if (good === "bucket-of-water"){
        this.bucketOfWater()
       /// this.hamsterRunEl.style.step = 6
      }
      //else if (good=== "saddle"){
       //this.saddle()
      //}
   }
   

  
  ////logical render
  goUp() {
    this.run();
    this.direction = "top";
    this.hamsterRunEl.style.transform = "rotate(90deg)"
    if (this.y - this.step < 0) {
      return false;
    }
    this.y -= this.step
  }

  goDown() {
    this.run();
    this.direction = "down";
    this.hamsterRunEl.style.transform = "rotate(-90deg)"
    if (this.y + this.step + this.size > this.scene.height) {
      return false;
    }
    this.y += this.step
  }

  goRight() {
    this.run();
    this.direction = "right";
    this.hamsterRunEl.style.transform = "scale(-1,1)"
    if (this.x + this.step + this.size > this.scene.width) {
      return false;
    }
    this.x += this.step
  }

  goLeft() {
    this.run();
    this.direction = "left";
    this.hamsterRunEl.style.transform = "none"
    if (this.x - this.step < 0) {
      return false;
    }

    this.x -= this.step;
  }
  buttonPressed(key) {

    if (key === "ArrowDown") {
      this.goDown();
    }

    if (key === "ArrowUp") {
      this.goUp();
    }

    if (key === "ArrowRight") {
      this.goRight();
    }

    if (key === "ArrowLeft") {
      this.goLeft();
    }

    if (key === "d") {
      this.dig();
    }
  
    if (key === "s") {
      this.sit();
    }

    if (key === "l") {
      this.distracted();
    }
  
  }

}