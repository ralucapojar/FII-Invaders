   
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
        
        playerShip = new playerShip();
        setupInvaders();
        setupBases();

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


function base(x, y) {
        this.image = imageCache.base;
        this.width = this.image.width * SCALE_FACTOR;
        this.height = this.image.height * SCALE_FACTOR;
        this.x = (x - this.width / 2);
        this.y = (y - this.height / 2);
        this.draw = function () {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);            
        };
};

function setupBases() {
        var divider = PLAYER_BASES * 2; // nr de blocuri 
        var xIncrement = canvas.width / divider;
        var startX = xIncrement;
        var addBase = true;
        for (var baseNum = 0; baseNum < divider; baseNum++) {
            if (addBase) {
                var newBase = new base(startX, canvas.height - (900 * SCALE_FACTOR));
                bases.push(newBase);
            }
            startX += xIncrement;
            addBase = !addBase;
        }
    };
    function drawBases() {
        if (bases.length) {
            bases.forEach(function(baseIcon) {
                baseIcon.draw();
            })
        }
    };

function playerShip() {
    this.image = imageCache.ship;
    this.width = 150 ;
    this.height = 180 ;
    this.x = (canvas.width - this.width) / 2;
    this.y = canvas.height - this.height;
    this.moveLeft = function () {
        if (this.x - PLAYER_SHIP_SPEED > 0) {
            this.x -= PLAYER_SHIP_SPEED;
        }
    }
    this.moveRight = function () {
        if (this.x + this.width + PLAYER_SHIP_SPEED < canvas.width) {
            this.x += PLAYER_SHIP_SPEED;
        }
    }
    this.draw = function() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
};

 function drawBullets() {
        if (bullets.length > 0) {
            bullets.forEach(function(bullet) {
                bullet.draw();
                bullet.move();
            });
        }
    }
    function handleKeypress(e) {
        e = e || event; // to deal with IE
        keyMap[e.keyCode] = e.type == 'keydown';
    };
    function playerMovement() {
        if (keyMap[37]) {
            playerShip.moveLeft();
        }
        if (keyMap[39]) {
            playerShip.moveRight();
        }
        if (keyMap[32]) {
            fireBullet(bulletType.player, playerShip);
        }
    };
    function fireBullet(type, owner) {
        var newBullet = new bullet(type, owner);
        bullets.push(newBullet);
    };
    function redraw() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        playerShip.draw();
        drawBullets();
        drawBases();
        drawInvaders();
        playerMovement();
    };

    function bullet(type, owner) {
        var getColourAtPoint = function(x, y) {
            var p = context.getImageData(x, y, 1, 1).data; 
            console.log(p)
            var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
            return p[0] + p[1] + p[2];
        };
        this.type = type;
        this.image = imageCache.bullet;
        this.width = 20;
        this.height = 20;
        this.x = owner.x + ((owner.width - this.width) / 2);
        if (this.type === bulletType.player) {
            this.y = owner.y - this.height;
        } else {
            this.y = owner.y + owner.height;
        }
        this.draw = function() {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        this.move = function() {
            if (this.type === bulletType.player) {
                this.y -= PLAYER_BULLET_SPEED;
                if (this.y < 0) {
                    removeBullet(this);
                }
                var c = getColourAtPoint(this.x + (this.width / 2), this.y - 1);
                if (c > 0) {
                    console.log(c);
                }
            }
            if (this.type === bulletType.invader) {
                this.y += INVADER_BULLET_SPEED;
                if (this.y > canvas.height) {
                    removeBullet(this);
                }
            }
        }
    };

    function removeBullet(bullet) {
        var pos = bullets.indexOf(bullet);
        if (pos > -1) {
            bullets.splice(pos, 1);
        }
    };
