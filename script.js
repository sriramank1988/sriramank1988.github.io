var playerTurn = document.querySelector('body h3 span').textContent;
var allBoxes = document.querySelectorAll('.box');
var counter = 0;
allBoxes.forEach( function(item){
    item.addEventListener('click',function(event){
        if(event.target.textContent === "" && document.querySelector('body h3 span').textContent != null){ //Ensure Text content is Empty and winner not found
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
                document.querySelector('body h3').textContent = 'Its a Tie mate!!!';
            }
        }
    })
})

var winner = function(num1,num2,num3,str){ //It expects the winning positions and the player marker
    allBoxes[num1].style.backgroundColor = 'green';
    allBoxes[num2].style.backgroundColor = 'green';
    allBoxes[num3].style.backgroundColor = 'green';
    document.querySelector('body h3').textContent = 'Winner is '+str+'!!!';

}
addEventListener('click',function(){
    if(allBoxes[0].textContent === allBoxes[1].textContent && 
        allBoxes[1].textContent === allBoxes[2].textContent && 
        allBoxes[0].textContent !== ''){
        winner(0,1,2,allBoxes[0].textContent);
    }else if((allBoxes[3].textContent === allBoxes[4].textContent && 
        allBoxes[4].textContent === allBoxes[5].textContent && 
        allBoxes[5].textContent !== '')){
            winner(3,4,5,allBoxes[3].textContent);
    }else if((allBoxes[6].textContent === allBoxes[7].textContent && 
        allBoxes[7].textContent === allBoxes[8].textContent && 
        allBoxes[8].textContent !== '')){
            winner(6,7,8,allBoxes[6].textContent);
    }else if((allBoxes[0].textContent === allBoxes[3].textContent && 
        allBoxes[3].textContent === allBoxes[6].textContent && 
        allBoxes[6].textContent !== '')){
            winner(0,3,6,allBoxes[3].textContent);
    }else if((allBoxes[1].textContent === allBoxes[4].textContent && 
        allBoxes[4].textContent === allBoxes[7].textContent && 
        allBoxes[7].textContent !== '')){
            winner(1,4,7,allBoxes[7].textContent);
    }else if((allBoxes[2].textContent === allBoxes[5].textContent && 
        allBoxes[5].textContent === allBoxes[8].textContent && 
        allBoxes[8].textContent !== '')){
            winner(2,5,8,allBoxes[5].textContent);
    }else if((allBoxes[0].textContent === allBoxes[4].textContent && 
        allBoxes[4].textContent === allBoxes[8].textContent && 
        allBoxes[8].textContent !== '')){
            winner(0,4,8,allBoxes[8].textContent);
    }else if((allBoxes[2].textContent === allBoxes[4].textContent && 
        allBoxes[4].textContent === allBoxes[6].textContent && 
        allBoxes[6].textContent !== '')){
            winner(2,4,6,allBoxes[6].textContent);
    }
})