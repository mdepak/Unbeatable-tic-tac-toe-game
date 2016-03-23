//Script for Tic Tac Toe game
"use strict";

var playerChoiceURL;


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
    } else {
        playerChoiceURL = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/blue-jelly-icons-alphanumeric/069533-blue-jelly-icon-alphanumeric-letter-o.png"
    }
}
