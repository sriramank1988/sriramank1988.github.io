var playerTurn = document.querySelector('body h3 span').textContent;
var allBoxes = document.querySelectorAll('.box');
allBoxes.forEach( function(item){
    item.addEventListener('click',function(event){
        if(event.target.textContent === ""){ //Ensure Text content is Empty
            if(playerTurn === 'X'){
                event.target.textContent = playerTurn;
                playerTurn = 'O';
                document.querySelector('body h3 span').textContent = 'O'
                console.log(playerTurn)                
            }
            else{
                event.target.textContent = playerTurn;
                playerTurn = 'X';
                document.querySelector('body h3 span').textContent = 'X';
                console.log(playerTurn)
            }
        }
    })
})

