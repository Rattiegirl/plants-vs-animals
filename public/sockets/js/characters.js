
  
  const hamster= [{
    type: 'animal',
    name: 'hamster_1',
    command: "goTo",
    params: {x:0,y:0},
    
  }, {
    type: 'animal',
    name: 'hamster_1',
    command: "chew",
    params: {},
    
  },{
    type: 'animal',
    name: 'hamster_1',
    command: "dig",
    params: {},
    
  },{
    type: 'animal',
    name: 'hamster_1',
    command: "sit",
    params: {},
    
  }]
  
  const parakeet_blue=[{
    type: 'animal',
    name: 'parakeet_blue',
    command: "goTo",
    params: {x:0,y:0},
    
  },{
    type: 'animal',
    name: 'parakeet_blue',
    command: "carry",
    params: {target:"hamster_1"},
    
  },{
    type: 'animal',
    name: 'parakeet_blue',
    command: "dropoff",
    params: {},
    
  }]
  const rose_red=[{
    type: 'plant',
    name: 'rose_red',
    command: "distract",
    params: {},
    
  },{
    type: 'plant',
    name: 'rose_red',
    command: "attack",
    params: {target:"hamster_1"},
    
  },{
    type: 'plant',
    name: 'rose_red',
    command: "letGo",
    params: {target:"hamster_1"},
  },{
    type: 'plant',
    name: 'rose_red',
    command: "spike",
    params: {x:0, y:0},
    
  }]
 const steps=[{
   text: "place wall, (150,400), choose wall, click on map"

 },{
  text: "place hamster, (50,50), choose hamster, click on map"

},{
  text: "place bird, (400,400), choose bird, click on map"

},{
  text: "bird goTo, (50,50), click on bird, press 'carry' " 

},{
  text: "bird carry hamster, click on hamster"

},{
  text: "bird goTo, (200,400), click on map"

},{
  text: "bird dropoff hamster, press 'drop' "

},{
  text: "hamster goTo (500, 500), click on hamster, click on map"       

}] 

const roseSteps=[{
  text: "place rose, (300,400), select rose, click on map"
},{

  text: "place rose, (200, 400), select rose, click on map"
},{

  text: "place rose, (100, 400), select rose, click on map"
},{

  text: "place hamster, (50, 50), select hamster, click on map"
},{

  text: "hamster run"
},{

  text: "if hamster 10px from rose, click on rose, select attack mode"
},{

  text: "hamster captured"
}]
  // {
  //   type: 'plant',
  //   name: 'rose_red',
  //   command: "distract, attack",
  //   params: (x,y),
    
  // }

  // {
  //   type: 'object',
  //   name: 'wall_1',
  //   command: "place",
  //   params: (x,y),
    
  // }
  