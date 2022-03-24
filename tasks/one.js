
const getRandom = (n) => {
    let number = Math.random() * n + 1
    number = Math.floor(number)
    number = (number + "").padStart(2, "0")
    return number
}
for (let i = 0; i < 5; i += 1) {
    console.log(getRandom(8))
}
const settings = {
    body: 3,
    face: 3,
    eyes: 5,
    mouth: 10,
    accessory: 92
}
for ( let option in settings){
    console.log(option, settings[option])
}

