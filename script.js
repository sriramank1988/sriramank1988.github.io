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
var availableBox = [[1,1,1],[1,1,1],[1,1,1]];
var availBoxToStr = availableBox.toString();
var timerId = null;
var scoreX = 0, scoreO = 0, palyerMoveCounter = 0, computerMoveCounter = 0;
var winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
var avaiableWinCombos = winCombos;
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

var displayWinner = function(num1,num2,num3,str){ //It expects the winning positions and the player marker and prints it to user
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
var isSame = function(num1,num2,num3){ //checks a winning combo if found and returns a boolean    
    return (allBoxes[num1].textContent === allBoxes[num2].textContent && 
        allBoxes[num2].textContent === allBoxes[num3].textContent && 
        allBoxes[num3].textContent !== '')        
}
var checkWinAndDisplay = function(){  //in the web dom checks if any player marker are placed in winning position
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
// the basic part
var loadTwoPlayer = function(){ //man vs man code, no logic involved, just change dom accordingly.
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && turnInfoDOM.style.display != 'none'){ //Ensure Text content is Empty and winner not found
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


var pickEasy = function(){ //picks a random postion which is still avaiable and computer makes a move.
    var randRow = Math.floor(Math.random()*availableBox.length);
    var randCol = Math.floor(Math.random()*availableBox.length);
    if(availableBox[randCol][randRow] == "1"){
        document.querySelector("[data-row=\""+ randCol + "\"][data-col=\""+ randRow + "\"]").textContent = 'O';
        document.querySelector("[data-row=\""+ randCol + "\"][data-col=\""+ randRow + "\"]").style.backgroundColor = 'lightblue';
        availableBox[randCol][randRow] = 'O';
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
    var col = Number(event.target.getAttribute('data-col'));
    var row = Number(event.target.getAttribute('data-row'));
    availableBox[row][col] = 'X';
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
            if(event.target.textContent === "" && turnInfoDOM.style.display != 'none' && timerId == null){ //Ensure Text content is Empty and winner not found
                playerMoves(event);
                checkWinAndDisplay();
                if(winMessage.style.display != 'block'){
                    timerId = setTimeout(pickEasy, computerMoveCounter*1000);                    
                }
            }
        })
    })
}

// The hard part - Work in progress
var storage = [];
var availIndexArray = [];
var fillFunc = function(){
    oFilled = [];
    xFilled = [];
    availBoxToStr = availableBox.toString().split(",");
    for(var i = 0; i < availBoxToStr.length; i++){ //fills all the position filled
        if(availBoxToStr[i] === "X"){
            xFilled.push(i);
        }
        if(availBoxToStr[i] === 'O'){
            oFilled.push(i);
        }
    }
    console.log("XFilled : " + xFilled)
    console.log("OFilled : " + oFilled)
}
var whoCanWin = function(){
    // console.log("Owin called")
    // for(var i = 0; i <)
    // var palyerMoveCounter = 0 ;    
}
var loadDifficultMode = function(){
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && turnInfoDOM.style.display != 'none'){ //Ensure Text content is Empty and winner not found
                playerMoves(event);
                checkWinAndDisplay();
                whoCanWin();
                if(winMessage.style.display != 'block'){
                    pickEasy();                    
                    console.log("Easy count : " + computerMoveCounter);
                    availBoxToStr = availableBox.toString().split(",");
                    console.log(availBoxToStr);
                }
                fillFunc();
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

twoPlayer.addEventListener('click',function(event){//in home screen loads man vs man code and hides the splash screen
    hideMenuAndLoadGameDom();
    loadTwoPlayer();
})

resetBtn.addEventListener('click',function(){ // reset button event listener
    allBoxes.forEach(function(item){
            item.textContent = '';
            item.style.backgroundColor = '#bbd0e5';
    })
    turnInfoDOM.style.display = 'block';
    winMessage.style.display = 'none';
    palyerMoveCounter = 0;
    playerMarker = 'X';
    document.querySelector('body h3 span').textContent = 'X';
    availableBox = [[1,1,1],[1,1,1],[1,1,1]];
    computerMoveCounter = 0;
})
goHomeBtn.addEventListener('click',function(){ //Go home event listener button.
    location.reload();
})


// findAvailWinCombo = function(){
//     fillFunc();
//     for(var i = 0; i < filled.length; i++){
//             for (k = 0; k < 3 ; k++){
//                 if(filled[i] == avaiableWinCombos[j][k]){
//                     storage.push(j);
//                 }
//             }
//         }
//     }
//     console.log(" J value :" + storage);

//     console.log("Avail win combo" + avaiableWinCombos);
//}
//var isWinPossible = function(char){    

    // console.log("Combo " + storage)
    // for(var i = 0; i < storage.length; i++ ){
    //     console
    // }
    // for(var i = 0; i < storage.length; i++){
    //     for(j = i+1; j< storage.length; j++){
    //         if(storage[i] === storage[j]){
    //             console.log("Better pick : " + winCombos[storage[j]]);
    //             console.log("Space Available : " + availBoxToStr);
    //             for( var i = 0; i < availBoxToStr.length; i++){
    //                 if(availBoxToStr[i] == "1"){
    //                     availIndexArray.push(i);
    //                 }   
    //             } 
    //         }
    //     }
    // }
    // console.log("avail index " + availIndexArray);
  //  return false;
//}
