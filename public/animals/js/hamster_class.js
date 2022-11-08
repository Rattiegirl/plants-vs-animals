class Hamster {
    constructor(el, scene, x = 0, y = 0, size = 50, step = 10) {
        this.x = x;
        this.y = y;
        this.size = size
        this.step = step
        this.isBusy = false
        this.scene = scene
        this.direction = "left"
        ////render
        this.el = el;
        this.hamsterRunEl = el.querySelector("#hamster_run")
        this.initRender()

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

    //   this.isArmored = function () {
    //     return this.el.classList.contains("armored")
    //   }
    noArmor() {
        this.el.classList.remove("armored")
        this.humsterRunEl = this.el.querySelector("#hamster_run")
    }

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
        setTimeout(()=> {
            this.el.style.transition = deltaYTime + 'ms'
          // отправляем хомячка на север или Юг
          this.y = destinationY
          if (deltaY > 0) {
            this.goDown()
           
          } else {
            this.goUp()
           
          }
          setTimeout(()=> {
            this.sit()
            this.isBusy = false
            this.el.style.transition = 300 + 'ms'
          }, deltaYTime)
        }, deltaXTime)
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
}