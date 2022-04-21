const roseInfo = characters[2];
const fields = Object.keys(roseInfo.items)
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
const items = roseInfo.items
for (let pose = 1; pose <= items.pose.count; pose++) {
    for (let stem = 1; stem <= items.stem.count; stem++) {
        for (let flower = 1; flower <= items.flower.count; flower++) {
            for (let thorns = 1; thorns <= items.thorns.count; thorns++) {
                combinations.push({
                    pose,
                    stem,
                    flower,
                    thorns
                })
                render({
                    pose,
                    stem,
                    flower,
                    thorns
                },"rose", fields)
            }
        }
    }
}
document.body.style.display = 'flex';
document.body.style.flexWrap = 'wrap';

