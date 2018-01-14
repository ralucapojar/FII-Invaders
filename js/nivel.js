var context, canvas;
var imageCache = {};
var keysDown = {};
var bullets = [];

var player = Player;
var bullet = Bullet;

player.init();
bullet.init();
var startPosition = player.getPoz();
loadImage('bomba1', '../img/bomba1.png');
loadImage('student1', '../img/student1.png');

setInterval(drawElements, 20);

window.onload = function() {
  canvas = document.getElementById('cs');
  context = canvas.getContext('2d');
  context.drawImage(imageCache['student1'], startPosition, 630, 130, 100);
};

function drawElements() {
  player.clear();
  poz = player.getPoz();
  pozY = bullet.getPoz();
  player.drawPlayer(poz);
}

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  var keyCode = e.keyCode;
  
  if (keyCode == 37) {
    player.moveLeft();
    drawElements();
  }       
  if (keyCode == 39) {
    player.moveRight();
    drawElements();
  }
  if (keyCode == 32) {
    player.fire();
    drawElements();
  }  
}

function loadImage(imageName, imageFile) {
  var img = new Image();
  img.onload = function () {
    imageCache[imageName] = img;
  };
  img.src = imageFile;
};
