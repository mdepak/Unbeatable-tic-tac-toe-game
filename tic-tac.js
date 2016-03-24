//Script for Tic Tac Toe game
"use strict";

var playerChoiceURL;
var computerChoice;

var board;


// Method to take input from the user
function userClick(element) {
    console.log(element);
    var img = document.createElement('img');
    img.setAttribute('src', playerChoiceURL);
    img.setAttribute('height', '80px');
    img.setAttribute('weight', '80px');
    element.appendChild(img);

    element.onclick = "";
}


//Methods to set the image of the player choice
function setPlayerURL(element) {

    console.log(element.id);
    if (element.id == "computerStart") {
        playerChoiceURL = "http://www.iconshock.com/img_jpg/SEVEN/general/jpg/256/cross_icon.jpg";
        computerChoice = 1;
    } else {
        playerChoiceURL = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/blue-jelly-icons-alphanumeric/069533-blue-jelly-icon-alphanumeric-letter-o.png";
        computerChoice = 0;
    }
}

function Position(row, column) {
    this.row = row;
    this.column = column;
}

function initialize() {

    //Test board state
    board = [[0, 1, 1], [0, 1, 0], [-1, 0, -1]];
    //Initial state
    //board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    return board;
}

function getBoardCombinations(board, value) {
    var availablePositions = new Array();
    var boardCombinations = new Array();

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == -1) {
                availablePositions.push(new Position(i, j));
            }
        }
    }

    for (var pos in availablePositions) {
        var posObj = availablePositions[pos];

        var newBoard = JSON.parse(JSON.stringify(board));
        //console.log("new  board object " + newBoard);
        newBoard[posObj.row][posObj.column] = value;
        boardCombinations.push(newBoard);
        //console.log("Available position - " + posObj.row + " , " + posObj.column);
    }
    return boardCombinations;
}
