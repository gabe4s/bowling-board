var scores = {};

var totalPlayers = 0;


// Variables to track place in game
var frameNum = 1;
var playerNum = 1;
var throwNum = 1;

var scoreField;
var playersInput;

window.onload = function () {
    playersInput = document.getElementById("playersInput");
    playersInput.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("playButton").click();
        }
    });
    playersInput.focus();

    scoreField = document.getElementById("scoreInput");
    scoreField.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("scoreButton").click();
        }
    });
}


function startGame() {
    var numOfPlayers = parseInt(document.getElementById("playersInput").value);

    if (isNaN(numOfPlayers) || numOfPlayers < 1 || numOfPlayers > 6) {
        document.getElementById("startError").innerHTML = "Must choose between 1 and 6 players";
        document.getElementById("playersInput").classList.add("error");
    } else {
        totalPlayers = numOfPlayers;

        // Hide start container and show game container
        document.getElementById("startContainer").style.display = "none";
        document.getElementById("gameContainer").style.display = "block";

        drawBoards(numOfPlayers);
        initializeFields();
        showNameEntryFields();
    }
}

function drawBoards(numOfPlayers) {
    var scoreboardContainer = document.getElementById("scoreboardContainer");

    var frameList = document.createElement("div");
    frameList.id = "frameList";
    for(var frameCount = 0; frameCount <= 10; frameCount ++) {
        var frameElement = document.createElement("div");
        frameElement.classList.add("frameElement");
        if(frameCount > 0) {
            frameElement.innerHTML = frameCount;
        }
        if(frameCount == 0) {
            // Size of nameLabel
            frameElement.style.width = "8vw";
        } else if (frameCount == 10) {
            // Size of frame 10
            frameElement.style.width = "12vw";
        } else {
            // Frames 1-9
            frameElement.style.width = "8vw";
        }
        frameList.appendChild(frameElement);
    }

    scoreboardContainer.appendChild(frameList);

    // Using 1 base arrays to keep it consistent with user input
    for (var playerId = 1; playerId <= numOfPlayers; playerId++) {
        var scoreboard = document.createElement("div");
        scoreboard.id = "player" + playerId
        scoreboard.classList.add("scoreboard");

        var nameLabel = document.createElement("div");
        nameLabel.classList.add("nameLabel");

        var nameLabelInner = document.createElement("p");
        nameLabelInner.innerHTML = "&nbsp;";

        nameLabel.appendChild(nameLabelInner);
        scoreboard.appendChild(nameLabel);

        // Draw frames 1-9
        for (var frameId = 1; frameId <= 9; frameId++) {
            var frame = document.createElement("div");
            frame.classList.add("frame");
            frame.id = "frame" + frameId;

            var throwOne = document.createElement("div");
            throwOne.innerHTML = "&nbsp;"
            throwOne.classList.add("throwOne");
            throwOne.classList.add("throw1");
            frame.appendChild(throwOne);

            var throwTwo = document.createElement("div");
            throwTwo.innerHTML = "&nbsp;"
            throwTwo.classList.add("throwTwo");
            throwTwo.classList.add("throw2");
            throwTwo.classList.add("modifier");
            frame.appendChild(throwTwo);

            var frameTotal = document.createElement("div");
            frameTotal.innerHTML = "&nbsp;"
            frameTotal.classList.add("frameTotal");
            frame.appendChild(frameTotal);

            scoreboard.appendChild(frame);
        }
        // Draw frame 10
        var lastFrame = document.createElement("div");
        lastFrame.id = "frame10";
        lastFrame.classList.add("frame");
        lastFrame.classList.add("lastFrame");

        var throwOne = document.createElement("div");
        throwOne.innerHTML = "&nbsp;"
        throwOne.classList.add("throwOne");
        throwOne.classList.add("throw1");
        throwOne.classList.add("last");
        lastFrame.appendChild(throwOne);

        var throwTwo = document.createElement("div");
        throwTwo.innerHTML = "&nbsp;"
        throwTwo.classList.add("throwTwo");
        throwTwo.classList.add("throw2");
        throwTwo.classList.add("last");
        lastFrame.appendChild(throwTwo);

        var throwThree = document.createElement("div");
        throwThree.innerHTML = "&nbsp;"
        throwThree.classList.add("throwThree");
        throwThree.classList.add("throw3");
        throwThree.classList.add("last");
        lastFrame.appendChild(throwThree);

        var frameTotal = document.createElement("div");
        frameTotal.innerHTML = "&nbsp;"
        frameTotal.classList.add("frameTotal");
        lastFrame.appendChild(frameTotal);

        scoreboard.appendChild(lastFrame);

        scoreboardContainer.appendChild(scoreboard);
    }

}

function updateBoardHighlight() {
    var highlightedElements = document.querySelectorAll(".highlight");;
    highlightedElements.forEach(function (element) {
            element.classList.remove("highlight");
    });
    
    document.getElementById("player" + playerNum).classList.add("highlight")
    document.querySelector("#player" + playerNum + ">#frame" + frameNum).classList.add("highlight");
    
}

function initializeFields() {
    updateBoardHighlight();
}

function showNameEntryFields() {
    for (var playerId = totalPlayers; playerId >= 1; playerId--) {
        var playerEntryPopup = document.createElement("div");
        playerEntryPopup.classList.add("playerEntryPopup");
        playerEntryPopup.id = "playerEntryPopup" + playerId;

        var text = document.createElement("p");
        text.innerHTML = "Enter a name for player " + playerId;

        var input = document.createElement("input");
        input.type = "text";
        input.maxLength = 12;

        var button = document.createElement("button");
        button.innerHTML = "Submit";
        (function (playerId, input, playerEntryPopup, button) {
            button.onclick = function () {
                if (input.value.length > 0) {
                    var nameLabelInner = document.querySelector("#player" + playerId + ">.nameLabel>p");
                    playerEntryPopup.style.display = "none";
                    nameLabelInner.innerHTML = input.value;
                    if (playerId == totalPlayers) {
                        document.getElementById("blocker").style.display = "none";
                        document.getElementById("scoreInput").focus();
                    }
                    var nextPopupInput = document.querySelector("#playerEntryPopup" + (playerId + 1) + ">input");
                    if (nextPopupInput) {
                        nextPopupInput.focus();
                    }
                } else {
                    input.classList.add("error");
                }
            };
            input.addEventListener("keyup", function (event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    button.click();
                }
            });
        })(playerId, input, playerEntryPopup, button);

        playerEntryPopup.appendChild(text);
        playerEntryPopup.appendChild(input);
        playerEntryPopup.appendChild(button);

        document.getElementById("gameContainer").appendChild(playerEntryPopup);
        input.focus();
    }
}

function validateThrowScore() {
    var score = parseInt(scoreField.value);
    var inputErrorField = document.getElementById("inputError");
    var scoreInput = document.getElementById("scoreInput");
    if (isNaN(score) || score < 0 || score > 10) {
        inputErrorField.innerHTML = "Pins knocked down must be between 0 and 10";
        scoreInput.classList.add("error");
    } else if (throwNum == 2 && scores[frameNum][playerNum][1] + score > 10) {
        inputErrorField.innerHTML = "Cannot knock down more than 10 pins in a round";
        scoreInput.classList.add("error");
    } else {
        inputErrorField.innerHTML = "";
        scoreInput.classList.remove("error");
        scoreInput.value = "";
        setThrowScore(score);
    }
}

function setThrowScore(score) {
    var gameOver = false;

    var frameObj = scores[frameNum];
    if (!frameObj) {
        scores[frameNum] = {};
        frameObj = scores[frameNum]
    }

    var playerObj = frameObj[playerNum];
    if (!playerObj) {
        frameObj[playerNum] = {}
        playerObj = frameObj[playerNum]
    }

    playerObj[throwNum] = score;

    computeCurrentPlayerScore();

    drawThrowScore(score);

    drawCurrentPlayerScore();

    if (score == 10 || throwNum >= 2) {
        if (frameNum == 10 && (throwNum == 1 || (throwNum == 2 && playerObj[1] + score >= 10))) {
            // If it's frame 10 and it's their first throw or they have knocked down all 10 pins in the first or second throw, they get another ball
            throwNum++;
        } else {
            if (playerNum == totalPlayers) {
                if (frameNum == 10) {
                    // Game Over
                    gameOver = true;
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

    if(gameOver) {
        document.getElementById("scoreInput").disabled = true;
        document.getElementById("scoreButton").style.pointerEvents = "none";
        document.getElementById("gameOverText").style.display = "block";
        var highlightedElements = document.querySelectorAll(".highlight");
        highlightedElements.forEach(function (element) {
            element.classList.remove("highlight");
        });
    } else {
        updateBoardHighlight();
    }
}

function drawThrowScore(score) {
    var throwSpot;
    var scoreUI;
    if (frameNum == 10 && score == 10) {
        throwSpot = ".throw" + throwNum;
        scoreUI = "X";
    } else if (throwNum == 1 && score == 10) {
        throwSpot = ".modifier";
        scoreUI = "X";
    } else {
        throwSpot = ".throw" + throwNum;
        if (throwNum == 2 && scores[frameNum][playerNum][1] + score == 10) {
            scoreUI = "/";
        } else {
            scoreUI = score;
        }
    }
    var currentThrowElement = document.querySelector(("#player" + playerNum) + ">" + ("#frame" + frameNum) + ">" + throwSpot);
    currentThrowElement.innerHTML = scoreUI;
}

function computeCurrentPlayerScore() {
    for (var frame = 1; frame <= 10; frame++) {
        var frameObj = scores[frame];
        if (frameObj) {
            var playerObj = frameObj[playerNum];
            if (playerObj) {
                var throwOne = playerObj[1];
                var throwTwo = playerObj[2];

                var frameScore;

                if (throwOne == 10) {
                    frameScore = 10; // Need to make sure its 10 so we dont count both frame 10 strikes as 20
                    // Strike
                    if (frame == 10) {
                        var throwThree = playerObj[3];
                        if (throwTwo && throwThree) {
                            playerObj["frameScore"] = frameScore + throwTwo + throwThree;
                        }
                    } else if (frame == 9) {
                        var nextFrameObj = scores[frame + 1];
                        if (nextFrameObj) {
                            var nextPlayerObj = nextFrameObj[playerNum];
                            if (nextPlayerObj) {
                                var nextThrowOne = nextPlayerObj[1];
                                var nextThrowTwo = nextPlayerObj[2];
                                if (nextThrowOne && nextThrowTwo) {
                                    playerObj["frameScore"] = frameScore + nextThrowOne + nextThrowTwo;
                                }
                            }
                        }
                    } else {
                        var nextFrameObj = scores[frame + 1];
                        if (nextFrameObj) {
                            var nextPlayerObj = nextFrameObj[playerNum];
                            if (nextPlayerObj) {
                                var nextThrowOne = nextPlayerObj[1];
                                var nextThrowTwo = nextPlayerObj[2];
                                if (nextThrowOne == 10) {
                                    // Strike on next frame, so we use frame after that also
                                    var nextNextFrameObj = scores[frame + 2];
                                    if (nextNextFrameObj) {
                                        var nextNextplayerObj = nextNextFrameObj[playerNum];
                                        var nextNextThrowOne = nextNextplayerObj[1];
                                        if (nextThrowOne && nextNextThrowOne) {
                                            playerObj["frameScore"] = frameScore + nextThrowOne + nextNextThrowOne;
                                        }
                                    }
                                } else {
                                    // No strike on frame after first strike, so both throws next frame
                                    if (nextThrowOne && nextThrowTwo) {
                                        playerObj["frameScore"] = frameScore + nextThrowOne + nextThrowTwo;
                                    }
                                }
                            }
                        }
                    }
                } else if (throwOne && throwTwo && throwOne + throwTwo == 10) {
                    // Spare
                    frameScore = 10;
                    if (frame == 10) {
                        var throwThree = playerObj[3];
                        if (throwThree) {
                            playerObj["frameScore"] = frameScore + throwThree;
                        }
                    } else {
                        var nextFrameObj = scores[frame + 1];
                        if (nextFrameObj) {
                            var nextPlayerObj = nextFrameObj[playerNum];
                            if (nextPlayerObj) {
                                var nextThrowOne = nextPlayerObj[1];
                                if (nextThrowOne) {
                                    playerObj["frameScore"] = frameScore + nextThrowOne;
                                }
                            }
                        }
                    }
                } else if (throwOne && throwTwo) {
                    // Not all pins down
                    frameScore = throwOne + throwTwo;
                    playerObj["frameScore"] = frameScore;
                }
            }
        }
    }
}

function drawCurrentPlayerScore() {
    var scoreCounter = 0;
    for (var frame = 1; frame <= 10; frame++) {
        var frameObj = scores[frame];
        if (frameObj) {
            var playerObj = frameObj[playerNum];
            if (playerObj) {
                var frameScore = playerObj["frameScore"];
                if (frameScore) {
                    scoreCounter += frameScore;
                    playerObj["totalScore"] = scoreCounter;
                    var frameScoreElement = document.querySelector(("#player" + playerNum) + ">" + ("#frame" + frame) + ">.frameTotal");
                    frameScoreElement.innerHTML = scoreCounter;
                }
            }
        }
    }
}