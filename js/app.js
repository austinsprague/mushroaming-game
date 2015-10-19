// Canvas
var ctx = document.getElementById('canvas').getContext('2d');

//===============================================

// Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
};
bgImage.src = 'img/backgroundtest.png';

// Player
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function() {
  playerReady = true;
};
playerImage.src = 'img/test.png';

//===============================================

// Sprites
var player = {
  speed: 300,
  x: 205,
  y: 525
};

//===============================================

// Keyboard controls
var keysDown = {};

addEventListener('keydown', function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function(e) {
  delete keysDown[e.keyCode];
}, false);


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

  //canvas boundraies
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

//   ctx.fillText("Time:" + c);

//   function createCountDown(timeRemaining) {
//     var startTime = Date.now();
//     return function() {
//        return timeRemaining - ( Date.now() - startTime );
//     }
// };

//    var currentCountDown = createCountDown(30000);


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

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//===============================================

// Run the app
var then = Date.now();
main();
