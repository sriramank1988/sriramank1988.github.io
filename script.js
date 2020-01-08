var playerTurn = document.querySelector('body h3 span').textContent;
var playerTurnDom = document.querySelector('.palyerTurn')
var winMessage = document.querySelector('.winMessage')
var resetBtn = document.querySelector('.resetBtn');
var allBoxes = document.querySelectorAll('.box');
var counter = 0;
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
                event.target.style.backgroundColor = 'mistyrose';
                playerTurn = 'X';
                document.querySelector('body h3 span').textContent = 'X';
                counter++;
            }
            if(counter === 9){
                winMessage.textContent = 'Its a Tie mate!!!';
                winMessage.style.display = 'block';
                playerTurnDom.style.display = 'none';
                counter = 0;
            }
        }
    })
})

var winner = function(num1,num2,num3,str){ //It expects the winning positions and the player marker
    allBoxes[num1].style.backgroundColor = 'green';
    allBoxes[num2].style.backgroundColor = 'green';
    allBoxes[num3].style.backgroundColor = 'green';
    winMessage.textContent = 'Winner is '+str+'!!!';
    winMessage.style.display = 'block';
    playerTurnDom.style.display = 'none';


}
var isWinningCombo = function(num1,num2,num3){ //checks a winning combo is found and returns a boolean
    return (allBoxes[num1].textContent === allBoxes[num2].textContent && 
        allBoxes[num2].textContent === allBoxes[num3].textContent && 
        allBoxes[num3].textContent !== '')
}
var reset = function(){
    allBoxes.forEach(function(item){
            item.textContent = '';
            item.style.backgroundColor = 'white';
    })
    playerTurnDom.style.display = 'block';
    winMessage.style.display = 'none';
    counter = 0;
    playerTurn = 'X';
    document.querySelector('body h3 span').textContent = 'X';
}

addEventListener('click',function(){
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
    }
})
resetBtn.addEventListener('click',reset);