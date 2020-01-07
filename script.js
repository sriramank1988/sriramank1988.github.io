var playerTurn = document.querySelector('body h3 span').textContent;
var allBoxes = document.querySelectorAll('.box');
var counter = 0;
allBoxes.forEach( function(item){
    item.addEventListener('click',function(event){
        if(event.target.textContent === "" && document.querySelector('body h3 span').textContent != null){ //Ensure Text content is Empty and winner not found
            if(playerTurn === 'X'){
                event.target.textContent = playerTurn;
                event.target.style.backgroundColor = 'yellow';
                playerTurn = 'O';
                document.querySelector('body h3 span').textContent = 'O';
                counter++;
            }
            else{
                event.target.textContent = playerTurn;
                event.target.style.backgroundColor = 'yellow';
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
addEventListener('click',function(){
    if((allBoxes[0].textContent === allBoxes[1].textContent && allBoxes[1].textContent === allBoxes[2].textContent && allBoxes[0].textContent === 'X') ||
    (allBoxes[3].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[5].textContent && allBoxes[5].textContent === 'X') ||
    (allBoxes[6].textContent === allBoxes[7].textContent && allBoxes[7].textContent === allBoxes[8].textContent && allBoxes[8].textContent === 'X') ||
    (allBoxes[0].textContent === allBoxes[3].textContent && allBoxes[3].textContent === allBoxes[6].textContent && allBoxes[6].textContent === 'X') ||
    (allBoxes[1].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[7].textContent && allBoxes[7].textContent === 'X') ||
    (allBoxes[2].textContent === allBoxes[5].textContent && allBoxes[5].textContent === allBoxes[8].textContent && allBoxes[8].textContent === 'X') ||
    (allBoxes[0].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[8].textContent && allBoxes[8].textContent === 'X') ||
    (allBoxes[2].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[6].textContent && allBoxes[6].textContent === 'X')
    ){
        document.querySelector('body h3').textContent = 'Winner is X!!!';
    }else if((allBoxes[0].textContent === allBoxes[1].textContent && allBoxes[1].textContent === allBoxes[2].textContent && allBoxes[0].textContent === 'O') ||
    (allBoxes[3].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[5].textContent && allBoxes[5].textContent === 'O') ||
    (allBoxes[6].textContent === allBoxes[7].textContent && allBoxes[7].textContent === allBoxes[8].textContent && allBoxes[8].textContent === 'O') ||
    (allBoxes[0].textContent === allBoxes[3].textContent && allBoxes[3].textContent === allBoxes[6].textContent && allBoxes[6].textContent === 'O') ||
    (allBoxes[1].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[7].textContent && allBoxes[7].textContent === 'O') ||
    (allBoxes[2].textContent === allBoxes[5].textContent && allBoxes[5].textContent === allBoxes[8].textContent && allBoxes[8].textContent === 'O') ||
    (allBoxes[0].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[8].textContent && allBoxes[8].textContent === 'O') ||
    (allBoxes[2].textContent === allBoxes[4].textContent && allBoxes[4].textContent === allBoxes[6].textContent && allBoxes[6].textContent === 'O')
    ){
        document.querySelector('body h3').textContent = 'Winner is O!!!';
    }
})
