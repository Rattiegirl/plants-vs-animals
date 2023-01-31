class Bird {
    constructor(el, scene, x = 100, y = 100, size = 65, step = 10) {
        this.x = x;
        this.y = y;
        this.size = size
        this.step = step
        this.isBusy = false
        this.scene = scene
        this.direction = "up"
        ////render
        this.el = el;
        this.birdFlyEl = el.querySelector("#bird_fly")
        this.initRender()
        this.render()
        this.fly()

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

    bucketOfWater() {
        ///добавляется на Птичку
        ///при выливании смывает ростки растенний
    
    }

    saddle() {
        ///Кто-то должен прийти и одеть на птицу
    }


    fly() {
        this.el.setAttribute("data-mode", "flying");
    }

    attack() {

        this.el.setAttribute("data-mode", "attacking")
    }

    goTo(destinationX, destinationY) {
        if (this.isBusy) return
        this.isBusy = true
        const deltaX = destinationX - this.x
        const deltaY = this.y - destinationY

        const deltaXTime = Math.round(Math.abs(deltaX) * 2)
        const deltaYTime = Math.round(Math.abs(deltaY) * 2)

        const deltaTime = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) * 2
        let angle = (Math.atan(deltaX / deltaY) * 180 / Math.PI)
        if (deltaY < 0) {
            angle += 180
        }
        this.birdFlyEl.style.transform = `rotate(${angle}deg)`



        this.el.style.transition = deltaXTime + 'ms'
        this.x = destinationX;
        this.y = destinationY;
        this.fly()

        setTimeout(() => {
            this.isBusy = false
            this.el.style.transition = 300 + 'ms'

        }, deltaTime)
    }

    useGood(good) {
        if (good === "bucket-of-water") {
            this.bucketOfWater()
        //   el.style.step = 9;
        //   el.style.transition = 200 + 'ms'
        } else if (good === "saddle") {
            this.saddle()
        // alert("Bird can be ridden");
        }
      }
}