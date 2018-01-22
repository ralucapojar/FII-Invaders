	//--------------------------Vlad

	var canvas;
    var context;
    var imageCache = {};
    var gameOver = false;
    //Initializare Invader
    var invaderType = {
        invader1: 1,
        invader2: 2,
        invader3: 3
    };
    var invaders = [];

    //Initializare Bullets Invader

    var invadersBullets = [];
    var contor = 0;

    //Initializare Boss

    var boss = {};

    // Initializare Player,Bullets
    
    var keysDown = {};
    var bullets = [];

    var player = Player;
    
    var playerBullets = [];

    player.init();
    

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
    loadImage('student1', '../img/student1.png');
    loadImage('invadersBullets', '../img/bullet.png');
    loadImage('playerBullets', '../img/playerBullets.png');
    loadImage('test', '../img/bomba_nivel2.png');
    loadImage('gameOver', '../img/gameOver.png');
    loadImage('boss', '../img/boss.png');


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
        context.drawImage(imageCache['student1'], player.getPoz(), 655, 100, 100);

    	createInvaders();
        setInterval(gameLoop, 33);

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
                    xBullet:invaders[random].x +10,
                    yBullet:invaders[random].y +22,
                    amount:600
                }

                invadersBullets.push(newBullet);
                };
            };
            
        }; 
        checkInvaders();
        checkPlayer();
        if(gameOver === false)
        {
            drawPlayer();
            drawBulletsPlayer();
            moveBulletsPlayer();
            if(invaders.length>0){
                drawInvaders();
                drawBulletsInvaders();
                moveInvaders();
                moveBulletsInvaders();
            }
            else
            {
                drawBoss();
            }
        }
        else
            context.drawImage(imageCache['gameOver'],0,0,canvas.width,canvas.height);
        contor++;
	};

    document.addEventListener("keydown", keyDownTextField, false);

    function checkInvaders(){
        // 67,55 20 20
        for (var i = 0; i < invaders.length; i++) {
            for(var j = 0; j < playerBullets.length; j++)
            {
                if((playerBullets[j].xBullet >= invaders[i].x && playerBullets[j].xBullet <= invaders[i].x + 67) && (playerBullets[j].yBullet >= invaders[i].y && playerBullets[j].yBullet <= invaders[i].y + 55))
                {   
                    invaders.splice(i,1);
                    playerBullets.splice(j,1);
                    //context.drawImage(imageCache['test'],invaders[i].x,invaders[i].y,67,50);
                }
            }
        }
    }

    function checkPlayer(){
        // 130, 100 20 20
        var life = player.getLife();
        var x = player.getPoz();
        for(var j = 0; j < invadersBullets.length; j++)
        {
            if((invadersBullets[j].xBullet >= x && invadersBullets[j].xBullet <= x + 100) && (invadersBullets[j].yBullet >= 655 && invadersBullets[j].yBullet <= 700))
            {   
                invadersBullets.splice(j,1);
                player.removeLife();
                if ( life == 1) {
                   gameOver = true;

                }
               
            }
        }
    }

    // ---------------------Draw Elements

    function drawPlayer() {
        
        poz = player.getPoz();
        player.drawPlayer(poz);
    }

    function drawBulletsPlayer(){
        if (playerBullets.length > 0) {
            playerBullets.forEach(function(bulletIcon) {
                context.drawImage(imageCache['playerBullets'],bulletIcon.xBullet,bulletIcon.yBullet,10,20);
                
            });
        }
    };

	function drawInvaders() {
        if (invaders.length > 0) {
            invaders.forEach(function(invaderIcon) {
                invaderIcon.draw();
                
            });
        }
    };

    function drawBulletsInvaders() {
        if (invadersBullets.length > 0) {
            invadersBullets.forEach(function(bulletIcon) {
                context.drawImage(imageCache['invadersBullets'],bulletIcon.xBullet,bulletIcon.yBullet,20,20);
                
            });
        }
    };

    function drawBoss() {
        if (invadersBullets.length > 0) {
            invadersBullets.forEach(function(bulletIcon) {
                context.drawImage(imageCache['boss'],400,10,300,300);
                
            });
        }
    };

    // ------------------------Move Elements

    function moveInvaders() {
        if (invaders.length > 0) {
            invaders.forEach(function(invaderIcon) {
                invaderIcon.move();
            });

        }
    };

    function moveBulletsInvaders() {
        if (invadersBullets.length > 0) {
            invadersBullets.forEach(function(bulletIcon) {
                bulletIcon.currentAmountBullet = 0;
                bulletIcon.yBullet = bulletIcon.yBullet + 3;
            });
        }
    };

    function moveBulletsPlayer(){
         if (playerBullets.length > 0) {
            playerBullets.forEach(function(bulletIcon) {
                bulletIcon.yBullet = bulletIcon.yBullet - 3;
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
            
        }       
        if (keyCode == 39) {
            player.moveRight();
            
        }
        if (keyCode == 32) {
            
            if(contor % 2 === 0)
            {

             var newBullet = {
                    xBullet:player.getPoz()+30,
                    yBullet:645,
                    amount:650
                }
            playerBullets.push(newBullet);
            }
           
        }  
    };

       