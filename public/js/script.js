const fieldsWrapperEl = document.querySelector(".fields-wrapper");
const characterFieldWrapperEl = document.querySelector(
    ".character-field-wrapper"
);
const characterImageWrapperEl = document.querySelector(
    ".character-image-wrapper"
)

const charactersGroup = {
    title: "characters",
    inputs: characters, // from select.js
};

let globalCharacterObject = {};
let globalListeners = [];
renderSelects(charactersGroup, characterFieldWrapperEl, {
    select: (name, value) => {
        changeCharacter(value);
    },
});

const changeCharacter = (character) => {
    globalCharacterObject = {
        name: character,
        fields: {}
    };
    for (let globalListener of globalListeners) {
        globalListener();
    }
    globalListeners = [];
    fieldsWrapperEl.innerHTML = "";
    renderCharacter(globalCharacterObject, characterImageWrapperEl);
    if (!character) return;
    const inputGroups = getCharacterInputsSettings(character);
    for (let inputGroup of inputGroups) {
        const res = renderButtons(inputGroup, fieldsWrapperEl, {
            select: (name, value) => {
                globalCharacterObject.fields[name] = {
                    index: inputGroup.index,
                    src: value,
                };
                renderCharacter(globalCharacterObject, characterImageWrapperEl);
            },
        });
        globalListeners.push(res.removeListeners);
    }
};
const randomBtn = document.querySelector(".btn-random")
const rightBtn = document.querySelector(".btn-right")
const leftBtn = document.querySelector(".btn-left")
const upBtn = document.querySelector(".btn-up")
const downBtn = document.querySelector(".btn-down")
const getRandom = (k) => {
    let star = Math.random() * k + 1
    star = Math.floor(star)
    star = (star + "").padStart(2, "0")
    return star
}
randomBtn.addEventListener("click", (event) => {
    event.preventDefault()
    console.log(globalCharacterObject)
    const items = {
        body: { count: 3 },
        armor: { count: 2 },
        belt: { count: 3 },
        hat:{count:1}

    }

    for(let item in items) {
        globalCharacterObject.fields[item] = {
            index: 1,
            src: `${item}-${getRandom(items[item].count)}.svg`,
        };
    }
    renderCharacter(globalCharacterObject, characterImageWrapperEl);
})

rightBtn.addEventListener("click", (event)=>{
    event.preventDefault()
    characterImageWrapperEl.style.transform="scaleX(-1)"
})

leftBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    characterImageWrapperEl.style.transform="scaleX(1)"
})
upBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    characterImageWrapperEl.style.transform="scaleY(-1)"
})
downBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    characterImageWrapperEl.style.transform="scaleY(1)"
})