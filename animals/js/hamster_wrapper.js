function Hamster() {
  const el =  document.querySelector ("#hamster_wrapper")
  const humsterRunEl = el.querySelector("#hamster_run")
  let x= 0;
  let y= 0;
  let step = 200;

  this.direction="left"

  const me = this;
  this.render= function(){
      el.style.left= x + "px"
      el.style.top= y + "px"
  }

  this.sayHi = function(){
      alert("Hi I want to chew you")
  }

  this.sit = function () {
    el.setAttribute("data-mode", "sitting");
  }

  this.run = function ( ) {
    el.setAttribute("data-mode","running" )
  }

  this.goUp = function (){
      this.run();
      this.direction="top";
      humsterRunEl.style.transform="rotate(90deg)"
      y=y-step
  }

  this.goDown = function (){
    this.run();
    this.direction="down";
    humsterRunEl.style.transform="rotate(-90deg)"
    y=y+step
  }

  this.goRight = function (){
    this.run();
    this.direction="right";
    humsterRunEl.style.transform="scale(-1,1)"
    x=x+step
  }

  this.goLeft = function (){
    this.run();
    this.direction="left";
    humsterRunEl.style.transform="none"
    x=x-step
  }

  setInterval(function(){
    me.render();
  },100)

  this.chew = function ( ) {
    el.setAttribute("data-mode","chewing" )
  }

  this.dig = function ( ) {
    el.setAttribute("data-mode","digging" )
  }

  this.distracted = function ( ) {
    el.setAttribute("data-mode","distracted" )
  }


}

const hamster = new Hamster();
// hamster.sayHi();
//hamster.sit();
//hamster.run();
//hamster.goUp();
//hamster.goDown();
// hamster.goRight();
//hamster.goLeft();
//hamster.chew(); 
//hamster.dig();
//hamster.distracted();