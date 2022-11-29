class Game {
    constructor(el) {
        this.el = el
        this.scene = {
            paused: true,
            width: 1500,
            height: 700,
        }
        this.animals = []
        this.timerEl = this.el.querySelector(".timer")
        this.seconds = 300
    }
    addAnimal(animal) {
        this.animals.push(animal)
    }
    renderAnimals() {
        for (let animal of this.animals) {
            animal.render()
        }
    }
    startTicker() {
        setInterval(() => {
            if (this.scene.paused) return
            this.renderAnimals()
        }, 100)
    }
    timesUp() {
        alert("Нету времени")
    }
    startTimer() {
        const intervalId = setInterval(
            ()=> {
                if (this.scene.paused) return
                this.seconds = this.seconds - 1
                this.timerEl.innerText = "00:" + (this.seconds + "").padStart(2, "0")
                if (this.seconds < 1) {
                    this.seconds = 0
                    clearInterval(intervalId)
                    this.timesUp()
                }
            }, 1000
        )
    }
}