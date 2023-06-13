class Rose {
    constructor(el, scene, beforeDistractsDelay = 3500, beforeAttackDelay = 2000, x = 0, y = 0, size = 85) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.el = el;
        this.scene = scene;
        this.type = "rose";
        this.state = "default"
        this.initRender()
        this.timeout1 = null
        this.timeout2 = null
        this.beforeDistractsDelay = beforeDistractsDelay
        this.beforeAttackDelay = beforeAttackDelay
        this.goodsDictionary = {
            "iron-thorns": {
              count: 0,
              max: 1,
              using: () => {

                // роза одевает броню на шипы, она ломается только когда бронированный Хомя нападает на розу. У Хоми броня тоже ломается.
               
                
              },
              loosing: () => {
                
              } 
            },
            "rose-seed": {
              count: 0,
              max: 3,
              leftoverUses: 0,
              using: (goodObject) => {
                // роза может посадить ростки которые выростают через минуту и больше не боятся воды
               
               
              },
            
            },
            "apple-tree-seed": {
              count: 0,
              max: 2,
              using: () => {
                // роза может посадить росток яблони который выростает через полторы минуты и больше не боится воды
              }
            },
            "camoflauge": {
              count: 0,
              max: 1,
              using: () => {
                // роза может скрыться на пару секунд
              }
            }
          }
          this.updateClasses()
    }

    ///render
    initRender() {
        this.el.style.width = this.size + "px"
        this.el.style.height = this.size + "px"
       
    }

    render() {
        this.el.style.left = this.x + "px"
        this.el.style.top = this.y + "px"
    }
    updateClasses() {
        let classes = ["rose_wrapper"]
        classes.push(this.state)
        
        const goodClasses = Object.keys(this.goodsDictionary).filter((good) => {
          if (this.goodsDictionary[good].count > 0) {
            return true
          }
          return false
        }).map(good => `good-${good}`)
        this.el.setAttribute("class", [...classes, ...goodClasses].join(" "))
      }

    ironThorns() {
        ///Роза одевает, Хомя не может сгрызть без защиты, да и то просто защита у Хоми и розы ломается
    }

    roseSeed() {
        ///Роза может посадить росток розы который за минуту выростает
    }

    appleTreeSeed() {
        ///Роза может посадить росток яблочного дерева который вырастит за две минуты

    }

    wait() {
        // this.el.setAttribute("data-mode", "waiting");
        this.state = "default"
        this.updateClasses()
    }

    distract() {
        // this.el.setAttribute("data-mode", "distracting");
        this.state = "distract"
        this.updateClasses()
    }
    attack() {
        // this.el.setAttribute("data-mode", "attacking");
        this.state = "attack"
        this.updateClasses()
    }
    getDataMode() {
        return this.el.getAttribute("data-mode")
    }

    ///not render /// logic
    plant(destinationX, destinationY) {
        if (this.scene.paused) return
        this.x = destinationX
        this.y = destinationY
        this.render()
        clearTimeout(this.timeout1)
        clearTimeout(this.timeout2)
        this.wait()
        this.timeout1 = setTimeout(() => {

            if (this.scene.paused) return
            this.distract()
            this.timeout2 = setTimeout(() => {
                if (this.scene.paused) return
                this.attack()
            }, this.beforeAttackDelay)
        }, this.beforeDistractsDelay)
    }
    checkGood(good) {
      return this.goodsDictionary[good].count
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
    }
    buttonPressed(key) {
  
      if (key === "c") {
       alert("I need a cart");
      }
  
      if (key === "d") {
        this.distract();
      }
  
      if (key === "a") {
        this.attack();
      }
      this.updateClasses()
    }
}