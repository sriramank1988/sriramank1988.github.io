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

var computerMove = function(index){
    document.querySelector("[data-index=\""+ index + "\"]").textContent = 'O';
    document.querySelector("[data-index=\""+ index + "\"]").style.backgroundColor = 'lightblue';
    availableBox[index] = "O";
    oFilled.push(index);
    availableIndexPosition.splice(availableIndexPosition.indexOf(index),1);
    turnInfoDOM.style.display = 'block';
    compMsg.style.display = 'none';
    checkWinAndDisplay();
}

var pickEasy = function(){
    var randIndex = Math.floor(Math.random()*9);
    if(availableBox[randIndex] == "1"){
        computerMove(randIndex)
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

var availableWinCombos = function(markerFilledArray){
    let avaialbleCombo = []
    let availableIndexAndMarkerFilled = availableIndexPosition.concat(markerFilledArray)
    winCombos.forEach((combo)=>{
        let count = 0
        availableIndexAndMarkerFilled.forEach((item) =>{
            if(combo.includes(item)){
                count++;
                if(count === 3)
                {
                    avaialbleCombo.push(combo)
                }
            }
        })
    })
    return avaialbleCombo.length == 0 ? null : avaialbleCombo;
}

var nextPossibleWinCombo = function(markerFilledArray){
    let nextWinCombos = []
    winCombos.forEach((combo)=>{
        let count = 0
        markerFilledArray.forEach((item) =>{
            if(combo.includes(item)){
                count++;
                if(count === 2)
                {
                    nextWinCombos.push(combo)
                }
            }
        })
    })
    let winposition = []
    if(nextWinCombos.length !== 0){
        nextWinCombos.forEach((combo) =>{
            let returnValue = combo.filter(item => availableIndexPosition.includes(item))
            if(returnValue.length !== 0){
                winposition.push(returnValue)
            }
        })
    } 
    return winposition.length == 0 ? false : winposition[0];
}

var isCentreSpotFree = function(){
    return availableIndexPosition.includes(4)

}

var getMeTheBestIndexPosition = function(){

    let winIndex = [], preventIndex = []
    winIndex = nextPossibleWinCombo(oFilled)
    preventIndex = nextPossibleWinCombo(xFilled)
    if(winIndex){
        return winIndex[0];
    }else if(preventIndex){
        return preventIndex[0];
    }else if(isCentreSpotFree()){
        return 4;
    }else{
        return false;
    }
}

var loadDifficultMode = function(){
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && turnInfoDOM.style.display != 'none'){ 
                playerMoves(event);
                checkWinAndDisplay();
                if(winMessage.style.display != 'block'){
                    let bestIndex = getMeTheBestIndexPosition()
                    if(bestIndex){
                        computerMove(bestIndex);
                    }
                    else{
                        pickEasy();  
                    }                   
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
    availableIndexPosition = [0,1,2,3,4,5,6,7,8];
    oFilled = [];
    xFilled = [];
    
})

goHomeBtn.addEventListener('click',function(){ 
    location.reload();
})