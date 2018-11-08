var scores = {};

var totalPlayers = 0;


// Variables to track place in game
var frameNum = 1;
var playerNum = 1;
var throwNum = 1;

var frameNumField;
var playerNumField;
var throwNumField;

var scoreField = document.getElementById("scoreInput");


function startGame() {
    var numOfPlayers = parseInt(document.getElementById("players").value);

    totalPlayers = numOfPlayers;

    // Hide start container and show game container
    document.getElementById("startContainer").style.display = "none";
    document.getElementById("gameContainer").style.display = "initial";

    drawBoards(numOfPlayers);
    initializeFields();
}

function drawBoards(numOfPlayers) {
    var scoreboardContainer = document.getElementById("scoreboardContainer");

    // Using 1 base arrays to keep it consistent with user input
    for(playerNumber = 1; playerNumber <= numOfPlayers; playerNumber++) {
        var scoreboard = document.createElement("div");

        // var nameLabel = document.createElement("div");
        // nameLabel.classList.add("nameLabel");
        // scoreboard.appendChild(nameLabel);

        // Draw frames 1-9
        for (i = 1; i <= 9; i++) {
            var frame = document.createElement("div");
            frame.classList.add("frame");
            
            var throwOne = document.createElement("div");
            throwOne.classList.add("throwOne");
            frame.appendChild(throwOne);
            
            var throwTwo = document.createElement("div");
            throwTwo.classList.add("throwTwo");
            frame.appendChild(throwTwo);

            var frameTotal = document.createElement("div");
            frameTotal.classList.add("frameTotal");
            frame.appendChild(frameTotal);
            
            scoreboard.appendChild(frame);
        }
        // Draw frame 10
        var lastFrame = document.createElement("div");
        lastFrame.classList.add("lastFrame");

        var throwOne = document.createElement("div");
        throwOne.classList.add("throwOne");
        throwOne.classList.add("last");
        lastFrame.appendChild(throwOne);
        
        var throwTwo = document.createElement("div");
        throwTwo.classList.add("throwTwo");
        throwTwo.classList.add("last");
        lastFrame.appendChild(throwTwo);

        var throwThree = document.createElement("div");
        throwThree.classList.add("throwThree");
        throwThree.classList.add("last");
        lastFrame.appendChild(throwThree);

        scoreboard.appendChild(lastFrame);
        
        scoreboardContainer.appendChild(scoreboard);
    }

}

function initializeFields() {
    frameNumField = document.getElementById("frameNum");
    playerNumField = document.getElementById("playerNum");
    throwNumField = document.getElementById("throwNum");
    
    scoreField = document.getElementById("scoreInput");

    // Set initial frame, player, and throw numbers
    frameNumField.innerHTML = frameNum;
    playerNumField.innerHTML = playerNum;
    throwNumField.innerHTML = throwNum;
}

function setThrowScore() {
    var score = parseInt(scoreField.value);
    
    var frameObj = scores[frameNum];
    if(!frameObj) {
        scores[frameNum] = {};
        frameObj = scores[frameNum]
    }

    var playerObj = frameObj[playerNum];
    if(!playerObj) {
        frameObj[playerNum] = {}
        playerObj = frameObj[playerNum]
    }

    playerObj[throwNum] = score;

    computeCurrentPlayerScore();
    if(score == 10 || throwNum >= 2) {
        if(frameNum == 10 && (throwNum == 1 || (throwNum == 2 && playerObj[1] + score >= 10))) {
            // If it's frame 10 and it's their first throw or they have knocked down all 10 pins in the first or second throw, they get another ball
            throwNum++;
        } else {
            if(playerNum == totalPlayers) {
                if(frameNum == 10) {
                    // End game
                    alert("Game over!");
                } else {
                    // Increase the frame, go back to player 1
                    frameNum++;
                    playerNum = 1;
                }
            } else {
                // Increase the player
                playerNum++;
            }
            throwNum = 1;
        }
    } else {
        throwNum++;
    }

    console.log(scores);

    frameNumField.innerHTML = frameNum;
    playerNumField.innerHTML = playerNum;
    throwNumField.innerHTML = throwNum;
}

function computeCurrentPlayerScore() {
    for(frame = 1; frame <= 10; frame++) {
        var frameObj = scores[frame];
        if(frameObj) {
            var playerThrows = frameObj[playerNum];
            
            var throwOne = playerThrows[1];
            var throwTwo = playerThrows[2];
            
            if(throwOne == 10 || (throwOne && throwTwo)) {

                var frameScore = throwOne + (throwTwo || 0);
            
                if(frameScore == 10) {
                    // Spare or strike
                    var nextFrameObj = scores[frame+1];
                    if(nextFrameObj) {
                        var nextPlayerThrows = nextFrameObj[playerNum];
                        if(nextPlayerThrows) {
                            var nextThrowOne = nextPlayerThrows[1];
                            var nextThrowTwo = nextPlayerThrows[2];
                            if(throwOne == 10) {
                                // Strike
                                if(nextThrowOne == 10) {
                                    // Strike on next frame, so we use frame after that also
                                    var nextNextFrameObj = scores[frame+2];
                                    if(nextNextFrameObj) {
                                        var nextNextPlayerThrows = nextNextFrameObj[playerNum];
                                        var nextNextThrowOne = nextNextPlayerThrows[1];
                                        if(nextThrowOne && nextNextThrowOne) {
                                            frameObj["frameScore"] = frameScore + nextThrowOne + nextNextThrowOne;
                                        }
                                    }
                                } else {
                                    // No strike on frame after first strike, so both throws next frame
                                    if(nextThrowOne && nextThrowTwo) {
                                        frameObj["frameScore"] = frameScore + nextThrowOne + nextThrowTwo;
                                    }
                                }
                                
                            } else {
                                // Spare
                                if(nextThrowOne) {
                                    frameObj["frameScore"] = frameScore + nextThrowOne;
                                }
                            }
                        }
                    }
                } else {
                    frameObj["frameScore"] = frameScore;
                }
            }
        }
    }
}