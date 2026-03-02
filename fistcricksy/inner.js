let userChoice="";
let batting="";
let innings=1;

let userScore=0;
let compScore=0;
let target=null;

const status=document.getElementById("status");
const buttons=document.getElementById("buttons");

const userHand=document.getElementById("userHand");
const compHand=document.getElementById("computerHand");

const us=document.getElementById("userScore");
const cs=document.getElementById("computerScore");
const ts=document.getElementById("target");

const userLabel=document.getElementById("userLabel");
const compLabel=document.getElementById("compLabel");

showOddEven();

function showOddEven(){
  buttons.innerHTML=`
    <button onclick="pickOddEven('odd')">Odd</button>
    <button onclick="pickOddEven('even')">Even</button>
  `;
  status.innerText="Choose Odd or Even";
}

function pickOddEven(x){
  userChoice=x;
  status.innerText="Pick a number 1-6";
  showNumbers("toss");
}

function showNumbers(type){
  buttons.innerHTML="";
  for(let i=1;i<=6;i++){
    buttons.innerHTML+=`<button onclick="play(${i},'${type}')">${i}</button>`;
  }
}

function play(userNum,type){
  let compNum=Math.floor(Math.random()*6)+1;
  userHand.src=`hand0${userNum}.jpeg`;
  compHand.src=`hand1${compNum}.jpeg`;

  if(type==="toss") toss(userNum,compNum);
  else match(userNum,compNum);
}

function toss(u,c){
  let sum=u+c;
  let odd=sum%2!==0;

  let userWon=(userChoice==="odd"&&odd)||(userChoice==="even"&&!odd);

  if(userWon){
    status.innerText="You won toss. Bat or Ball?";
    buttons.innerHTML=`
      <button onclick="choose('bat')">Bat</button>
      <button onclick="choose('ball')">Ball</button>
    `;
  } else{
    let compChoice=Math.random()<0.5?"bat":"ball";
    batting=compChoice==="bat"?"computer":"user";
    updateIcons();
    status.innerText="Computer won toss and chose to "+compChoice;
    showNumbers("match");
  }
}

function choose(choice){
  batting=choice==="bat"?"user":"computer";
  updateIcons();
  status.innerText=batting==="user"?"You Bat First":"Computer Bats First";
  showNumbers("match");
}

function match(u,c){
  if(innings===1){
    if(batting==="user"){
      if(u===c){
        target=userScore+1;
        ts.innerText=target;
        status.innerText="You OUT! Target "+target;
        innings=2;
        batting="computer";
        updateIcons();
      } else{
        userScore+=u;
        us.innerText=userScore;
      }
    } else{
      if(u===c){
        target=compScore+1;
        ts.innerText=target;
        status.innerText="Computer OUT! Target "+target;
        innings=2;
        batting="user";
        updateIcons();
      } else{
        compScore+=c;
        cs.innerText=compScore;
      }
    }
  } else{
    if(batting==="user"){
      if(u===c){
        endGame();
      } else{
        userScore+=u;
        us.innerText=userScore;
        if(userScore>=target) win("You");
      }
    } else{
      if(u===c){
        endGame();
      } else{
        compScore+=c;
        cs.innerText=compScore;
        if(compScore>=target) win("Computer");
      }
    }
  }
}

function endGame(){
  if(batting==="user"){
    if(userScore>=target) win("You");
    else win("Computer");
  } else{
    if(compScore>=target) win("Computer");
    else win("You");
  }
}

function win(who){
  status.innerText=who+" Wins 🎉";
  buttons.innerHTML="";
}

function updateIcons(){
  if(batting==="user"){
    userLabel.innerHTML="🏏 You";
    compLabel.innerHTML="🥎 Computer";
  } else{
    userLabel.innerHTML="🥎 You";
    compLabel.innerHTML="🏏 Computer";
  }
}

function restartGame(){
  location.reload();
}