function Rose() {
    const el = document.querySelector("#rose_wrapper")

    let y = 0
    let x = 0
    const size = 85

    const scene = {
        width: 1500,
        height: 700,
    }

    el.style.width = size + "px"
    el.style.height = size + "px"

    const me = this;
    me.timeout1=null
    me.timeout2=null
    this.render = function () {
        el.style.left = x + "px"
        el.style.top = y + "px"
    }

    this.wait = function () {
        el.setAttribute("data-mode", "waiting");
    }

    this.distract = function () {
        el.setAttribute("data-mode", "distracting");
    }
    this.attack = function () {
        el.setAttribute("data-mode", "attacking");
    }
    this.getDataMode=function(){
        return el.getAttribute("data-mode")
    }


    this.plant = function (destinationX, destinationY) {
        if(paused) return
        x = destinationX
        y = destinationY
        clearTimeout (me.timeout1)
        clearTimeout (me.timeout2)
        me.wait()
        me.timeout1=setTimeout(function () {
            
            if(paused) return
            me.distract()
            me.timeout2=setTimeout(function () {
                if(paused) return
                me.attack()
            }, 1500)
        }, 2000)
    }

    this.getCoords= function(){
        return{x,y}
    }
    setInterval(function () {
        me.render();
    }, 100)




}
