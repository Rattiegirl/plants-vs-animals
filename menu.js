const menu = [
  {
    name: "/examples/*",
    description: "примеры",
    links: [
      {
        url: "/examples/hamster-vs-rose",
        description: `Самая лучшая из игр довертесь нам`,
        screenshot: "/screenshots/hamster-vs-rose.png"
      },
      {
        url: "/examples/bird-vs-rose",
        description: `Не ходите пока, технические проблемы, птичка сбежала`,
        screenshot: "/screenshots/bird-vs-rose.png"
      },
      {
        url: "/examples/version-1",
        description: ``
      },
    ]
  },
  {
    name: "/*",
    description: "основные страницы",
    links: [
      // {
      //   url: "/index.html",
      //   description: ``
      // },
      {
        url: "/character.html",
        description: ``
      },
      // {
      //   url: "/mark.html",
      //   description: ``
      // },
      {
        url: "/roni.html",
        description: ``
      },
    ]
  },
  {
    name: "/variants*.html",
    description: "варианты",
    links: [
      {
        url: "/variants.html",
        description: ``
      },
      {
        url: "/variants-duck.html",
        description: ``
      },
      {
        url: "/variants-rose.html",
        description: ``
      },
    ]
  },
  {
    name: "/animals/*",
    description: "примеры игр",
    links: [
      {
        url: "/animals/index.html",
        description: ``
      },
      // {
      //   url: "/animals/bird_wrapper.html",
      //   description: ``
      // },
      // {
      //   url: "/animals/hamster_wrapper.html",
      //   description: ``
      // },
      // {
      //   url: "/animals/hamster.html",
      //   description: ``
      // },
      // {
      //   url: "/animals/vine_wrapper.html",
      //   description: ``
      // },
    ]
  },
  {
    name: "/schemes/*",
    description: "схемы",
    links: [
      {
        url: "/schemes/hamster_and_wall.html",
        description: ``
      },
    ]
  },
  {
    name: "/sockets/*",
    description: "сокеты",
    links: [
      {
        url: "/sockets/chat.html",
        description: ``
      },
      {
        url: "/sockets/game.html",
        description: ``
      },
    ]
  },
]

module.exports = {
  menu
}