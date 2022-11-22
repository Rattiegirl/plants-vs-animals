class Rose {
    constructor(el, scene, x = 0, y = 0, size = 85) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.el = el;
        this.scene = scene;
        this.initRender()
        this.timeout1 = null
        this.timeout2 = null
       
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

    wait() {
        this.el.setAttribute("data-mode", "waiting");
    }

    distract() {
        this.el.setAttribute("data-mode", "distracting");
    }
    attack() {
        this.el.setAttribute("data-mode", "attacking");
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
            }, 1500)
        }, 2000)
    }
}