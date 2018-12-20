let winner;

window.onload = function() { //window.onload fires later (or at the same time in the worst/failing cases) when images and such are loaded, so if you're using image dimensions for example, you often want to use this instead.
    function whosTurn( turnMsg ) {
        document.getElementById( "messageArea" ).innerHTML = turnMsg;
    }

    const startGame = function() {
        let p1Name = document.getElementById( 'p1namefield' ).value;
        let p2Name = document.getElementById( 'p2namefield' ).value;
        for ( var i = 0; i < boxes.length; i++)  {
            boxes[i].addEventListener('click', function() {
                if ( winner ) {
                    return;
                }
                playGame( this );
                whosTurn( p1Name + " = X <br/>" + p2Name + " = O" ); // This tells you who is up to play.
            });

        }
    }

    let startButton = document.getElementById( 'start' );

    startButton.onclick = function () {
        let p1Name = document.getElementById( 'p1namefield' ).value;
        let p2Name = document.getElementById( 'p2namefield' ).value;
        document.getElementById( 'gameboard' ).style.display = '';
        document.getElementById( 'name-entry' ).style.display = 'none';
        document.getElementById( 'messageArea' ).innerHTML = "X = " + p1Name + " & O = " + p2Name + ".<br/> X goes first - Click a tile to begin!";
        startGame ();
    };


    let boxes = document.getElementsByClassName( 'box' );
    let p1Name = document.getElementById( 'p1namefield' ).value; // Selects the name of player1
    let p2Name = document.getElementById( 'p2namefield' ).value; // Selects the name of player2

};


let playerX = []; // All selection from playerX get populated here
let playerO = []; // All selections from playerO get populated here


let currentPlayer = 0;

let playGame = function( box ) {
    if ( !box.innerHTML ) {
        if ( currentPlayer === 0 ) {
            box.innerHTML = '<img src="img/o.PNG">';
            playerO.push( box.id ); // pushes the ID of the box selected into the playerO array
            checkForWins( playerO );

            currentPlayer = 1;
        } else {
            box.innerHTML = '<img src="img/x.PNG">';
            playerX.push(box.id); // pushes the ID of the box selected in to the playerX array
            checkForWins( playerX );
            currentPlayer = 0;
        }
    }
};

const checkForWins = function(boxes) { // passing through boxes as a parameter
    let winningCombos = [
        ['1', '2', '3'], // Winning horizontally
        ['4', '5', '6'], // Winning horizontally
        ['7', '8', '9'], // Winning horizontally
        ['1', '4', '7'], // Winning vertically
        ['2', '5', '8'], // Winning vertically
        ['3', '6', '9'], // Winning vertically
        ['1', '5', '9'], // Winning diagonally
        ['3', '5', '7'], // Winning diagonally
    ];

    for ( var i = 0; i < winningCombos.length; i++ ) { //  -1 refers to a box that has not yet been played yet by either player.
        let currentWin = winningCombos[i];
        if ( playerX.indexOf(currentWin[0] ) !== -1 &&
            playerX.indexOf(currentWin[1]) !== -1 &&
            playerX.indexOf(currentWin[2]) !== -1) {
            winner = true;
            alert( "X is the Winner!" );
        } else if ( playerO.indexOf(currentWin[0] ) !== -1 &&
            playerO.indexOf( currentWin[1] ) !== -1 &&
            playerO.indexOf( currentWin[2] ) !== -1) {
            winner = true;
            alert( "The Winner is O!" );
        }
    }
        if ( playerX.length + playerO.length === 9 ) {
        winner = true;
        alert( "Cat's Game - Try Again." );
    }
};
