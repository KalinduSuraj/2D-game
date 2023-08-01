var runStart = 0;

function keyCheck(event) {

    // Enter Key
    if (event.which == 13) {
        if (runWorkerId == 0) {
            runWorkerId = setInterval(run, 100);
            runStart = 1
            runSound.play();
            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            createBlockId = setInterval(createBlock, 100);
            moveBlockId = setInterval(moveBlock, 70);


           
            
        }

    }

    // Space Key
    if (event.which == 32) {
        if (runStart == 1){
            if (jumpWorkerId == 0) {
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId = setInterval(jump, 100);
                jumpSound.play();
            }
        }

    }
}

// Run Function

var player = document.getElementById("player");
var runImageNumber = 1;
var runWorkerId = 0;

var runSound = new Audio("run.mp3");
runSound.loop = true;

function run() {
    runImageNumber++
    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    player.src = "Run (" + runImageNumber + ").png";

}

// Jump Function

var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop = 606;

var jumpSound = new Audio("jump.wav");

function jump() {
    jumpImageNumber++
    if (jumpImageNumber <= 6) {
        playerMarginTop = playerMarginTop - 50;
        player.style.marginTop = playerMarginTop + "px";

    }

    if (jumpImageNumber >= 7) {
        playerMarginTop = playerMarginTop + 50;
        player.style.marginTop = playerMarginTop + "px";

    }

    if (jumpImageNumber == 11) {
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();
    }
    player.src = "jump (" + jumpImageNumber + ").png";
}


// Move Background



var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;

function moveBackground() {
    backgroundX = backgroundX - 25;
    background.style.backgroundPositionX = backgroundX + "px";


}

// Update Score

var score = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0 ;

function updateScore() {
    newScore = score.innerHTML = backgroundX * -1 / 25;
}


// Create Block

var blockMarginLeft = 600;
var blockId = 1;
var createBlockId = 0;

function createBlock() {
    var block = document.createElement("div");

    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    background.appendChild(block);

}

// move Block

var moveBlockId = 0;

function moveBlock() {
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";

        
        if (newMarginLeft <= 368){
            if (newMarginLeft>=210){
                if (playerMarginTop<=606){
                    if (playerMarginTop >= 560){
                        clearInterval(runWorkerId);
                        clearInterval(jumpWorkerId);
                        jumpWorkerId=-1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockId);
                        clearInterval(moveBlockId);

                        deadWorkerId = setInterval(dead,100);
                        deadSound.play();

                    }
                }
            }
        }
            
            
    }
}

// Dead Function

var deadImageNumber = 1;
var deadWorkerId = 0 ;

var deadSound = new Audio("Dade.wav");


function dead(){
    deadImageNumber++
    if (deadImageNumber==11){
        deadImageNumber = 10;

        player.style.marginTop = "612px";

        document.getElementById("endScore").innerHTML =newScore; 
        document.getElementById("gameOver").style.visibility = "visible";
    }
    player.src = "Dead ("+deadImageNumber+").png";
    runSound.pause();
    

}

// Restart
function re(){
    location.reload();
}


// win

var winWockerId = 0;

function win(){
    if (newScore == 10){
        document.getElementById("win").style.visibility = "visible";
        clearInterval(runWorkerId);
        clearInterval(jumpWorkerId);
        jumpWorkerId=-1;
        clearInterval(backgroundWorkerId);
        clearInterval(scoreWorkerId);
        clearInterval(createBlockId);
        clearInterval(moveBlockId);
    }
}