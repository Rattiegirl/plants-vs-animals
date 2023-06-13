class Hamster {
  constructor(el, scene, x = 0, y = 0, size = 50, step = 10) {
    this.x = x;
    this.y = y;
    this.size = size
    this.step = step
    this.isBusy = false
    this.scene = scene
    this.direction = "left"
    this.state = "run"
    this.type = "hamster"
    this.goodsDictionary = {
      "armor": {
        count: 0,
        max: 1,
        using: () => {
          // нельзя одновременно одевать броню и камуфляж
          // позволяет один раз съесть бронированую розу с потерей своей брони
          //this.el.classList.add("armored")
          //this.humsterRunEl = this.el.querySelector("#hamster_knight_run")
        },
        loosing: () => {
          //this.el.classList.remove("armored")
          // this.humsterRunEl = this.el.querySelector("#hamster_run")
        }
      },
      "camoflauge": {
        count: 0,
        max: 1,
        leftoverUses: 0,
        using: (goodObject) => {
          // нельзя одновременно одевать броню и камуфляж
          goodObject.leftoverUses = 3
          //можно стать невидимым три раза по 7 секунд
        },

      },
      "rocket_booster": {
        count: 0,
        max: 1,
        using: () => {
          //при нажатии на пробел ускоряется на 10 секунд
        }
      },
      "water_buckets": {
        count: 0,
        max: 2,
        using: () => {
          //при нажатии на b вылить ведро перед собой, 
          //вода смывает ростки, хомя может наполнить ведро заново
          //чтобы купить новое ведро нужно скинуть старое
          //когда Хомя копает, вёдра выливаются
        }
      },
      "saddle": {
        count: 0,
        max: 1,
        using: () => {

        }
      },
    }
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
    this.updateClasses()
  }
  render() {
    this.el.style.left = this.x + "px"
    this.el.style.top = this.y + "px"
  }
  updateClasses() {
    let classes = ["hamster_wrapper"]
    if (this.state === "run") {
      classes.push(`turn-${this.direction}`)
    } else {
      classes.push(this.state)
    }
    const goodClasses = Object.keys(this.goodsDictionary).filter((good) => {
      if (this.goodsDictionary[good].count > 0) {
        return true
      }
      return false
    }).map(good => `good-${good}`)
    this.el.setAttribute("class", [...classes, ...goodClasses].join(" "))
  }

  camoflaugeVest() {
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
    this.state = "sit"
  }

  run() {
    ////a tiny bit of logic
    // if (beforeRunCallback) {
    //   beforeRunCallback()

    // }
    this.state = "run"
  }

  chew() {
    this.state = "chew"
  }

  dig() {
    this.state = "dig"
  }

  distracted() {
    this.state = "distracted"

    //this.el.setAttribute("data-mode", "distracted")
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
    if (!this.goodsDictionary[good]) {
      alert(`Я не умею использовать ${good}`)
      return
    }
    //this.el.classList.add(good)
    this.goodsDictionary[good].using(this.goodsDictionary[good])
    this.goodsDictionary[good].count += 1
    this.updateClasses()
    // if (good === "armor") {
    //   this.armor()

    // } else if (good === "camoflauge-vest") {
    //   this.camoflaugeVest()
    // } else if (good === "rocket-booster") {
    //   this.rocketBooster()
    // } else if (good === "bucket-of-water") {
    //   this.bucketOfWater()
    //   /// this.hamsterRunEl.style.step = 6
    // } else {
    //   alert(`Я не умею использовать ${good}`)
    //   return
    // }

    console.log(this.goodsDictionary)
    //else if (good=== "saddle"){
    //this.saddle()
    //}
  }
  removeGood(good) {
    if (!this.goodsDictionary[good]) {
      alert(`Я не могу убрать ${good}`)
      return
    }
    //this.el.classList.remove(good)
    this.goodsDictionary[good]?.loosing()
    this.goodsDictionary[good].count -= 1
    this.updateClasses()
    // if (good === "armor"){
    //   // this.el.classlist.remove("armored")
    //   this.noArmor()
    // }else if (good === "rocket-booster"){
    //   this.el.classlist.remove("withRocketBooster")
    // }else if (good === "camoflauge-vest"){
    //   this.el.classlist.remove("withcamoflaugeVest")
    // // }else if (good === "saddle"){
    // //   this.el.classlist.remove("withSaddle")
    // }else if (good === "bucket-of-water"){
    //   this.el.classlist.remove("withBucketOfWater")
    // }
    // this.goodsDictionary[good] -= 1
  }
  checkGood(good) {
    return this.goodsDictionary[good].count
  }


  ////logical render
  goUp() {
    this.run();
    this.direction = "up";
    this.updateClasses()
    //this.hamsterRunEl.style.transform = "rotate(90deg)"
    if (this.y - this.step < 0) {
      return false;
    }
    this.y -= this.step
  }

  goDown() {
    this.run();
    this.direction = "down";
    this.updateClasses()
    //this.hamsterRunEl.style.transform = "rotate(-90deg)"
    if (this.y + this.step + this.size > this.scene.height) {
      return false;
    }
    this.y += this.step
  }

  goRight() {
    this.run();
    this.direction = "right";
    this.updateClasses()
    //this.hamsterRunEl.style.transform = "scale(-1,1)"
    if (this.x + this.step + this.size > this.scene.width) {
      return false;
    }
    this.x += this.step
  }

  goLeft() {
    this.run();
    this.direction = "left";
    this.updateClasses()
    // this.hamsterRunEl.style.transform = "none"
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
    this.updateClasses()
  }

}