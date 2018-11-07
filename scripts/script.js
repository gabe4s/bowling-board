function startGame() {
    var numOfPlayers = document.getElementById("players").value;
    document.getElementById("startContainer").style.display = "none";

    drawBoards(numOfPlayers);
}

function drawBoards(numOfPlayers) {
    var scoreboardContainer = document.getElementById("scoreboardContainer");

    // Using 1 base arrays to keep it consistent with user input
    for(playerNumber = 1; playerNumber <= numOfPlayers; playerNumber++) {
        var scoreboard = document.createElement("div");

        var nameLabel = document.createElement("div");
        nameLabel.classList.add("nameLabel");

        scoreboard.appendChild(nameLabel);

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
            
            scoreboard.appendChild(frame);
        }
        // Draw frame 10
        var frame = document.createElement("div");
        frame.classList.add("lastFrame");

        var throwOne = document.createElement("div");
        throwOne.classList.add("throwOne");
        throwOne.classList.add("last");
        frame.appendChild(throwOne);
        
        var throwTwo = document.createElement("div");
        throwTwo.classList.add("throwTwo");
        throwTwo.classList.add("last");
        frame.appendChild(throwTwo);

        var throwThree = document.createElement("div");
        throwThree.classList.add("throwThree");
        throwThree.classList.add("last");
        frame.appendChild(throwThree);

        scoreboard.appendChild(frame);
        
        scoreboardContainer.appendChild(scoreboard);
    }

}