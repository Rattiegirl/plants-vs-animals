const duckInfo = characters[3];
const fields = Object.keys(duckInfo.items)
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
const items = duckInfo.items
for (let body = 1; body <= items.body.count; body++) {
    for (let wings = 1; wings <= items.wings.count; wings++) {
        for (let tail = 1; tail <= items.tail.count; tail++) {
            for (let mohawk = 1; mohawk <= items.mohawk.count; mohawk++) {
                combinations.push({
                    body,
                    wings,
                    tail,
                    mohawk
                })
                render({
                    body,
                    wings,
                    tail,
                    mohawk
                },"duck", fields)
            }
        }
    }
}
document.body.style.display = 'flex';
document.body.style.flexWrap = 'wrap';

