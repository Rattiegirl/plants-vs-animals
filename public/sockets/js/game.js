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
  if (type === "plant") {
    const plant = game.plants[name];
    plant[command](params);
  }

  if (type === "game") {

    if (name === "createAnimal") {

      const { type, id} = params
      if (type === "hamster") {

        const animal = getHamster({ name: `${type}-${id}`});
        game.addAnimal(animal)
      }

    }
    if (name === "createPlant") {

      const {type, id, x, y} = params
      if (type === "rose") {

        const plant = getRose({ name: `${type}-${id}`});
        game.addPlant(plant)
        plant.plant({x,y})
      }

    }
  }
}

const getGame = () => {
  const el = document.querySelector("#game");
  const animals = {}
  const plants = {}
  setInterval(() => {
    for (let animal of Object.values(animals)) {
      animal.render()
    }
  }, 100)
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
    if (activePlant) {
      // activeAnimal.goTo({x, y});
      sendAction({
        type: "plant",
        name: activePlant.name,
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
    activePlant = null;
    console.log("active animal is " + (animal.name || 'anonymous animal'))
    for (let animal of Object.values(animals)) {
      animal.el.classList.remove("active");
    }
    activeAnimal.el.classList.add("active");
  }
  const setActivePlant = (plant) => {
    activePlant = plant;
    activeAnimal = null;
    console.log("active plant is " + (plant.name || 'anonymous plant'))
    for (let plant of Object.values(plants)) {
      plant.el.classList.remove("active");
    }
    activePlant.el.classList.add("active");
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

  const addPlant = (plant) => {
    plants[plant.name] = plant;
    el.append(plant.el);
    plant.render();
    plant.el.addEventListener('click', () => {
      setActivePlant(plant);
      const randomColor = "#" + Math.floor(Math.random() * (16 ** 3)).toString(16)
      sendAction({
        type: "plant",
        name: plant.name,
        command: "changeColor",
        params: { color: randomColor }
      });
      const randomSize = Math.floor(Math.random() * 290) + 10
      sendAction({
        type: "plant",
        name: plant.name,
        command: "changeSize",
        params: { size: randomSize }


      })
    });

  }


  return {
    el,
    addAnimal,
    addPlant,
    animals,
    plants
  }
}





const game = getGame();

const getHamster = (params = {}) => {
  const firstHamster = document.querySelector("#first-hamster")
  let el = firstHamster.cloneNode(true);
  el.id = ""
  el.classList.remove("hidden")
  document.querySelector("#scene").appendChild(el)
  const hamster = new Hamster(el, { width: 1200, height: 700 })
  const name = params.name || "hamster";

  // let w = params.w || 100;
  // let h = Math.floor(w * 0.7);

  // let speed = params.speed || 1400; // 100px per second
  // let destination = 0;

  // let l = params.l || Math.floor(w / 2);
  // let t = params.t || Math.floor(h / 2);
  // let blockTime = 0;
  // let isBlocked = false;
  // let bgColor = "#e4b81b";

  const changeColor = ({ color }) => {
    // bgColor = color;
    // el.style.backgroundColor = color
  }

  const changeSize = ({ size }) => {
    // w = size;
    // h = Math.floor(w * 0.7);
    // el.style.width = `${w}px`;
    // el.style.height = `${h}px`;
  }

  const goTo = ({ x, y }) => {
    hamster.goTo(x, y)
    // if (isBlocked) return;
    // isBlocked = true;
    // el.classList.add("is-blocked");

    // destination = Math.sqrt((x - l) ** 2 + (y - t) ** 2);
    // blockTime = Math.floor(destination * 1000 / speed);
    // console.log({ destination, blockTime })
    // l = x;
    // t = y;
    // render();

    // setTimeout(() => {
    //   isBlocked = false;
    //   el.classList.remove("is-blocked");
    // }, blockTime)
  }

  // const create = () => {
  //   el = document.createElement("div");
  //   el.classList.add("hamster");
  //   el.classList.add("rose");
  //   // el.innerHTML = ``
  //   el.style.width = `${w}px`;
  //   el.style.height = `${h}px`;
  // }
  // create();

  const render = () => {
    hamster.render()
    // el.style.left = `${l}px`;
    // el.style.top = `${t}px`;

    // el.style.transition = `all ${blockTime}ms linear`
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

const getRose = (params = {}) => {
  const firstRose = document.querySelector("#first-rose")
  let el = firstRose.cloneNode(true);
  el.id = ""
  el.classList.remove("hidden")
  document.querySelector("#scene").appendChild(el)
  const rose = new Rose(el, { width: 1200, height: 700 })
  const name = params.name || "rose";

  // const name = params.name || "rose";

  // let w = params.w || 100;
  // let h = Math.floor(w * 0.7);

  // let speed = params.speed || 1400; // 100px per second
  // let destination = 0;

  // let l = params.l || Math.floor(w / 2);
  // let t = params.t || Math.floor(h / 2);
  // let blockTime = 0;
  // let isBlocked = false;
  // let bgColor = "#e4b81b";


  const changeColor = ({ color }) => {
    // bgColor = color;
    // el.style.backgroundColor = color
  }

  const changeSize = ({ size }) => {
    // w = size;
    // h = Math.floor(w * 0.7);
    // el.style.width = `${w}px`;
    // el.style.height = `${h}px`;
  }

  const goTo = ({ x, y }) => {
    // if (isBlocked) return;
    // isBlocked = true;
    // el.classList.add("is-blocked");

    // destination = Math.sqrt((x - l) ** 2 + (y - t) ** 2);
    // blockTime = Math.floor(destination * 1000 / speed);
    // console.log({ destination, blockTime })
    // l = x;
    // t = y;
    // render();

    // setTimeout(() => {
    //   isBlocked = false;
    //   el.classList.remove("is-blocked");
    // }, blockTime)
  }
  const plant = (params) => {
    
    const {x,y} = params
  rose.plant(x, y)
  }

  const create = () => {
    // el = document.createElement("div");
    // el.classList.add("hamster");
    // el.classList.add("rose");
    // // el.innerHTML = ``
    // el.style.width = `${w}px`;
    // el.style.height = `${h}px`;
  }
  create();

  const render = () => {
    // el.style.left = `${l}px`;
    // el.style.top = `${t}px`;

    // el.style.transition = `all ${blockTime}ms linear`
    // el.style.borderRadius = "50%"
  }

  return {
    el,
    name,

    goTo,
    render,

    changeColor,
    changeSize,

    plant,
  }
}

const hamster1 = getHamster({ name: "hamster-1" });
game.addAnimal(hamster1)

const hamster2 = getHamster({ name: "hamster-2" });
game.addAnimal(hamster2)

const rose1 = getRose({ name: "rose-1" });
game.addPlant(rose1)

const rose2 = getRose({ name: "rose-2" });
game.addPlant(rose2)

const addAnimalButton = document.querySelector("#add-animal")

addAnimalButton.addEventListener("click", () => {

  sendAction({
    type: "game",
    name: "createAnimal",
    // command: "goTo",
    params: {
      type: "hamster",
      id: Date.now(),
      
    }
  });
})
const addPlantButton = document.querySelector("#add-plant")

addPlantButton.addEventListener("click", () => {

  sendAction({
    type: "game",
    name: "createPlant",
    // command: "goTo",
    params: {
      type: "rose",
      id: Date.now(),
      x: Math.floor(Math.random()*1300),
      y: Math.floor(Math.random()*700),

    }
  });
})