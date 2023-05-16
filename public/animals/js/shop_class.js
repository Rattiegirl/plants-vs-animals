const animalGoods = [
    { name: 'armor', img: "armor.png", price: 1, enabledFor: ['hamster', "mouse"] },
    { name: 'rocket_booster', img: "rocket_booster.png", price: 1, enabledFor: ['hamster'] },
    { name: 'camoflauge', img: "camoflauge_suit.png", price: 2, enabledFor: ['hamster', 'duckling'] },
    { name: 'saddle', img: "saddle.png", price: 3, enabledFor: ['bird', 'hamster'] },
    { name: 'water_buckets', img: "water_bucket.png", price: 3, enabledFor: ['hamster', "bird"] },

]

const plantGoods = [
    { name: 'iron-thorns', img: "iron_thorns.png", price: 2, enabledFor: ['rose'] },
    { name: 'rose-seed', img: "rose_seeds.png", price: 4, enabledFor: ['rose'] },
    { name: 'hanging-vine', img: "hanging_vines.png", price: 4, enabledFor: ['apple-tree'] },
    { name: 'apple-tree-seed', img: "apple_tree_seeds.png", price: 5, enabledFor: ['rose'] },


]
class Shop {
    constructor(el, team, game) {
        this.el = el
        this.team = team
        this.game = game
        this.goods = team === "animal" ? animalGoods : plantGoods
        this.open = true
        // this.armoredBtn = this.el.querySelector(".armor")
        // this.armoredBtn.onclick = function () {
        //     // hamster.armor()
        //     // animalSeeds -= 3
        //     // showSeeds()
        // }
        this.render()
        this.renderButton()
        this.addEvents()

    }
    renderButton() {
        const button = document.createElement("button")
        button.innerHTML = "shop"
        this.game.el.appendChild(button)
        button.classList.add("renderButton")
        button.onclick = () => {
            if(this.open) {
                this.el.style.opacity = 0;
                this.el.style.visibility = "hidden";
                button.style.backgroundColor = "gold"
                this.open = false
            } else{
                this.el.style.opacity = 1;
                this.el.style.visibility = "visible";
                button.style.backgroundColor = "red"
                this.open = true
            }
           
        }
    }



    render() {
        this.el.innerHTML = `
<div class="d-flex">
${this.goods.map((good) => {
            return `
<div class="good good-${good.name}" data-name="${good.name}">
    <div class="title">${good.name}</div>
    <div class="img"><img src="/shop/${good.img || "default.png"}" alt="${good.name}"></div>
    <div class="seeds">${good.price}</div>
</div>
`
        }).join("")}
 
</div>
    `
    }
    addEvents() {
        this.el.addEventListener("click", (e) => {
            e.preventDefault()
            const goodName = e.target.closest(".good").getAttribute("data-name")
            this.buy(goodName)
        })
    }
    buy(goodName) {
        const good = this.goods.find((item) => item.name === goodName)
        if (
            this.game.seeds >= good.price 
            && good.enabledFor.includes(this.game.activeHero.type)
            && this.game.activeHero.checkGood(good.name) === 0
        ) {
            this.game.activeHero.useGood(good.name)

            this.game.removeSeeds(good.price)
            ///////    alert(`Вы купили ${good.name}`)
        } else {
            alert(`Вы не купили ${good.name}`)
        }
    }
}
