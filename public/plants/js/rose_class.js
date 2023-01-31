class Rose {
    constructor(el, scene, beforeDistractsDelay, beforeAttackDelay, x = 0, y = 0, size = 85) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.el = el;
        this.scene = scene;
        this.initRender()
        this.timeout1 = null
        this.timeout2 = null
        this.beforeDistractsDelay = beforeDistractsDelay
        this.beforeAttackDelay = beforeAttackDelay
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
            }, this.beforeAttackDelay)
        }, this.beforeDistractsDelay)
    }

    useGood(good) {
        if (good === "iron-thorns") {
            this.ironThorns()
        } else if (good === "rose-seed") {
            this.roseSeed()
        } else if (good === "apple-tree-seed") {
            this.appleTreeSeed()
        }
    }

}