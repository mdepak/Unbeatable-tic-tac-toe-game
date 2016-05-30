//Script for Tic Tac Toe game
"use strict";

var playerChoiceURL;
var computerChoiceURL;
var computerChoice;
var playerChoice;
var board;

var AI_PLAYER;
var AI_OPPONENT;

var count = 0;


// Method to take input from the user
function userClick(element, row, column) {
    console.log(element);
    element.appendChild(getImageTag(playerChoiceURL));

    element.onclick = "";
    board[row][column] = playerChoice;

    console.log("After player move - board state -->");
    displayBoard(board);

    count++;
    if (isGameOver(board, row, column, playerChoice)) {

        console.log('player won');
    } else {
        makeComputerMove();
    }

}

function isGameOver(cells, currentRow, currentCol, theSeed) {

    return (cells[currentRow][0].content == theSeed // 3-in-the-row
        && cells[currentRow][1].content == theSeed && cells[currentRow][2].content == theSeed || cells[0][currentCol].content == theSeed // 3-in-the-column
        && cells[1][currentCol].content == theSeed && cells[2][currentCol].content == theSeed || currentRow == currentCol // 3-in-the-diagonal
        && cells[0][0].content == theSeed && cells[1][1].content == theSeed && cells[2][2].content == theSeed || currentRow + currentCol == 2 // 3-in-the-opposite-diagonal
        && cells[0][2].content == theSeed && cells[1][1].content == theSeed && cells[2][0].content == theSeed)
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

        //Initialize the AI Player values
        AI_PLAYER = 1;
        AI_OPPONENT = 0;

        makeComputerMove();

    } else {
        playerChoiceURL = noughtURL;
        computerChoiceURL = crossURL;
        computerChoice = 0;
        playerChoice = 1;


        //Initialize the AI Player values
        AI_PLAYER = 0;
        AI_OPPONENT = 1;
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
    board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    return board;
}


function getBoardState(board, player) {
    var opponent;
    opponent = (player == 1) ? 0 : 1;
    return evaluate(board, player);
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

    console.log(board);

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

    count++;

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

    var position;

    if (count < 2) {
        var randomChoice = Math.floor(Math.random() * combinations.length);
        position = combinations[randomChoice].position;
    } else {
        var minmaxState = minmax(board, AI_PLAYER, 2);
        console.log(minmaxState);
        position = minmaxState.position;
        console.log("min max result" + minmaxState);
    }

    computerMove(position);

    if (isGameOver(board, row, column, computerChoice)) {

        console.log('Computer won');
    }
}


function MinMaxState(score, position) {
    this.score = score;

    this.position = position;
}


function evaluate(board, player) {
    var opponent = (player == 1) ? 0 : 1;

    var score = 0;
    // Evaluate score for each of the 8 lines (3 rows, 3 columns, 2 diagonals)
    score += evaluateLine(board, 0, 0, 0, 1, 0, 2, player, opponent); // row 0
    score += evaluateLine(board, 1, 0, 1, 1, 1, 2, player, opponent); // row 1
    score += evaluateLine(board, 2, 0, 2, 1, 2, 2, player, opponent); // row 2
    score += evaluateLine(board, 0, 0, 1, 0, 2, 0, player, opponent); // col 0
    score += evaluateLine(board, 0, 1, 1, 1, 2, 1, player, opponent); // col 1
    score += evaluateLine(board, 0, 2, 1, 2, 2, 2, player, opponent); // col 2
    score += evaluateLine(board, 0, 0, 1, 1, 2, 2, player, opponent); // diagonal
    score += evaluateLine(board, 0, 2, 1, 1, 2, 0, player, opponent); // alternate diagonal
    return score;
}

function evaluateLine(board, row1, col1, row2, col2, row3, col3, mySeed, oppSeed) {
    var score = 0;

    var cells = board;
    // First cell
    if (cells[row1][col1] == mySeed) {
        score = 1;
    } else if (cells[row1][col1] == oppSeed) {
        score = -1;
    }

    // Second cell
    if (cells[row2][col2] == mySeed) {
        if (score == 1) { // cell1 is mySeed
            score = 10;
        } else if (score == -1) { // cell1 is oppSeed
            return 0;
        } else { // cell1 is empty
            score = 1;
        }
    } else if (cells[row2][col2] == oppSeed) {
        if (score == -1) { // cell1 is oppSeed
            score = -10;
        } else if (score == 1) { // cell1 is mySeed
            return 0;
        } else { // cell1 is empty
            score = -1;
        }
    }

    // Third cell
    if (cells[row3][col3] == mySeed) {
        if (score > 0) { // cell1 and/or cell2 is mySeed
            score *= 10;
        } else if (score < 0) { // cell1 and/or cell2 is oppSeed
            return 0;
        } else { // cell1 and cell2 are empty
            score = 1;
        }
    } else if (cells[row3][col3] == oppSeed) {
        if (score < 0) { // cell1 and/or cell2 is oppSeed
            score *= 10;
        } else if (score > 1) { // cell1 and/or cell2 is mySeed
            return 0;
        } else { // cell1 and cell2 are empty
            score = -1;
        }
    }
    return score;
}

function minmax(state, player, level) {
    console.log("-------------Iterating possible combination for state --------");
    displayBoard(state);
    console.log("---------------------------------------------------------------");

    var bestScore = (player == AI_PLAYER) ? -10000 : 10000;
    var possibleBoardState = getBoardCombinations(state, player);
    var opponent;

    var scoreArray = new Array();
    var stateScore;
    var bestState;

    stateScore = getBoardState(state, player);
    var bestRow = -1;
    var bestCol = -1;

    if (possibleBoardState.length == 0 || level == 0) {
        bestScore = getBoardState(state, player);
    } else {
        var count = 0;

        for (var index in possibleBoardState) {
            if (player == AI_PLAYER) {
                var currentScore = minmax(possibleBoardState[index].board, AI_OPPONENT, level - 1).score;

                if (currentScore > bestScore) {
                    bestScore = currentScore;
                    bestRow = possibleBoardState[index].position.row;
                    bestCol = possibleBoardState[index].position.column;
                }

            } else {
                var currentScore = minmax(possibleBoardState[index].board, AI_PLAYER, level - 1).score;
                if (currentScore < bestScore) {
                    bestScore = currentScore;
                    bestRow = possibleBoardState[index].position.row;
                    bestCol = possibleBoardState[index].position.column;
                }
            }
        }
    }
    return new MinMaxState(bestScore, new Position(bestRow, bestCol));
}


$(document).ready(function () {
    initialize();
});
