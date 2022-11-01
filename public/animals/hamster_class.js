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
        this.el.style.width = size + "px"
        this.el.style.height = size + "px"
    }
    render() {
        this.el.style.left = x + "px"
        this.el.style.top = y + "px"
    }

}