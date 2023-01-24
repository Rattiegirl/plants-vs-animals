const animalGoods = [
    { name: 'armor', img: "armor.png", price: 1, enabledFor: ['hamster', "mouse"] },
    { name: 'rocket-booster', img: "rocket_booster.png", price: 1, enabledFor: ['hamster'] },
    { name: 'camouflauge-vest', img: "camoflauge_suit.png", price: 2, enabledFor: ['hamster', 'duckling'] },
    { name: 'saddle', img: "saddle.png", price: 3, enabledFor: ['bird'] },
    { name: 'bucket-of-water', img: "water_bucket.png", price: 3, enabledFor: ['hamster', "bird"] },

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
        // this.armoredBtn = this.el.querySelector(".armor")
        // this.armoredBtn.onclick = function () {
        //     // hamster.armor()
        //     // animalSeeds -= 3
        //     // showSeeds()
        // }
        this.render()
        this.addEvents()

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
        if (this.game.seeds >= good.price && good.enabledFor.includes(this.game.activeHero.type)) {
            this.game.activeHero.useGood(good.name)
            this.game.removeSeeds(good.price)
        ///////    alert(`Вы купили ${good.name}`)
        } else {
            alert(`Вы не купили ${good.name}`)
        }
    }
}
