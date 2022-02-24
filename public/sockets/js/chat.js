const socket = io("http://84.38.188.9:4500");

socket.on("game", (data) => {
    const { type, name, params: { text } } = data
    if (type === "message") {
        addMessage({ name, text })
    }

})
const messagesEl = document.querySelector("#messages")
const chatFormEl = document.querySelector("#chat-form")
const inputFormEl = document.querySelector("#msg")
const addMessage = ({ name, text }) => {
    console.log(text)
    const newMsgEl = document.createElement("div")
    newMsgEl.innerHTML = `
<b>${name}</b> <span>${text}</span>
`
    messagesEl.prepend(newMsgEl)
}
chatFormEl.addEventListener("submit", (event) => {
    event.preventDefault()
    const text = inputFormEl.value
    inputFormEl.value = ""
    const name = "Maya"
    socket.emit("game", {
        type: "message",
        name: name,
        params: { text: text }
    })
})


const steps = [{
    text: "place wall, (150,400), choose wall, click on map"

}, {
    text: "place hamster, (50,50), choose hamster, click on map"

}, {
    text: "place bird, (400,400), choose bird, click on map"

}, {
    text: "bird goTo, (50,50), click on bird, press 'carry' "

}, {
    text: "bird carry hamster, click on hamster"

}, {
    text: "bird goTo, (200,400), click on map"

}, {
    text: "bird dropoff hamster, press 'drop' "

}, {
    text: "hamster goTo (500, 500), click on hamster, click on map"

}]

for (let i = 0; i < steps.length; i += 1) {
    setTimeout(function () {
        socket.emit("game", {
            type: "message",
            name: i,
            params: { text: steps[i].text }
        })

    }, i * 1000)

} 