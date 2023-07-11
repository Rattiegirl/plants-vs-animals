const API = 'http://84.38.188.9:4500';

const gameEl = document.querySelector("#game")
const shopEl = document.querySelector("#shop")

const socket = io(`${API}`);
const team = confirm("Соизволите ли вы играть за Хомяков?")?"animal":"plant"
const scene = {
  width : 2500,
  height: 800,
  paused:false
}

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

socket.on("game", getAction);

const getGame = () => {
  //todo: use Game
  const el = document.querySelector("#game");
  const originalGame = new Game(el, 1000, 4, scene)
  const animals = {}
  const plants = {}
  originalGame.startTicker()
  // setInterval(() => {
  //   for (let animal of Object.values(animals)) {
  //     animal.render()
  //   }
  // }, 100)
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
        command: "plant",
        params: { x, y }
      });
      return;
    }
   
  })

  let activeAnimal = null;
  let activePlant = null;

  const setActiveAnimal = (animal) => {
    originalGame.activeHero = animal
    activeAnimal = animal;
    activePlant = null;
    console.log("active animal is " + (animal.name || 'anonymous animal'))
    for (let animal of Object.values(animals)) {
      animal.el.classList.remove("active");
    }
    activeAnimal.el.classList.add("active");
  }
  const setActivePlant = (plant) => {
    originalGame.activeHero = plant
    activePlant = plant;
    activeAnimal = null;
    console.log("active plant is " + (plant.name || 'anonymous plant'))
    for (let plant of Object.values(plants)) {
      plant.el.classList.remove("active");
    }
    activePlant.el.classList.add("active");
  }

  const addAnimal = (animal) => {
    originalGame.addAnimal(animal)
    animals[animal.name] = animal;
    el.append(animal.el);
    animal.render();
    console.log(animal)
    animal.el.addEventListener('click', () => {
      setActiveAnimal(animal);
    });
  }

  const addPlant = (plant) => {
    plants[plant.name] = plant;
    el.append(plant.el);
    //plant.render();
    plant.el.addEventListener('click', () => {
      setActivePlant(plant);
    });
  }

  return {
    el,
    addAnimal,
    addPlant,
    animals,
    plants,
    originalGame
  }
}

const game = getGame();


const shop = new Shop (shopEl, team, game.originalGame)

const getHamster = (params = {}) => {
  const firstHamster = document.querySelector("#first-hamster")
  let el = firstHamster.cloneNode(true);
  el.id = ""
  el.classList.remove("hidden")
  document.querySelector("#scene").appendChild(el)
  const hamster = new Hamster(el, scene)
  const name = params.name || "hamster";

  const goTo = ({ x, y }) => {
    hamster.goTo(x, y)   
  }

  const render = () => {
    hamster.render()
  }

  return {
    el,
    name,

    goTo,
    render,
    
    type: hamster.type,

    useGood: hamster.useGood.bind(hamster),
    checkGood: hamster.checkGood.bind(hamster) //"this" is hamster!


  }
}

const getRose = (params = {}) => {
  const firstRose = document.querySelector("#first-rose")
  let el = firstRose.cloneNode(true);
  el.id = ""
  el.classList.remove("hidden")
  document.querySelector("#scene").appendChild(el)
  const rose = new Rose(el, scene)
  const name = params.name || "rose";

  const plant = (params) => {
    
    const {x,y} = params
  rose.plant(x, y)
  }

  return {
    el,
    name,

    plant,
  }
}

// const hamster1 = getHamster({ name: "hamster-1" });
// game.addAnimal(hamster1)

// const hamster2 = getHamster({ name: "hamster-2" });
// game.addAnimal(hamster2)

// const rose1 = getRose({ name: "rose-1" });
// game.addPlant(rose1)

// const rose2 = getRose({ name: "rose-2" });
// game.addPlant(rose2)

const addAnimalButton = document.querySelector("#add-animal")

addAnimalButton.addEventListener("click", () => {
 if (team === "plant"){
  return false 
 }
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
 if (team === "animal"){
  return false 
 }
  sendAction({
    type: "game",
    name: "createPlant",
    // command: "goTo",
    params: {
      type: "rose",
      id: Date.now(),
      x: Math.floor(Math.random()*scene.width),
      y: Math.floor(Math.random()*scene.height),

    }
  });
})

//old code:

//in const goTo:

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

//in const render:
 // el.style.left = `${l}px`;
    // el.style.top = `${t}px`;

    // el.style.transition = `all ${blockTime}ms linear`
    // el.style.borderRadius = "50%"

  

//in const create:
 // el = document.createElement("div");
    // el.classList.add("hamster");
    // el.classList.add("rose");
    // // el.innerHTML = ``
    // el.style.width = `${w}px`;
    // el.style.height = `${h}px`;

//in const getRose:

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

//in const goTo:
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

//const create commented:
  // const create = () => {
  //   el = document.createElement("div");
  //   el.classList.add("hamster");
  //   el.classList.add("rose");
  //   // el.innerHTML = ``
  //   el.style.width = `${w}px`;
  //   el.style.height = `${h}px`;
  // }
  // create();

//in const getHamster:
 // let w = params.w || 100;
  // let h = Math.floor(w * 0.7);

  // let speed = params.speed || 1400; // 100px per second
  // let destination = 0;

  // let l = params.l || Math.floor(w / 2);
  // let t = params.t || Math.floor(h / 2);
  // let blockTime = 0;
  // let isBlocked = false;
  // let bgColor = "#e4b81b";