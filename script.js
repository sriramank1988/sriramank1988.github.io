var playerTurn = document.querySelector('body h3 span').textContent;
var playerTurnDom = document.querySelector('.playerTurn')
var winMessage = document.querySelector('.winMessage')
var resetBtn = document.querySelector('.resetBtn');
var goHomeBtn = document.querySelector('.goHomeBtn');
var scoreX = 0, scoreO = 0, counter = 0, easyCount = 0;
var allBoxes = document.querySelectorAll('.box');
var twoPlayer = document.querySelector('.twoPlayers');
var easyMode = document.querySelector('.youvsnoob');
var difficultMode = document.querySelector('.youvsme');
var startScreen = document.querySelector('.startScreen');
var gameDom = document.querySelector('.game');
var availableBox = [[1,1,1],[1,1,1],[1,1,1]];
var timerId = null;

var winner = function(num1,num2,num3,str){ //It expects the winning positions and the player marker
    allBoxes[num1].style.backgroundColor = 'green';
    allBoxes[num2].style.backgroundColor = 'green';
    allBoxes[num3].style.backgroundColor = 'green';
    winMessage.textContent = 'Winner is '+str+'!!!';
    winMessage.style.display = 'block';
    playerTurnDom.style.display = 'none';
    if(playerTurnDom.style.display == 'none'){
        if(str === 'X'){
            scoreX++;
            document.querySelector('.xScore span').textContent = scoreX;
        }else{
            scoreO++;
            document.querySelector('.oScore span').textContent = scoreO;
        }
    }
}
var isWinningCombo = function(num1,num2,num3){ //checks a winning combo is found and returns a boolean
    
    return (allBoxes[num1].textContent === allBoxes[num2].textContent && 
        allBoxes[num2].textContent === allBoxes[num3].textContent && 
        allBoxes[num3].textContent !== '')        
}
var checkWin = function(){  
    if(isWinningCombo(0,1,2)){
        winner(0,1,2,allBoxes[0].textContent);
    }else if(isWinningCombo(3,4,5)){
            winner(3,4,5,allBoxes[3].textContent);
    }else if(isWinningCombo(6,7,8)){
            winner(6,7,8,allBoxes[6].textContent);
    }else if(isWinningCombo(0,3,6)){
            winner(0,3,6,allBoxes[3].textContent);
    }else if(isWinningCombo(1,4,7)){
            winner(1,4,7,allBoxes[7].textContent);
    }else if(isWinningCombo(2,5,8)){
            winner(2,5,8,allBoxes[5].textContent);
    }else if(isWinningCombo(0,4,8)){
            winner(0,4,8,allBoxes[8].textContent);
    }else if(isWinningCombo(2,4,6)){
            winner(2,4,6,allBoxes[6].textContent);
    }else if(counter === 9 || easyCount  === 5){
        winMessage.textContent = 'Its a Tie mate!!!';
        winMessage.style.display = 'block';
        playerTurnDom.style.display = 'none';
        counter = 0;
    }
}
resetBtn.addEventListener('click',function(){
    allBoxes.forEach(function(item){
            item.textContent = '';
            item.style.backgroundColor = 'white';
    })
    playerTurnDom.style.display = 'block';
    winMessage.style.display = 'none';
    counter = 0;
    playerTurn = 'X';
    document.querySelector('body h3 span').textContent = 'X';
    availableBox = [[1,1,1],[1,1,1],[1,1,1]];
    easyCount = 0
})
goHomeBtn.addEventListener('click',function(){
    location.reload();
})
var loadTwoPlayer = function(){
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && playerTurnDom.style.display != 'none'){ //Ensure Text content is Empty and winner not found
                if(playerTurn === 'X'){
                    event.target.textContent = playerTurn;
                    event.target.style.backgroundColor = 'mistyrose';
                    playerTurn = 'O';
                    document.querySelector('body h3 span').textContent = 'O';
                    counter++;
                }
                else{
                    event.target.textContent = playerTurn;
                    event.target.style.backgroundColor = 'lightblue';
                    playerTurn = 'X';
                    document.querySelector('body h3 span').textContent = 'X';
                    counter++;
                }
                checkWin();            
            }
        })
    })
}
twoPlayer.addEventListener('click',function(event){
    startScreen.style.display = 'none';
    gameDom.style.display = 'block';
    loadTwoPlayer();
})
var pickEasy = function(){
var randRow = Math.floor(Math.random()*availableBox.length);
var randCol = Math.floor(Math.random()*availableBox.length);
if(availableBox[randCol][randRow] == "1"){
    document.querySelector("[data-row=\""+ randCol + "\"][data-col=\""+ randRow + "\"]").textContent = 'O';
    document.querySelector("[data-row=\""+ randCol + "\"][data-col=\""+ randRow + "\"]").style.backgroundColor = 'lightblue';
    availableBox[randCol][randRow] = 0;
    console.log(easyCount);
    document.querySelector('body h3 span').textContent = 'X';
    checkWin();

}else{
    if(easyCount < 5){
    pickEasy();
    }
}
clearInterval = timerId;
timerId = null;
}
var loadEasyMode = function(){
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && playerTurnDom.style.display != 'none' && timerId == null){ //Ensure Text content is Empty and winner not found
                var col = Number(event.target.getAttribute('data-col'));
                var row = Number(event.target.getAttribute('data-row'));
                availableBox[row][col] = 0;
                event.target.textContent = playerTurn;
                event.target.style.backgroundColor = 'mistyrose';
                document.querySelector('body h3 span').textContent = 'O';
                checkWin();
                if(playerTurnDom.style.display != 'none'){
                    timerId = setTimeout(pickEasy, easyCount*1000);                    
                    easyCount++;

                }
            }
        })
    })
}
easyMode.addEventListener('click',function(event){
    startScreen.style.display = 'none';
    gameDom.style.display = 'block';
    loadEasyMode();
})
var canIWin = function(){

    return false;
}
var loadDifficultMode = function(){
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && playerTurnDom.style.display != 'none'){ //Ensure Text content is Empty and winner not found
                var col = Number(event.target.getAttribute('data-col'));
                var row = Number(event.target.getAttribute('data-row'));
                availableBox[row][col] = 0;
                event.target.textContent = playerTurn;
                event.target.style.backgroundColor = 'mistyrose';
                checkWin();
                if(playerTurnDom.style.display != 'none'){

                    if(canIWin()){

                    }else{
                        pickEasy();
                    }
                    easyCount++;
                    checkWin();
                }
            }
        })
    })
}
difficultMode.addEventListener('click',function(event){
    startScreen.style.display = 'none';
    gameDom.style.display = 'block';
    loadDifficultMode();
})
