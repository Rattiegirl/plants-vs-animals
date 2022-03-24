const getRandom = (k) => {
    let star = Math.random() * k + 1
    star = Math.floor(star)
    star = (star + "").padStart(2, "0")
    return star
}
for(let i = 0; i < 3; i += 1){
console.log(getRandom(10))
}

const settings= {
    fur: 4,
    ears: 6,
    tail:5
}
for (let option in settings){
    console.log(option, settings[option])
}