// Canvas
var ctx = document.getElementById('canvas').getContext('2d');

canvas.width = 600;
canvas.height = 450;

// document.body.appendChild(canvas);
var start = new Date().getTime();

//===============================================

// Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
};
bgImage.src = 'img/8-bit-seattle-wa.jpg';

// Player Image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function() {
  playerReady = true;
};
playerImage.src = 'img/test.gif';

// score Image

var scoreReady = false;
var scoreImage = new Image;
scoreImage.onload = function () {
  scoreReady = true;
};

scoreImage.src = 'img/mushroom.png';


//===============================================

// Game Objects
var player = {
  speed: 300,
  // x: 205,
  // y: 525
};

var score = {};
var scoreAmp = 0;

var obstacle1 = {
  x: 180, y: 300,w: 32,h:32, type:"obstacle"}

var obstacles = [obstacle1]



//===============================================

// Keyboard controls
var keysDown = {};

addEventListener('keydown', function(e) {
  keysDown[e.keyCode] = true;

  // Store scores in local storage
  // var stringifyScore = JSON.stringify(scoreAmp);
  // localStorage.setItem = ('storeScore', stringifyScore);
  // var getScores = localStorage.getItem ('storeScore');
  // scoreAmp = JSON.parse(getScores);

}, false);

addEventListener('keyup', function(e) {
  delete keysDown[e.keyCode];
}, false);


//===============================================

// reset game when player scores
var reset = function () {
  player.x = canvas.width /2;
  player.y = canvas.height /2;
  player.w =35;
  player.h = 15;

  // Random score objects
  score.w = 25;
  score.h = 25;

  score.x = 45 + (Math.random() * (canvas.width - score.w));
  score.y = 45 + (Math.random() * (canvas.height - score.h));

  console.log("Current score is " + scoreAmp);

  // var stringifyScore = JSON.stringify(scoreAmp);
  // localStorage.setItem = ('storeScore', stringifyScore);
  // var getScores = localStorage.getItem ('storeScore');
  // scoreAmp = JSON.parse(getScores);

};


//===============================================

// Update sprites
var update = function(modifier) {
  if (37 in keysDown) { // User holding left
    player.x -= player.speed * modifier;
  }

  if (40 in keysDown) { // User holding down
    player.y += player.speed * modifier;
  }

  if (38 in keysDown) { // User holding up
    player.y -= player.speed * modifier;
  }

  if (39 in keysDown) { // User holding right
    player.x += player.speed * modifier;
  }

  if (
    player.x <= (score.x + score.w)
    && score.x <= (player.x + player.w)
    && player.y <= (score.y + score.w)
    ){
      ++scoreAmp;
      reset();
  }
  
  //Player canvas boundaries
  if (player.x >= canvas.width - playerImage.width -1){
      player.x = canvas.width - playerImage.width -1;
  }
  if (player.x <= 1){
      player.x = 1;
  }
  if (player.y >= canvas.height - playerImage.height -1){
      player.y = canvas.height - playerImage.height -1;
  }
  if (player.y <= 1){
      player.y = 1;
  }

  //Score canvas boundaries
  if (score.x >= canvas.width - scoreImage.width -20){
      score.x = canvas.width - scoreImage.width -20;
  }
  if (score.x <= 20){
      score.x = 20;
  }
  if (score.y >= canvas.height - scoreImage.height -20){
      score.y = canvas.height - scoreImage.height -20;
  }
  if (score.y <= 20){
      score.y = 20;
  }
};



//===============================================

// Draw background and sprites
var render = function() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (playerReady) {
    ctx.drawImage(playerImage, player.x, player.y);
  }

  if (scoreReady) {
    ctx.drawImage(scoreImage, score.x, score.y);
  }

//   ctx.fillText("Time:" + c);

//   function createCountDown(timeRemaining) {
//     var startTime = Date.now();
//     return function() {
//        return timeRemaining - ( Date.now() - startTime );
//     }
// };

   // var currentCountDown = createCountDown(30000);

   // score
  ctx.fillStyle = "white";
  ctx.font = "18px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Mushrooms Gathered: " + scoreAmp, 10, 425);

};

//===============================================

// Main app function
var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

//===============================================




//===============================================



// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//===============================================

// Run the app
var then = Date.now();
reset();
main();
