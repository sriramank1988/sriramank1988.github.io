var playerMarker = document.querySelector('body h3 span').textContent;
var turnInfoDOM = document.querySelector('.playerTurn')
var winMessage = document.querySelector('.winMessage')
var resetBtn = document.querySelector('.resetBtn');
var goHomeBtn = document.querySelector('.goHomeBtn');
var allBoxes = document.querySelectorAll('.box');
var twoPlayer = document.querySelector('.twoPlayers');
var easyMode = document.querySelector('.youvsnoob');
var difficultMode = document.querySelector('.youvsme');
var startScreen = document.querySelector('.startScreen');
var gameDom = document.querySelector('.game');
var compMsg = document.querySelector('.compMsg');
var availableBox = [1,1,1,1,1,1,1,1,1];
var availableIndexPosition = [0,1,2,3,4,5,6,7,8];
var timerId = null;
var scoreX = 0, scoreO = 0, palyerMoveCounter = 0, computerMoveCounter = 0;
var winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
var oFilled = [];
var xFilled = [];

var updateScore = function(winningPlayerMarker){
    if(turnInfoDOM.style.display == 'none'){
        if(winningPlayerMarker === 'X'){
            scoreX++;
            document.querySelector('.xScore span').textContent = scoreX;
        }else{
            scoreO++;
            document.querySelector('.oScore span').textContent = scoreO;
        }
    }
}

var displayWinner = function(num1,num2,num3,str){ 
    allBoxes[num1].style.backgroundColor = 'green';
    allBoxes[num2].style.backgroundColor = 'green';
    allBoxes[num3].style.backgroundColor = 'green';
    winMessage.textContent = 'Winner is '+str+'!!!';
    winMessage.style.display = 'block';
    turnInfoDOM.style.display = 'none';
    compMsg.style.display = 'none';
    document.querySelector('button').disabled = false;
    updateScore(str)
}

var isSame = function(num1,num2,num3){     
    return (allBoxes[num1].textContent === allBoxes[num2].textContent && 
        allBoxes[num2].textContent === allBoxes[num3].textContent && 
        allBoxes[num3].textContent !== '')        
}

var checkWinAndDisplay = function(){  
    if(isSame(0,1,2)){
        displayWinner(0,1,2,allBoxes[0].textContent);
    }else if(isSame(3,4,5)){
            displayWinner(3,4,5,allBoxes[3].textContent);
    }else if(isSame(6,7,8)){
            displayWinner(6,7,8,allBoxes[6].textContent);
    }else if(isSame(0,3,6)){
            displayWinner(0,3,6,allBoxes[3].textContent);
    }else if(isSame(1,4,7)){
            displayWinner(1,4,7,allBoxes[7].textContent);
    }else if(isSame(2,5,8)){
            displayWinner(2,5,8,allBoxes[5].textContent);
    }else if(isSame(0,4,8)){
            displayWinner(0,4,8,allBoxes[8].textContent);
    }else if(isSame(2,4,6)){
            displayWinner(2,4,6,allBoxes[6].textContent);
    }else if(palyerMoveCounter === 9 || computerMoveCounter  === 5){
        winMessage.textContent = 'Its a Tie mate!!!';
        winMessage.style.display = 'block';
        turnInfoDOM.style.display = 'none';
        compMsg.style.display = 'none';
        document.querySelector('button').disabled = false;
        palyerMoveCounter = 0;
    }
}

var hideMenuAndLoadGameDom = function(){
    startScreen.style.display = 'none';
    gameDom.style.display = 'block';
}

var loadTwoPlayer = function(){ 
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && turnInfoDOM.style.display != 'none'){ 
                if(playerMarker === 'X'){
                    event.target.textContent = playerMarker;
                    event.target.style.backgroundColor = 'mistyrose';
                    playerMarker = 'O';
                    document.querySelector('body h3 span').textContent = 'O';
                    palyerMoveCounter++;
                }
                else{
                    event.target.textContent = playerMarker;
                    event.target.style.backgroundColor = 'lightblue';
                    playerMarker = 'X';
                    document.querySelector('body h3 span').textContent = 'X';
                    palyerMoveCounter++;
                }
                checkWinAndDisplay();            
            }
        })
    })
}

var pickEasy = function(){
    var randIndex = Math.floor(Math.random()*9);
    if(availableBox[randIndex] == "1"){
        document.querySelector("[data-index=\""+ randIndex + "\"]").textContent = 'O';
        document.querySelector("[data-index=\""+ randIndex + "\"]").style.backgroundColor = 'lightblue';
        availableBox[randIndex] = "O";
        oFilled.push(randIndex);
        availableIndexPosition.splice(availableIndexPosition.indexOf(randIndex),1);
        turnInfoDOM.style.display = 'block';
        compMsg.style.display = 'none';
        checkWinAndDisplay();
    }else{
        if(computerMoveCounter < 5){
        pickEasy();
        }
    }
    clearInterval = timerId;
    timerId = null;
    document.querySelector('button').disabled = false;
}

var playerMoves = function(event){
    var movedIndexPosition = Number(event.target.getAttribute('data-index'));
    availableBox[movedIndexPosition] = 'X';
    xFilled.push(movedIndexPosition);
    availableIndexPosition.splice(availableIndexPosition.indexOf(movedIndexPosition),1);
    event.target.textContent = playerMarker;
    event.target.style.backgroundColor = 'mistyrose';
    computerMoveCounter++;
    turnInfoDOM.style.display = 'none';
    compMsg.style.display = 'block';
    document.querySelector('button').disabled = true;
                                
}

var loadEasyMode = function(){
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && turnInfoDOM.style.display != 'none' && timerId == null){ 
                playerMoves(event);
                checkWinAndDisplay();
                if(winMessage.style.display != 'block'){
                    timerId = setTimeout(pickEasy, computerMoveCounter*1000);                    
                }
            }
        })
    })
}


var whoCanWin = function(){
      
}
var loadDifficultMode = function(){
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && turnInfoDOM.style.display != 'none'){ 
                playerMoves(event);
                checkWinAndDisplay();
                console.log("X filled : " + xFilled)
                console.log("Avaialble spots " + availableBox)
                console.log(availableIndexPosition)
                whoCanWin();
                if(winMessage.style.display != 'block'){
                    pickEasy();                    
                    console.log("O filled : " + oFilled)
                    console.log("Avaialble spots " + availableBox)
                    console.log(availableIndexPosition)
                }
            }
        })
    })
}

difficultMode.addEventListener('click',function(event){
    hideMenuAndLoadGameDom();
    loadDifficultMode();
})

easyMode.addEventListener('click',function(event){
    hideMenuAndLoadGameDom();
    loadEasyMode();
})

twoPlayer.addEventListener('click',function(event){
    hideMenuAndLoadGameDom();
    loadTwoPlayer();
})

resetBtn.addEventListener('click',function(){ 
    allBoxes.forEach(function(item){
        item.textContent = '';
        item.style.backgroundColor = '#bbd0e5';
    })
    turnInfoDOM.style.display = 'block';
    winMessage.style.display = 'none';
    palyerMoveCounter = 0;
    playerMarker = 'X';
    document.querySelector('body h3 span').textContent = 'X';
    availableBox = [1,1,1,1,1,1,1,1,1];
    computerMoveCounter = 0;
})

goHomeBtn.addEventListener('click',function(){ 
    location.reload();
})