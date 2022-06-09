const hamsterInfo = characters[1];
const fields = Object.keys(hamsterInfo.items)
const combinations = []

const render = (characterObj,name, fields) => {
    const dir = `img/${name}/`

    let str = ""
    let index = 1
    for (let field of fields) {

        const src = `${dir}${field}/${field}-${("" + characterObj[field]).padStart(2, "0")}.svg`
        str += `<img src="${src}" style="z-index: ${index++};">`
    }
    const wrapper = document.createElement('div');
    wrapper.classList.add('character-image-wrapper')

    wrapper.innerHTML = str

    document.body.append(wrapper)
}
const items = hamsterInfo.items
for (let body = 1; body <= items.body.count; body++) {
    for (let armor = 1; armor <= items.armor.count; armor++) {
        for (let belt = 1; belt <= items.belt.count; belt++) {
            for (let hat = 1; hat <= items.hat.count; hat++) {
                combinations.push({
                   body,
                    armor,
                    belt,
                    hat
                })
                render({
                    body,
                    armor,
                    belt,
                    hat
                },"hamster", fields)
            }
        }
    }
}
document.body.style.display = 'flex';
document.body.style.flexWrap = 'wrap';

