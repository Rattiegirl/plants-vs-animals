const socket = io("http://84.38.188.9:4500");

socket.on("game", (data) => {
    const { type, name, params: { text } } = data
    if (type === "message") {
        addMessage({ name, text })
    }

})
const messagesEl = document.querySelector("#messages")
const chatFormEl = document.querySelector("#chat-form")
const inputFormEl = document.querySelector("#message")
const addMessage = ({ name, text }) => {
    console.log(text)
    const newMsgEl = document.createElement("div")
    newMsgEl.innerHTML = `
<b>${name}</b> <span>${text}</span>
`
    messagesEl.prepend(newMsgEl)
}
chatFormEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    const text= inputFormEl.value 
    inputFormEl.value = ""
    const name = "Maya"
    socket.emit("game",{
        type:"message", 
        name:name,
        params: {text:text}
    })
})