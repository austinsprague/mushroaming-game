// Canvas
var ctx = document.getElementById('canvas').getContext('2d');

canvas.width = 600;
canvas.height = 450;

// Sound effects
var titleSound = new Audio('audio/title.mp3');
var gatherSound = new Audio('audio/gather.wav');
var gameoverSound = new Audio('audio/gameover.mp3');
var titleSoundSwitch = true;
var gameoverSoundSwitch = true;

//===============================================

// Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
};
bgImage.src = 'img/8-bit-seattle-wa.jpg';

// Player image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function() {
  playerReady = true;
};
playerImage.src = 'img/test.gif';

// Score image
var scoreReady = false;
var scoreImage = new Image();
scoreImage.onload = function() {
  scoreReady = true;
};
scoreImage.src = 'img/mushroom.png';

// Title screen
var offset = 0;
var titleReady = false;
var titleImage = new Image();
titleImage.onload = function() {
  titleReady = true;
};
titleImage.src = "img/title.png";

// Gameover and replay screen
var gameoverReady = false;
var gameoverImage = new Image();
gameoverReady.onload = function() {
  gameoverReady = true;
  gameoverLoad = false;
};
gameoverImage.src = "img/gameover.png";

//===============================================

// Game Objects
var player = {
  speed: 350,
};

var score = {};
var scoreAmp = 0;

//===============================================

// Event listeners
var keysDown = {};     // Keydown = true | Keyup = false
var keysDown2 = {};     // keydown = true

addEventListener('keydown', function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function(e) {
  delete keysDown[e.keyCode];
}, false);

addEventListener('keydown', function(e) {
  keysDown2[e.keyCode] = true;
});

// To disable space bar and arrow keys for scrolling
window.addEventListener("keydown", function(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

//===============================================

// Reset game when player scores
var reset = function() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.w = 35;
  player.h = 15;

  // Random score objects
  score.w = 25;
  score.h = 25;

  score.x = 45 + (Math.random() * (canvas.width - score.w));
  score.y = 45 + (Math.random() * (canvas.height - score.h));

  console.log("Current score is " + scoreAmp);

};

//===============================================

// Update sprites
var update = function(modifier) {
  if (37 in keysDown) {     // User holding left
    player.x -= player.speed * modifier;
  };

  if (40 in keysDown) {     // User holding down
    player.y += player.speed * modifier;
  };

  if (38 in keysDown) {     // User holding up
    player.y -= player.speed * modifier;
  };

  if (39 in keysDown) {     // User holding right
    player.x += player.speed * modifier;
  };

  //===============================================

  // if player is touching mushroom
  if (
    player.x <= (score.x + score.w)
    && score.x <= (player.x + player.w)
    && player.y <= (score.y + score.w)
    && score.y <= (player.y + player.w)
    ) {
      gatherSound.play();     // Sound effect
      ++scoreAmp;
      reset();
  };

  // Player canvas boundaries
  if (player.x >= canvas.width - playerImage.width -1) {
      player.x = canvas.width - playerImage.width -1;
  };
  if (player.x <= 1) {
      player.x = 1;
  };
  if (player.y >= canvas.height - playerImage.height -1) {
      player.y = canvas.height - playerImage.height -1;
  };
  if (player.y <= 1) {
      player.y = 1;
  };

//===============================================

  // Score canvas boundaries
  if (score.x >= canvas.width - scoreImage.width -20) {
      score.x = canvas.width - scoreImage.width -20;
  };
  if (score.x <= 20) {
      score.x = 20;
  };
  if (score.y >= canvas.height - scoreImage.height -20) {
      score.y = canvas.height - scoreImage.height -20;
  };
  if (score.y <= 10) {
      score.y = 10;
  };
};

//===============================================

// Timer
var seconds = 30;     // Countdown from 30 seconds
var secondsStart = false;     // Start countdown
var secondsBool = true;     // Boolean to draw game over screen

var interval = setInterval(function() {
  if (secondsStart === true) {
    --seconds;
  };
  if (seconds < 0) {
    secondsBool = false;
    clearInterval(interval);
  };
}, 1000);

//===============================================

// High score boolean
var scoreUpdated = false;

//===============================================

// Draw background and sprites
var render = function() {
  if (titleReady) {
    ctx.drawImage(titleImage, 0, 0);
  };

  if (32 in keysDown2) {     // if space is pressed
    ctx.drawImage(bgImage, 0, 0);
    ctx.drawImage(scoreImage, score.x, score.y);
    ctx.drawImage(playerImage, player.x, player.y);

    if (titleSoundSwitch === true) {
      titleSound.play();     // Sound effect
    };
    titleSoundSwitch = false;

    // Score
    ctx.fillStyle = "white";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Mushrooms Gathered: " + scoreAmp, 10, 425);

    // Start timer
    secondsStart = true;

    ctx.fillStyle = "white";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Time: " +  seconds, 10, 20);
  };

//===============================================  
  
  // if timer is less than 0, secondsBool is false, then draw game over screen
  if (secondsBool === false) {
    ctx.drawImage(gameoverImage, 0, 0);

    if (gameoverSoundSwitch === true) {
      gameoverSound.play();     // Sound effect
    };
    gameoverSoundSwitch = false;

    gameoverLoad = true;     // Boolean to load game over screen

    if (13 in keysDown2 && gameoverLoad === true) {     // if enter is pressed and gameoverLoad is true then reload game
     location.reload();
    };

    // Score
    ctx.fillStyle = "white";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Mushrooms Gathered: " + scoreAmp, 10, 425);

//===============================================

    // Stop the render function timer
    if (scoreUpdated === false) {     // Only add once
      scoreUpdated = true;
      document.getElementById('scoresContainer').innerHTML = '';
      addScore(scoreAmp);
      printScore();
    };
  };
};

//===============================================

// Local storage for score (jquery)
var scoreList = [35, 25, 17, 15, 12];

var addScore = function(scoreAmp) {
  scoreList.push(scoreAmp);
  saveScoreListToBrowser();
};

$(window).load(function() {
  ScoreInputFromBrowser();
});

var ScoreInputFromBrowser = function() {
  var getScore = localStorage.getItem('jsonScore');
  if (getScore != null) {
    scoreList = JSON.parse(getScore);
  };
};

var saveScoreListToBrowser = function() {
  var jsonObject = JSON.stringify(scoreList);
  localStorage.setItem('jsonScore',jsonObject);
};

var printScore = function() {
  scoreList.sort(function(a,b) { return b - a; });

  for (var i = 0; i < 5; i++) {     // Appends top 5 high scores
    $('#scoresContainer').append('<p>' + (i + 1) + ') '+ scoreList[i] + '</p>');
  };
  $('#topScores').show('slow');
};

//=============================================================

// Main app function
var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request cross-brower support
  requestAnimationFrame(main);
};

//===============================================

// Cross-browser support
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//===============================================

// Run the app
var then = Date.now();
reset();
main();

// Print top 5 high score to html
ScoreInputFromBrowser();
printScore();
