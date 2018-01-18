	//--------------------------Vlad

	var canvas;
    var context;
    var imageCache = {};
    //Initializare Invader
    var invaderType = {
        invader1: 1,
        invader2: 2,
        invader3: 3
    };
    var invaders = [];

    //Initializare Bullets Invader

    var bulletsInvaders = [];
    var contor = 0;

    // Initializare Player,Bullets
    
    var keysDown = {};
    var bullets = [];

    var player = Player;
    var bullet = Bullet;

    player.init();
    bullet.init();
    var startPosition = player.getPoz();

    function loadImage(imageName, imageFile) {
        var img = new Image();
        img.onload = function () {
            imageCache[imageName] = img;
        };
        img.src = imageFile;
    };
   
    loadImage('invader1', '../img/monster1.png');
    loadImage('invader2', '../img/monster1.png');
    loadImage('invader3', '../img/monster1.png');
    loadImage('bomba1', '../img/bomba1.png');
    loadImage('student1', '../img/student1.png');
    loadImage('bulletsInvaders', '../img/bomba1.png');

    function createInvaders(){

    	var startInvaderRow=6;
    	var typeOfInvader = invaderType.invader1;
    	for (var i = 0; i < 4; i++) {
            var startInvaderColumn =20;
            var typeOfInvader = invaderType.invader1;
            if (i === 1 || i === 2) {
                typeOfInvader = invaderType.invader2;
            }
          	if (i > 2) {
             	typeOfInvader = invaderType.invader3;
            }
            for(var j = 0; j < 5; j++){
           		var newInvader = new invader(typeOfInvader, startInvaderColumn, startInvaderRow);
                invaders.push(newInvader);
            	startInvaderColumn = startInvaderColumn + 65;
    		};
    		startInvaderRow = startInvaderRow + 30;
    	};
    };
	window.onload = function(){
    	canvas = document.getElementById('canvas');
    	context = canvas.getContext('2d');
        context.drawImage(imageCache['student1'], startPosition, 630, 130, 100);

    	createInvaders();
        setInterval(gameLoop, 1000/30);

    };
    
    function gameLoop() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        if(contor % 50 === 0)
        {
            if(invaders.length > 0) 
            {
                var random = Math.floor(Math.random() * invaders.length);
                
                if(invaders[random].currentStage != 1 &&  invaders[random].currentStage != 3 )
                {
                var newBullet = {
                    bulletX:invaders[random].x +2,
                    bulletY:invaders[random].y +2,
                    amount:600
                }

                bulletsInvaders.push(newBullet);
                console.log(newBullet);
                };
            };
            
        };
        drawElements();
        drawInvaders();
        drawBullets();
        moveInvaders();
        moveBullets();
        contor++;
	};

    document.addEventListener("keydown", keyDownTextField, false);

    function drawElements() {
        player.clear();
        poz = player.getPoz();
        pozY = bullet.getPoz();
        player.drawPlayer(poz);
    }

	function drawInvaders() {
        if (invaders.length > 0) {
            invaders.forEach(function(invaderIcon) {
                invaderIcon.draw();
                
            });
        }
    };

    function drawBullets() {
        if (bulletsInvaders.length > 0) {
            bulletsInvaders.forEach(function(bulletIcon) {
                context.drawImage(imageCache['bulletsInvaders'],bulletIcon.bulletX,bulletIcon.bulletY,20,20);
                
            });
        }
    };

    function moveInvaders() {
        if (invaders.length > 0) {
            invaders.forEach(function(invaderIcon) {
                invaderIcon.move();
            });

        }
    };

    function moveBullets() {
        if (bulletsInvaders.length > 0) {
            bulletsInvaders.forEach(function(bulletIcon) {
                bulletIcon.currentAmountBullet = 0;
                bulletIcon.bulletY = bulletIcon.bulletY + 2;
            });
        }
    };
    function invader(type, startX, startY) {
        
        this.type = type;
     	this.image = imageCache['invader' + this.type];
     	this.x = startX;
        this.y = startY;
        
        this.draw = function() {
            context.drawImage(imageCache['invader'+this.type],this.x,this.y,67,55);

        };

        this.currentStage = 0;
        this.currentAmount = 0;
     	this.stage = [
        	{
        		x:2,
        		y:0,
        		amount:330// 660 daca crestem x impartim valoarea asta la x
			},
			{
        		x:0,
        		y:2,
        		amount:25
			},
			{
        		x:-2,
        		y:0,
        		amount:330
			},
			{
        		x:0,
        		y:2,
        		amount:25
			}];

		this.move = function(){
			this.x += this.stage[this.currentStage].x;
			this.y += this.stage[this.currentStage].y;
			this.currentAmount++;
			if(this.currentAmount>=this.stage[this.currentStage].amount){
				this.currentStage = (this.currentStage + 1)%4;
				this.currentAmount = 0;
			}
			
		};

    };

    function removeBullet(bullet) {
        var pos = bullets.indexOf(bullet);
        if (pos > -1) {
            bullets.splice(pos, 1);
        }

    };

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
            player.shoot();
            drawElements();
        }  
    }

       