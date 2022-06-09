const green_parrotInfo = characters[4];
const fields = Object.keys(green_parrotInfo.items)
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
const items = green_parrotInfo.items
for (let body = 1; body <= items.body.count; body++) {
    for (let tail = 1; tail <= items.tail.count; tail++) {
        for (let wings = 1; wings <= items.wings.count; wings++) {
                combinations.push({
                   body,
                    tail,
                    wings
                })
                render({
                    body,
                   tail,
                    wings
                },"green_parrot", fields)
            }
        }
    }

document.body.style.display = 'flex';
document.body.style.flexWrap = 'wrap';

