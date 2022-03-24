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
        body: { count: 2 },
        armor: { count: 2 },
        belt: { count: 1 },

    }
    for (let item in items) {
        globalCharacterObject.fields[item] = {
            index: 1,
            src: `${item}-${getRandom(items[item].count)}.svg`,
        };
    }





    renderCharacter(globalCharacterObject, characterImageWrapperEl);
})
