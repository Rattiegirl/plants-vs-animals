const characters = [
    {
      title: "Робот",
      value: "robot",
      items: {
        body: {count: 10},
        face: {count: 10},
        eyes: {count: 10},
        mouth: {count: 10},
        accessory: {count: 10},
      },
    },
    {
        title:"Хомяки",
        value: "hamster",
        items:{
            body:{count:3},
            armor:{count:2},
            belt:{count:3},
            hat:{count:1}
        }
    },
    {
      title:"Розы",
      value: "rose",
      items:{
        pose:{count:3},
        stem:{count:3},
        flower:{count:3}, 
        thorns:{count:3},
      },
    },
    {
      title: "Утёнок",
     value: "duck",
     items:{
      mohawk:{count:3},
      tail:{count:3},
      body:{count:3}, 
      wings:{count:3},
     
      },

    },
   {
      title: "Зелёный Попугай",
     value: "Green Parrot",
     items:{
      body:{count:3},
      tail:{count:3},
      wings:{count:3},
     
      },
    },
  ];
  
  const getCharacterInputsSettings = (characterValue) => {
    const character = characters.find((item) => item.value === characterValue);
    const inputGroups = []; // input groups
    let index = 0;
    for (let title in character.items) {
      index += 1;
      const inputs = []; // inputs
      for (let i = 1; i <= character.items[title].count; i += 1) {
        const fileName = title + "-" + (i + "").padStart(2, "0") + ".svg";
        inputs.push({
          title: fileName,
          value: fileName,
        });
      }
  
      inputGroups.push({
        title,
        inputs,
        index,
      });
    }
    return inputGroups;
  };