const hamsterInfo = characters[1];
console.log('title', hamsterInfo.title)
console.log('items', hamsterInfo.items)

const fields = Object.keys(hamsterInfo.items)
console.log(fields) // ['body', 'armor', 'belt', 'hat']
console.log(Object.values(hamsterInfo.items))
const combinations = []

// for (let field of fields) {
//     const count = hamsterInfo.items[field].count;

//     for (let i=1; i<= count; i++){
//         console.log(field + i)
//         combinations.push ({
//           [field]:i
//         })
//     }
// }
const render = (characterObj)=>{
    const dir = `img/hamster/`
    const bodyImg = dir + 'body/body-' + ("" + characterObj.body).padStart(2, "0") + '.svg';
    const armorImg = dir + 'armor/armor-'+ ("" + characterObj.armor).padStart(2, "0") + '.svg';
    const beltImg = dir + 'belt/belt-'+ ("" + characterObj.belt).padStart(2, "0") + '.svg';
    const hatImg = dir + 'hat/hat-'+ ("" + characterObj.hat).padStart(2, "0") + '.svg';
  
    const wrapper = document.createElement('div');
    wrapper.classList.add('character-image-wrapper')
    wrapper.innerHTML = `
    <img src="${bodyImg}" style="z-index: 1;">
    <img src="${armorImg}" style="z-index: 2;">
    <img src="${beltImg}" style="z-index: 3;">
    <img src="${hatImg}" style="z-index: 4;">
    `
    
    document.body.append(wrapper)
  }
  
const items = hamsterInfo.items

for (let body=1; body <= items.body.count; body++) {
    for (let armor=1; armor <= items.armor.count; armor++) {
        for (let belt=1; belt <= items.belt.count; belt++) {
            for (let hat=1; hat <= items.hat.count; hat++) {
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
                })
            }
        }
    }
}
document.body.style.display = 'flex';
document.body.style.flexWrap = 'wrap';

console.log(combinations)
