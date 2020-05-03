/* eslint-disable */

// PLANNED FEATURES
///////////////////

/* 
 *Students should have ongoing cost of salary
 *Unlucky events take away money
 *day counter should be used as golf-like score

*/

//INSTANTIATIONS && DEFINITIONS
///////////////////////////////
let tool = [];
let dollars = 0;
let days = 1;
let messages = [];
let storeStock = [
  {
    toolName: 'rusty scissors',
    earning: 5,
    cost: 11,
    overHead: 0
  },
  {
    toolName: 'scissors',
    earning: 10,
    cost: 60,
    overHead: 0
  },
  {
    toolName: 'push lawnmower',
    earning: 15,
    cost: 100,
    overHead: 0
  },
  {
    toolName: 'battery lawnmower',
    earning: 25,
    cost: 250,
    overHead: 3
  },
  {
    toolName: 'riding mower',
    earning: 40,
    cost: 400,
    overHead:10
  },
  {  
    toolName: 'team of students',
    earning: 200,
    cost: 500,
    overHead: 85
}
];

const clearMessages = () => {
  let clearContainer = document.getElementById('mssgDiv');
  while (clearContainer.hasChildNodes()){
    clearContainer.removeChild(clearContainer.firstChild);
  }
}
const pushMessage = (mssg) => {
  clearMessages();
  messages.push(mssg);
  if (messages.length > 3){
    messages.shift();
  }
  let outPutDiv = document.getElementById('mssgDiv');
  for (m in messages){
    let messageLine = document.createElement("p");
    messageLine.innerHTML = messages[m];
    outPutDiv.appendChild(messageLine);
  }
}

const startGame = () => {
  days = 1;
  tool = [];
  tool.push(
    {  toolName: 'teeth', earning: 1, overHead: 0 });
  dollars = 10;
  pushMessage(`Day ${days}: You currently have $${dollars}, you can use your ${getCurrentTool()} to mow lawns `);
}

const alertStatus = () => {
  pushMessage(`You currently have $${dollars}, you're using your ${getCurrentTool()} to mow lawns `);
}

const getCurrentTool = () => {
  return tool[0]['toolName'];
}

const checkWin = () => {
  if (dollars >= 50 && getCurrentTool() == 'team of students'){
    mowButton.disabled = true;
    checkButton.disabled= true;
    pushMessage(`You win! Your final score was $${dollars} in ${days} days`);
  };
}

const mowLawns = () => {
  let rOP = tool[0]['earning']-tool[0]['overHead'];
  dollars = dollars += rOP;
  days = days += 1;
  pushMessage(`Day ${days}: You earned $${rOP}`);
  checkWin();
}

const buyNewTool = () => {
  if (storeStock.length == 0 && getCurrentTool() == 'team of students'){
    alert("Hi there, you've reached Bob's Hardware. Some schmuck cleaned out our inventory, so we're on vacation! See ya!");
  } else if (storeStock[0]['toolName']){
    let buyTool = prompt(`Thanks for calling Bob's Hardware! I have ${storeStock[0]['toolName']} here on deal, only $${storeStock[0]['cost']}! Would you like to buy the ${storeStock[0]['toolName']}? y/n`);
    if (buyTool == 'y' && dollars >= storeStock[0]['cost']){
      dollars = dollars - storeStock[0]['cost'];
      let newTool = storeStock.shift(0, 1);
      tool.unshift(newTool);
      pushMessage(`You're now mowing with your ${getCurrentTool()}`);
      checkWin();
    } else if (buyTool == 'y' && dollars < storeStock[0]['cost']){
      alert("Sorry, you don't have enough money. Call me when you've got more cash!");
    } else if (buyTool == 'n'){
      alert("Alright then, have a great day!");
    } else if (buyTool !== 'y' && buyTool !== 'n'){
      alert("Dang crank calls! *click*");
    }
  }
}

//DOM && INTERACTIVITY
////////////////////////
let mowButton = document.getElementById("mowBttn");
let checkButton = document.getElementById("chkBttn");
let buyButton= document.getElementById("buyBttn");
let newGame = document.getElementById("newGame");

mowButton.addEventListener('click', function() {
  mowLawns();
});
checkButton.addEventListener('click', function() {
  alertStatus();
});
buyButton.addEventListener('click', function() {
  buyNewTool();
});
newGame.addEventListener('click', function(){
  startGame();
});


startGame();

