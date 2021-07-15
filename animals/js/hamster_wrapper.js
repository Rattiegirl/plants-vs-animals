function Hamster() {
  const el =  document.querySelector ("#hamster_wrapper")
  const humsterRunEl = el.querySelector("#hamster_run")
  let x= 0;
  let y= 0;
  const size = 50;
  const step = 10;

  const scene = {
    width: 1500,
    height: 700,
  }

  el.style.width= size + "px"
  el.style.height= size + "px"
  
  this.direction="left"

  const me = this;
  this.render= function(){
      el.style.left= x + "px"
      el.style.top= y + "px"
  }

 

  this.sit = function () {
    el.setAttribute("data-mode", "sitting");
  }

  this.run = function ( ) {
    el.setAttribute("data-mode","running" )
  }

  this.chew = function ( ) {
    el.setAttribute("data-mode","chewing" )
  }

  this.dig = function ( ) {
    el.setAttribute("data-mode","digging" )
  }

  this.distracted = function ( ) {
    el.setAttribute("data-mode","distracted" )
  }


  this.goUp = function (){
      this.run();
      this.direction="top";
      humsterRunEl.style.transform="rotate(90deg)"
      if (y-step < 0){
        return false;
      }
      y=y-step
  }

  this.goDown = function (){
    this.run();
    this.direction="down";
    humsterRunEl.style.transform="rotate(-90deg)"
    if (y+step+size > scene.height){
      return false;
    }
    y=y+step
  }

  this.goRight = function (){
    this.run();
    this.direction="right";
    humsterRunEl.style.transform="scale(-1,1)"
    if (x+step+size > scene.width){
      return false;
    }
    x=x+step
  }

  this.goLeft = function (){
    this.run();
    this.direction="left";
    humsterRunEl.style.transform="none"
    if (x-step < 0){
      return false;
    }

    x=x-step;
  }

  setInterval(function(){
    me.render();
  },100)



}

const hamster = new Hamster();

//hamster.sit();
//hamster.run();
//hamster.goUp();
//hamster.goDown();
// hamster.goRight();
//hamster.goLeft();
//hamster.chew(); 
//hamster.dig();
//hamster.distracted();