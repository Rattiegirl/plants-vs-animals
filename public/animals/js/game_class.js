class Game {
    constructor(el, seconds, needToEat) {
        this.el = el
        this.scene = {
            paused: true,
            width: 1100,
            height: 650,
        }
        this.animals = []
        this.timerEl = this.el.querySelector(".timer")
        this.seedsEl = document.querySelector(".seeds")
        this.seconds = seconds
        this.initButtons()
        this.needToEat = needToEat
        this.seeds = 0
        this.showSeeds()
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
            () => {
                if (this.scene.paused) return
                this.seconds = this.seconds - 1
                const minutes = (Math.floor(this.seconds/60) + "").padStart(2, "0")
                const seconds = (Math.floor(this.seconds%60) + "").padStart(2, "0")
                this.timerEl.innerText = `${minutes}:${seconds}` 
                if (this.seconds < 1) {
                    this.seconds = 0
                    clearInterval(intervalId)
                    this.timesUp()
                }
            }, 1000
        )
    }
    play() {
        this.scene.paused = false
        const x = Math.floor(Math.random() * this.scene.width)
        const y = Math.floor(Math.random() * this.scene.height)
        rose.plant(x, y);
        this.playPauseBtn.innerText = "Pause"
    }
    pause() {
        this.scene.paused = true
        this.playPauseBtn.innerText = "Play"
    }
    initButtons() {
        /////////////////////////////////to-do refactoring 
        /////play and pause
        // как много кнопок и окон
        this.playPauseBtn = document.querySelector("#play-pause-btn")
        const overlay = document.querySelector(".overlay")
        const startGameBtn = document.querySelector(".start-game-btn")
        const startGameModal = document.querySelector(".start-game-modal")
        const gameOverModal = document.querySelector(".game-over-modal")
        const winnerName = document.querySelector(".winner-name")
        const winnerAnimal = document.querySelector(".winner-animal")
        const winnerPlant = document.querySelector(".winner-plant")
        const restartGameBtn = document.querySelector(".restart-game-btn")

        this.playPauseBtn.onclick =()=>{
            //// alert("You started the game!")
            if (
                this.scene.paused === true
            ) {
                this.play()
            } else {
                this.pause()
            }


        }
        startGameBtn.onclick = ()=> {
            overlay.classList.add("hidden")
            setTimeout(()=> {
                this.play()
                overlay.style.display = "none"
                startGameModal.classList.add("hidden")
            }, 300)

        }
        this.timesUp = () => {
            this.pause()
            overlay.classList.remove("hidden")
            overlay.style.display = "flex"
            gameOverModal.classList.remove("hidden")
            ////////////////////change winner-name, set crown
            const winner = (animalPoints >= this.needToEat) ? "hamster" : "rose"
            if (winner === "hamster") {
                winnerAnimal.classList.add("with-crown");
                winnerName.innerText = "славный герой Хомя!"
            } else {
                winnerPlant.classList.add("with-crown");
                winnerName.innerText = "славная колючка Роза!"
            }
        }
        ///////////////const chewRose = 3
    }

    showSeeds() {
        this.seedsEl.innerHTML = ""
        for (let i = 0; i < this.seeds; i += 1) {
          const imgEl = document.createElement("img")
          imgEl.setAttribute("src", "../img/sunflower_seed.png")
          this.seedsEl.append(imgEl)
        }
    }

    addSeeds(seedAmount) {
        this.seeds += seedAmount
        this.showSeeds()
    }

    removeSeeds(seedAmount) {
        this.seeds -= seedAmount
        this.showSeeds()

    }
}