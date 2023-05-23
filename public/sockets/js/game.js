const API = 'http://84.38.188.9:4500';

const socket = io(`${API}`);

const handleAction = (data) => {
  console.log({ data })
  getAction(data);
}

socket.on("game", handleAction);

const sendAction = (data) => {
  socket.emit("game", data);
}

const getAction = (data) => {
  const { type, name, command, params } = data;
  if (type === "animal") {
    const animal = game.animals[name];
    animal[command](params);
  }
  console.log(1)
  if (type === "game"){
    console.log(2)
    if (name === "createAnimal"){
      console.log(3)
      const {type, id, l, w} = params
      if (type === "hamster"){
        console.log(4)
        const animal = getHamster({ name: `${type}-${id}`, l: l, w: w });
        game.addAnimal(animal)
      }
     
    }
  }
}

const getGame = () => {
  const el = document.querySelector("#game");
  const animals = {}

  el.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    if (e.target.getAttribute("id") !== "game") return;


    if (activeAnimal) {
      // activeAnimal.goTo({x, y});
      sendAction({
        type: "animal",
        name: activeAnimal.name,
        command: "goTo",
        params: { x, y }
      });
      return;
    }
    console.log({ x, y });
  })

  let activeAnimal = null;

  const setActiveAnimal = (animal) => {
    activeAnimal = animal;
    console.log("active animal is " + (animal.name || 'anonymous animal'))
    for (let animal of Object.values(animals)) {
      animal.el.classList.remove("active");
    }
    activeAnimal.el.classList.add("active");
  }

  const addAnimal = (animal) => {
    animals[animal.name] = animal;
    el.append(animal.el);
    animal.render();
    animal.el.addEventListener('click', () => {
      setActiveAnimal(animal);
      const randomColor = "#" + Math.floor(Math.random() * (16 ** 3)).toString(16)
      sendAction({
        type: "animal",
        name: animal.name,
        command: "changeColor",
        params: { color: randomColor }
      });
      const randomSize = Math.floor(Math.random() * 290) + 10
      sendAction({
        type: "animal",
        name: animal.name,
        command: "changeSize",
        params: { size: randomSize }


      })
    });
  }

  return {
    el,
    addAnimal,
    animals,
  }
}

const game = getGame();

const getHamster = (params = {}) => {
  let el = null;
  const name = params.name || "hamster";

  let w = params.w || 100;
  let h = Math.floor(w * 0.7);

  let speed = params.speed || 1400; // 100px per second
  let destination = 0;

  let l = params.l || Math.floor(w / 2);
  let t = params.t || Math.floor(h / 2);
  let blockTime = 0;
  let isBlocked = false;
  let bgColor = "#e4b81b";

  const changeColor = ({ color }) => {
    bgColor = color;
    el.style.backgroundColor = color
  }

  const changeSize = ({ size }) => {
    w = size;
    h = Math.floor(w * 0.7);
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
  }

  const goTo = ({ x, y }) => {
    if (isBlocked) return;
    isBlocked = true;
    el.classList.add("is-blocked");

    destination = Math.sqrt((x - l) ** 2 + (y - t) ** 2);
    blockTime = Math.floor(destination * 1000 / speed);
    console.log({ destination, blockTime })
    l = x;
    t = y;
    render();

    setTimeout(() => {
      isBlocked = false;
      el.classList.remove("is-blocked");
    }, blockTime)
  }

  const create = () => {
    el = document.createElement("div");
    el.classList.add("hamster");
    // el.innerHTML = ``
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
  }
  create();

  const render = () => {
    el.style.left = `${l}px`;
    el.style.top = `${t}px`;

    el.style.transition = `all ${blockTime}ms linear`
  }

  return {
    el,
    name,

    goTo,
    render,

    changeColor,
    changeSize,
  }
}

const hamster1 = getHamster({ name: "hamster-1" });
game.addAnimal(hamster1)

const hamster2 = getHamster({ name: "hamster-2", l: 200, w: 70 });
game.addAnimal(hamster2)

const addAnimalButton = document.querySelector("#add-animal")

addAnimalButton.addEventListener("click", () => {
 
  sendAction({
    type: "game",
    name: "createAnimal",
    // command: "goTo",
    params: { 
      type: "hamster",
      id: Date.now(),
      l: 100,
      w: 333
    }
  });
})