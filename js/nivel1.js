	//--------------------------Vlad

	var canvas;
    var context;
    var imageCache = {};
    var invaderType = {
        invader1: 1,
        invader2: 2,
        invader3: 3
    };
    var invaders = [];
<<<<<<< HEAD
    var bullets = [];
    var keyMap = {};
    var bases = [];
    var invaderMoveDirection = invaderDirection.right;
    var invaderSpeed = INVADER_START_SPEED;
    var invaderBulletFrequency = INVADER_START_BULLET_FREQUENCY;
    loadImage('ship', '../img/student1.png');
    loadImage('invader1', '../img/monster1.png');
    
    loadImage('invader2', '../img/monster1.png');
    
    loadImage('invader3', '../img/monster1.png');
    
    loadImage('bullet', '../img/bomba1.png');
    loadImage('base', '../img/licenta.png');
    window.onload = function() {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        
       
        setupInvaders();

        canvas.addEventListener('keydown', function(e) {
            handleKeypress(e);
        });
        canvas.addEventListener('keyup', function(e) {
            handleKeypress(e);
        });
        setInterval(redraw, 1000/30);
    };
    function setupInvaders() {
        var startY = 50;
        for (var rows = 0; rows < 4; rows++) {
            var startX = 50;
            var typeOfInvader = invaderType.invader1;
            if (rows === 1 || rows === 2) {
                typeOfInvader = invaderType.invader2;
            }
            if (rows > 2) {
                typeOfInvader = invaderType.invader3;
            }
            for (var col = 0; col < 5; col++) {
                var newInvader = new invader(typeOfInvader, startX, startY);
                invaders.push(newInvader);
                // startX += newInvader.width + INVADER_HORIZ_GAP;
                startX += INVADER_MAX_WIDTH + INVADER_HORIZ_GAP;
            };
            // startY += newInvader.height + INVADER_VERT_GAP;
            startY += INVADER_MAX_HEIGHT + INVADER_VERT_GAP;
        }
    };
   
    function drawInvaders() {
        if (invaders.length > 0) {
            invaders.forEach(function(invaderIcon) {
                invaderIcon.direction = invaderMoveDirection;
                invaderIcon.draw();
                invaderIcon.move()
            });
        }
    };
    function invaderChangeDirection() {
        if (invaderMoveDirection === invaderDirection.right) {
            invaderMoveDirection = invaderDirection.left;
        } else {
            invaderMoveDirection = invaderDirection.right;
        }
    };
    
    function redraw() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        drawInvaders();
 
    };
=======


>>>>>>> 58d3d1008c2d85bfe11074d92c57c8022e14e1ac
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
<<<<<<< HEAD
            return false;
        };
=======
            
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

    	createInvaders();

    	 canvas.addEventListener('keydown', function(e) {
            handleKeypress(e);
        });
        canvas.addEventListener('keyup', function(e) {
            handleKeypress(e);
        });
        
        setInterval(gameLoop, 1000/30);

    };
    function gameLoop() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        drawInvaders();
        moveInvaders();
	};

	function drawInvaders() {
        if (invaders.length > 0) {
            invaders.forEach(function(invaderIcon) {
                invaderIcon.draw();

                
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
			console.log(this.currentAmount);
		};
        
        	


    };

    function removeBullet(bullet) {
        var pos = bullets.indexOf(bullet);
        if (pos > -1) {
            bullets.splice(pos, 1);
        }
>>>>>>> 58d3d1008c2d85bfe11074d92c57c8022e14e1ac
    };
