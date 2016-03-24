//Script for Tic Tac Toe game
"use strict";

var playerChoiceURL;
var computerChoiceURL;
var computerChoice;
var playerChoice;
var board;


// Method to take input from the user
function userClick(element, row, column) {
    console.log(element);
    element.appendChild(getImageTag(playerChoiceURL));

    element.onclick = "";
    board[row][column] = playerChoice;

    console.log("After player move - board state -->");
    displayBoard(board);
    makeComputerMove();
}


//Methods to set the image of the player choice
function setPlayerURL(element) {

    console.log(element.id);
    var crossURL = "http://www.iconshock.com/img_jpg/SEVEN/general/jpg/256/cross_icon.jpg";
    var noughtURL = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/blue-jelly-icons-alphanumeric/069533-blue-jelly-icon-alphanumeric-letter-o.png";
    if (element.id == "computerStart") {
        playerChoiceURL = crossURL;
        computerChoiceURL = noughtURL;
        computerChoice = 1;
        playerChoice = 0;
        makeComputerMove();

    } else {
        playerChoiceURL = noughtURL;
        computerChoiceURL = crossURL;
        computerChoice = 0;
        playerChoice = 1;
    }
}

function BoardState(position, board) {
    this.position = position;
    this.board = board;
}

function Position(row, column) {
    this.row = row;
    this.column = column;
}


function initialize() {

    //Test board state
    //board = [[0, 1, 1], [0, 1, 0], [-1, 0, -1]];
    //Initial state
    board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    return board;
}


function getBoardState(state, player) {
    var opponent;
    opponent = (player == 1) ? 0 : 1;

    //Return MAX if player wins
    var MAX = 10;
    //Return MIN if opponent wins
    var MIN = -10;

    if (state[0][0] == player && state[0][1] == player && state[0][2] == player)
        return MAX;
    else if (state[1][0] == player && state[1][1] == player && state[1][2] == player)
        return MAX;
    else if (state[2][0] == player && state[2][1] == player && state[2][2] == player)
        return MAX;
    else if (state[0][0] == player && state[1][0] == player && state[2][0] == player)
        return MAX;
    else if (state[0][1] == player && state[1][1] == player && state[2][1] == player)
        return MAX;
    else if (state[0][2] == player && state[1][2] == player && state[2][2] == player)
        return MAX;
    else if (state[0][0] == player && state[1][1] == player && state[2][2] == player)
        return MAX;
    else if (state[0][2] == player && state[1][1] == player && state[2][0] == player)
        return MAX;

    else if (state[0][0] == opponent && state[0][1] == opponent && state[0][2] == opponent)
        return MIN;
    else if (state[1][0] == opponent && state[1][1] == opponent && state[1][2] == opponent)
        return MIN;
    else if (state[2][0] == opponent && state[2][1] == opponent && state[2][2] == opponent)
        return MIN;
    else if (state[0][0] == opponent && state[1][0] == opponent && state[2][0] == opponent)
        return MIN;
    else if (state[0][1] == opponent && state[1][1] == opponent && state[2][1] == opponent)
        return MIN;
    else if (state[0][2] == opponent && state[1][2] == opponent && state[2][2] == opponent)
        return MIN;
    else if (state[0][0] == opponent && state[1][1] == opponent && state[2][2] == opponent)
        return MIN;
    else if (state[0][2] == opponent && state[1][1] == opponent && state[2][0] == opponent)
        return MIN;

    //Return 0 if draw or still game can be continued.
    return 0;
}

function displayBoard(board) {
    console.log("Display board");
    for (var i = 0; i < 3; i++) {
        var str = "";
        for (var j = 0; j < 3; j++) {
            str += board[i][j] + "  ";
        }
        console.log(str);
    }
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
        newBoard[posObj.row][posObj.column] = value;
        boardCombinations.push(new BoardState(availablePositions[pos], newBoard));
    }

    return boardCombinations;
}

function computerMove(position) {

    board[position.row][position.column] = computerChoice;
    var tictacBoard = document.getElementById('tictacboard');
    var element = tictacBoard.rows[position.row].cells[position.column];
    element.appendChild(getImageTag(computerChoiceURL));
    element.onclick = "";

}

function getImageTag(url) {
    var img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('height', '80px');
    img.setAttribute('width', '80px');
    return img;
}


function makeComputerMove() {
    var combinations = getBoardCombinations(board);

    for (var pos in combinations) {
        console.log(combinations[pos]);
    }
    var randomChoice = Math.floor(Math.random() * combinations.length);
    console.log("random choice" + randomChoice);
    computerMove(combinations[randomChoice].position);

}

$(document).ready(function () {
    initialize();
});
