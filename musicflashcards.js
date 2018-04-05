/* Music notes flash cards
(c) Jean-Etienne Poirrier, 2018
Contact: jepoirrier@gmail.com
Project URL: https://github.com/jepoirrier/MusicNotesFlashCards
Licence: GPL v3 or later
@license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

Simple music notes flash card game for any browser
*/

/* Notes:
    0 - 0 - no note
    1 - C - do
    2 - D - re
    3 - E - mi
    4 - F - fa
    5 - G - sol
    6 - A - la
    7 - B - si
*/

var allNotes = [0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1];

currentCardNote = 1;
previousCardNote = 1;
previousAnswer = 1;
currentScore = 0;
currentMaximum = 0;

function getNoteFromNumber(numberGiven) {
    var notesInDo = [ "error", "do", "re", "mi", "fa", "sol", "la", "si"];
    var notesInA = ["error", "C", "D", "E", "F", "G", "A", "B"];

    if(numberGiven > notesInDo.length)
        numberGiven = 0;

    if(document.getElementById("buttonsDo").style.display == "none") {
        return notesInA[numberGiven];
    } else {
        return notesInDo[numberGiven];
    }
}

function ChooseAndDisplayNewCard() {
    // save current as previous card (previous answer should have been updated when choosing answer)
    previousCardNote = currentCardNote;
    currentCardNote = Math.floor(Math.random() * (allNotes.length - 1)) + 1; // random number 1 to the size of allNotes ; potential issue: if not enough png files TODO
    
    // display current card
    document.getElementById("imageCurrentCard").src="notes/note" + String(currentCardNote) + ".png";
    // display previous card
    document.getElementById("imagePreviousCard").src="notes/note" + String(previousCardNote) + ".png";
    // update previous card text (label and if it was correct - previousAnswer == previousCardNote)

    console.log("ChooseAndDisplayNewCard: " + currentCardNote + " (previously: " + previousCardNote + ")");
}

/* Normal functions */

function updateScore(pointsToAdd) {
    currentScore = currentScore + pointsToAdd;
    currentMaximum = currentMaximum + 1;

    document.getElementById("currentScore").textContent = currentScore;
    document.getElementById("currentMaximum").textContent = currentMaximum;

    console.log("UpdateScore with: " + pointsToAdd + " ; currentScore = " + currentScore + "/" + currentMaximum);
}

function giveAnswer(buttonPressed) {

    correctAnswer = 0;

    if(buttonPressed == undefined) {
        buttonPressed = 0;
    }

    if(buttonPressed == allNotes[currentCardNote]) { // Check if buttonPressed == currentCardNote
        correctAnswer = 1;
    } else {
        correctAnswer = 0;
    }

    console.log("giveAnswer: " + buttonPressed + " and it's correct? --> " + correctAnswer);
    
    updateScore(correctAnswer); // Update score
    
    previousAnswer = buttonPressed; // Update previous answer

    document.getElementById("previousAnswerText1").textContent = getNoteFromNumber(previousAnswer);
    if(correctAnswer == 1) {
        document.getElementById("previousAnswerText2").textContent = "";
    } else {
        document.getElementById("previousAnswerText2").textContent = "not";
    }

    ChooseAndDisplayNewCard();

}

function resetHighScore() {
    currentScore = 0;
    currentMaximum = 0;

    document.getElementById("currentScore").textContent = currentScore;
    document.getElementById("currentMaximum").textContent = currentMaximum;

    console.log("resetHighScore --> currentScore = " + currentScore + "/" + currentMaximum);

    ChooseAndDisplayNewCard();
}

/* Display functions */

function displayScoreboard() {
    var x = document.getElementById("scoreboard");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function displayButtonsA() {
    var x = document.getElementById("buttonsA");
    var y = document.getElementById("buttonsDo");

    x.style.display = "block";
    y.style.display = "none"; // hide buttons do, re, mi ...
} 

function displayButtonsDo() {
    var x = document.getElementById("buttonsDo");
    var y = document.getElementById("buttonsA");

    x.style.display = "block";
    y.style.display = "none"; // hide buttons A, B, C
}

function initialSetup() {
    document.getElementById("buttonsDo").checked = true;
    displayButtonsA();
}

// @license-end