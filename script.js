


const GameBoard = (function() {
    //Private

    // Array
   const  GameBoardfields = [{value: ''},{value: ''},{value: ''},{value: ''},{value: ''},{value: ''},{value: ''},{value: ''},{value: ''}];
   let computerChoices = [];

   //to make sure Game is running

   let gameEnded = false;

   // AI
   let gameMode1 = false;
   const aiButton = document.querySelector('.gamemode-1-button')
   aiButton.addEventListener('click', () => {
    gameMode1 = true;
    gameMode2 = false;
    chooseGameMode()
   })

   // 2 Player
   let gameMode2 = false;
   twoPlayerButton = document.querySelector('.gamemode-2-button')
   twoPlayerButton.addEventListener('click',() => {  
    gameMode1 = false;
    gameMode2 = true;
    chooseGameMode()
   } )

   // choose gameMode
   const chooseGameMode = function () {
    playGame.resetRounds();
    restartGame();
    GameBoard.callGameBoard();
   }

   // Creates GameBoard with Event listener
    const buildGameBoard =  function () {
        GameBoardfields.forEach(field => {
            const div = document.createElement('div')

            // If you click you place "X" or "O"
            if (gameMode2 == true)
            {
                div.addEventListener('click', clickHandler => {
                    console.log(GameBoardfields)
                if (div.textContent == "" && gameEnded == false){

                    div.textContent = playGame.activePlayer()
                   field.value = div.textContent

                   // Checks if game is won
                   let result = checkWin()
                   if (result != false) {
                    winner = document.createElement('div')
                    winner.classList.add('winner')
                    winner.textContent = result
                    document.body.appendChild(winner)
                    gameEnded = true;
                   }
                   
                }          
            })}

            if (gameMode1 == true) {
                div.addEventListener('click', () => {
                    if(div.textContent == "" && gameEnded == false) {
                        // Player Choice
                        div.textContent = player1.marker
                        field.value = player1.marker

                   let result = checkWin()
                   if (result != false) {
                    winner = document.createElement('div')
                    winner.classList.add('winner')
                    winner.textContent = result
                    document.body.appendChild(winner)
                    gameEnded = true;
                   }

                        // Computer Choice
                        let parentDiv = document.querySelector('.main-container');
                        let childDivs =  parentDiv.querySelectorAll('div')
                       computerPicks = Array.from(childDivs);
                      
                       cell = computerPicks.filter((cells) => cells.textContent == "");
                       if (cell.length > 0) {
                            randomNumber = randomNumfromCell(1, cell.length - 1)
                            console.log(randomNumber)
                            
                            cell[randomNumber].textContent = 'O'

                            console.log(cell)
                            for(i = 0; i < 9 ; i++) {
                                if (childDivs[i].textContent != "") {
                                    GameBoardfields[i].value = childDivs[i].textContent
                                }
                            }
                      }
                   if (gameEnded != true)
                    {
                        result = checkWin()
                        if (result != false) {
                            winner = document.createElement('div')
                            winner.classList.add('winner')
                            winner.textContent = result
                            document.body.appendChild(winner)
                            gameEnded = true;
                    }
                }

                    }
                })
            }


            if 
            document.body.querySelector('.main-container').appendChild(div)
        })
    }

    const restartGame = function () {
        let mainContainer = document.querySelector('.main-container');

        // Check if there are any child elements
        if (mainContainer.hasChildNodes()) {
            //removes Winning Message
             winner = document.querySelector('.winner');
           
             if (winner != null) {
                winner.remove()
             }
            // Loop through and remove all child div elements
            let childDivs = mainContainer.querySelectorAll('div');
            for (let i = 0; i < childDivs.length; i++) {
                let childDiv = childDivs[i];
                mainContainer.removeChild(childDiv);
            }
        }
        
        GameBoardfields.forEach(field => {
            field.value = ""
        })
        gameEnded = false;
        }
 
    const checkWin = function() {
      let field = GameBoardfields
   
      //Rows
     for (let i = 0; i<= 6 ; i += 3)
     {
            if((field[i].value != "") && (field[i].value == field[i+1].value) && (field[i+1].value == field[i+2].value) ) {
            if (field[i].value == "X") {
                return "Player Wins"
            }
            else {
                return "Computer Wins"
            }
        }
    }
    // Columns
    for (let i = 0; i< 3 ; i++)
    {
           if((field[i].value != "") && (field[i].value == field[i+3].value) && (field[i+3].value == field[i+6].value) ) {
           if (field[i].value == "X") {
               return "Player Wins"
           }
           else {
               return "Computer Wins"
           }
       }
   }

    // Diagonals
    if((field[0].value != "") && (field[0].value == field[4].value) && (field[4].value == field[8].value) ) {
        if (field[0].value == "X") {
            return "Player Wins"
        }
        else {
            return "Computer Wins"
        }
    }
    if((field[2].value != "") && (field[2].value == field[4].value) && (field[4].value == field[6].value) ) {
        if (field[2].value == "X") {
            return "Player Wins"
        }
        else {
            return "Computer Wins"
        }
    }

    if  (GameBoardfields.every(field => field.value !== '')) {
        return "Tie";
    }
    else {
        return false
    }
  
}

const randomNumfromCell = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};






    //Public
    return {
        callGameBoard : function() {
            buildGameBoard();
        }
    }
})();



const createPlayer = function (player, marker) {
    return {
        playerRole: player,
        marker : marker
    }
}

const playGame = (function() {
    let player1rounds = 0;
    let player2rounds = 0;

    const resetRounds = function() {
        player1rounds = 0;
        player2rounds = 0;
    }
    

    const activePlayer = function() {
        if (player1rounds <= player2rounds) {
            player1rounds += 1;
            return player1.marker;
        } else {
            player2rounds += 1;
            return player2.marker;
        }
    }


    return {
        activePlayer: activePlayer,
        resetRounds: resetRounds
        
    };
})();

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");