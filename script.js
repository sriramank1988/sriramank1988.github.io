var playerTurn = document.querySelector('body h3 span').textContent;
var playerTurnDom = document.querySelector('.playerTurn')
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
var scoreX = 0, scoreO = 0, counter = 0, easyCount = 0;
var winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
var avaiableWinCombos = winCombos;
var oFilled = [];
var xFilled = [];

var winner = function(num1,num2,num3,str){ //It expects the winning positions and the player marker and prints it to user
    allBoxes[num1].style.backgroundColor = 'green';
    allBoxes[num2].style.backgroundColor = 'green';
    allBoxes[num3].style.backgroundColor = 'green';
    winMessage.textContent = 'Winner is '+str+'!!!';
    winMessage.style.display = 'block';
    playerTurnDom.style.display = 'none';
    compMsg.style.display = 'none';
    document.querySelector('button').disabled = false;
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
var isWinningCombo = function(num1,num2,num3){ //checks a winning combo if found and returns a boolean    
    return (allBoxes[num1].textContent === allBoxes[num2].textContent && 
        allBoxes[num2].textContent === allBoxes[num3].textContent && 
        allBoxes[num3].textContent !== '')        
}
var checkWin = function(){  //in the web dom checks if any player marker are placed in winning position
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
        compMsg.style.display = 'none';
        document.querySelector('button').disabled = false;
        counter = 0;
    }
}
resetBtn.addEventListener('click',function(){ // reset button event listener
    allBoxes.forEach(function(item){
            item.textContent = '';
            item.style.backgroundColor = '#bbd0e5';
    })
    playerTurnDom.style.display = 'block';
    winMessage.style.display = 'none';
    counter = 0;
    playerTurn = 'X';
    document.querySelector('body h3 span').textContent = 'X';
    availableBox = [[1,1,1],[1,1,1],[1,1,1]];
    easyCount = 0;
})
goHomeBtn.addEventListener('click',function(){ //Go home event listener button.
    location.reload();
})
// the basic part
var loadTwoPlayer = function(){ //man vs man code, no logic involved, just change dom accordingly.
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
twoPlayer.addEventListener('click',function(event){//in home screen loads man vs man code and hides the splash screen
    startScreen.style.display = 'none';
    gameDom.style.display = 'block';
    loadTwoPlayer();
})

// The easy part
var pickEasy = function(){ //picks a random postion which is still avaiable and computer makes a move.
    var randRow = Math.floor(Math.random()*availableBox.length);
    var randCol = Math.floor(Math.random()*availableBox.length);
    if(availableBox[randCol][randRow] == "1"){
        document.querySelector("[data-row=\""+ randCol + "\"][data-col=\""+ randRow + "\"]").textContent = 'O';
        document.querySelector("[data-row=\""+ randCol + "\"][data-col=\""+ randRow + "\"]").style.backgroundColor = 'lightblue';
        availableBox[randCol][randRow] = 'O';
        playerTurnDom.style.display = 'block';
        compMsg.style.display = 'none';
        checkWin();
    }else{
        if(easyCount < 5){
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
    event.target.textContent = playerTurn;
    event.target.style.backgroundColor = 'mistyrose';
    easyCount++;
    playerTurnDom.style.display = 'none';
    compMsg.style.display = 'block';
    document.querySelector('button').disabled = true;
                                
}
var loadEasyMode = function(){
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && playerTurnDom.style.display != 'none' && timerId == null){ //Ensure Text content is Empty and winner not found
                playerMoves(event);
                checkWin();
                if(winMessage.style.display != 'block'){
                    timerId = setTimeout(pickEasy, easyCount*1000);                    
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
var canOWin = function(){
    console.log("Owin called")
    var counter = 0 ;    
}
var loadDifficultMode = function(){
    allBoxes.forEach(function(item){
        item.addEventListener('click',function(event){
            if(event.target.textContent === "" && playerTurnDom.style.display != 'none'){ //Ensure Text content is Empty and winner not found
                playerMoves(event);
                checkWin();
                canOWin();
                if(winMessage.style.display != 'block'){
                    pickEasy();                    
                    console.log("Easy count : " + easyCount);
                    availBoxToStr = availableBox.toString().split(",");
                    console.log(availBoxToStr);
                }
                fillFunc();
            }
        })
    })
}
difficultMode.addEventListener('click',function(event){
    startScreen.style.display = 'none';
    gameDom.style.display = 'block';
    loadDifficultMode();
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
