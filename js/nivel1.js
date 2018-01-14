    var canvas;
    var context;
    var imageCache = {};
    var playerShip;
    var INVADER_HORIZ_GAP = 35;
    var INVADER_VERT_GAP = 30;
    var INVADER_MOVE_SPEED = 2;
    var INVADER_BULLET_SPEED = 20;
    var PLAYER_SHIP_SPEED = 10;
    var PLAYER_BULLET_SPEED = 15;
    var PLAYER_BASES = 4;
    var SCALE_FACTOR = 0.25;
    var INVADER_MAX_WIDTH = 96 * SCALE_FACTOR;
    var INVADER_MAX_HEIGHT = 64 * SCALE_FACTOR;
    var INVADER_START_SPEED = 75;
    var INVADER_START_BULLET_FREQUENCY = 500;
    var invaderType = {
        invader1: 1,
        invader2: 2,
        invader3: 3
    };
    var bulletType = {
        player: 1,
        invader: 2
    };
    var invaderDirection = {
        left: 1,
        right: 2
    };
    var invaders = [];
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
    function loadImage(imageName, imageFile) {
        var img = new Image();
        img.onload = function () {
            imageCache[imageName] = img;
        };
        img.src = imageFile;
    };
   
   
    function invader(type, startX, startY) {
        this.lastMoveTick = this.lastBulletTick = (new Date()).getTime();
        this.type = type;
        this.firing = false;
        this.direction = invaderMoveDirection;
        this.image = imageCache['invader' + this.type];

        this.width = this.image.width * SCALE_FACTOR;
        this.height = this.image.height * SCALE_FACTOR;
        this.x = startX - (INVADER_MAX_WIDTH / 2);
        this.y = startY - (INVADER_MAX_HEIGHT / 2);
        this.count = 0;
        this.draw = function() {
            this.image = imageCache['invader' + this.type];

            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        this.move = function() {
            var currentTime = (new Date()).getTime();
            if (this.firing && (currentTime - this.lastBulletTick > invaderBulletFrequency)) {
                fireBullet(bulletType.invader, this);
                this.lastBulletTick = currentTime;
                this.firing = false;
            }            
            if (currentTime - this.lastMoveTick > invaderSpeed) {
                if (this.direction === invaderDirection.right) {
                    if (this.x + INVADER_MOVE_SPEED < canvas.width) {
                        this.x += INVADER_MOVE_SPEED;
                       
                    } else {
                        // invaderMoveDirection = invaderDirection.left;
                        // this.direction = invaderMoveDirection;
                        invaderChangeDirection();
                    }
                } else {
                    if (this.x - INVADER_MOVE_SPEED > 0) {
                        this.x -= INVADER_MOVE_SPEED;
                       
                    } else {
                        // invaderMoveDirection = invaderDirection.right;
                        // this.direction = invaderMoveDirection;
                        invaderChangeDirection();
                    }
                }
                this.lastMoveTick = currentTime;
            }
        };
        this.hitTest = function(x, y) {
            if (x > this.x && x < this.x + this.width) {
                if (y > this.y && y < this.y + this.height) {
                    return true;
                }
            }
            return false;
        };
    };
