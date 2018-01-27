    var monsterTouch = 0 ;
    var score;
    var name;

    //--------------------------Vlad
    
    var again = document.getElementsByClassName("btn-again")[0];
    var next = document.getElementsByClassName("btn-next")[0];
    
    var canvas;
    var context;
    var imageCache = {};
    var gameOver = false;
    var gameWin = false;

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

    var boss = [];
    var newBoss = new Boss(400,80);
    boss.push(newBoss); 
    var bossBullets = [];
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
   
    loadImage('invader1', '../img/monster2_nivel2.png');
    loadImage('invader2', '../img/monster2_nivel2.png');
    loadImage('invader3', '../img/monster1_nivel2.png');
    loadImage('student1', '../img/student_nivel2.png');
    loadImage('invadersBullets', '../img/bullet.png');
    loadImage('playerBullets', '../img/playerBullets.png');
    loadImage('gameOver', '../img/gameOver.png');
    loadImage('boss', '../img/boss2.png');
    loadImage('gameWin', '../img/gameWin.jpg');
    loadImage('background', '../img/nivel2-canvas.jpg');
    loadImage('monsterLife1', '../img/b1.png');
    loadImage('monsterLife2', '../img/b2.png');
    loadImage('monsterLife3', '../img/b3.png');
    loadImage('monsterLife4', '../img/b4.png');
    loadImage('monsterLife5', '../img/b5.png');



    function createInvaders(){

        var startInvaderRow=6;
        var typeOfInvader = invaderType.invader1;
        for (var i = 0; i < 6; i++) {
            var startInvaderColumn =20;
            var typeOfInvader = invaderType.invader1;
            if (i === 1 || i === 2) {
                typeOfInvader = invaderType.invader2;
            }
            if (i > 2) {
                typeOfInvader = invaderType.invader3;
            }
            for(var j = 0; j < 8; j++){
                var newInvader = new invader(typeOfInvader, startInvaderColumn, startInvaderRow);
                invaders.push(newInvader);
                startInvaderColumn = startInvaderColumn + 50;
            };
            startInvaderRow = startInvaderRow + 40;
        };
    };
    window.onload = function(){
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        var url_string= window.location.href;
        var url = new URL(url_string);
        name = url.searchParams.get("name");
        if (localStorage.getItem(name) === null) {
            localStorage.setItem(name, 0);
        } else {
            score = parseInt(localStorage.getItem(name));
        }       
        context.drawImage(imageCache['student1'], player.getPoz(), 655, 100, 100);

        createInvaders();
        setInterval(gameLoop, 33);

    };
    
    function gameLoop() {

        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imageCache['background'], 0, 0, canvas.width, canvas.height);
        printLife();
        printScore();

        if(invaders.length>0)
        {
            checkInvaders();
        } else if( boss.length > 0) {
            checkBoss();
        }

        if(invaders.length>0)
        {    
            if(contor % 40 === 0)
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
            
        }
        else
            if(boss.length>0){

                if(contor % 100 === 0)
                {
                   
                        var newBullet = {
                        x:boss[0].x + 50,
                        y:boss[0].y + 205,
                        position:1
                        }

                    bossBullets.push(newBullet);

                        var newBullet = {
                        x:boss[0].x + 150,
                        y:boss[0].y + 205,
                        position:1
                        }
                
                    bossBullets.push(newBullet);

                    if(contor % 200 === 0)
                    {
                        var newBullet = {
                        x:boss[0].x,
                        y:boss[0].y + 105,
                        position:2
                        }

                        bossBullets.push(newBullet);

                        var newBullet = {
                        x:boss[0].x + 200,
                        y:boss[0].y + 105,
                        position:3
                        }
                
                        bossBullets.push(newBullet);
                    }
                    
                };

            } 
        
        checkPlayer();
        
        if(gameOver === false && gameWin === false)
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
                if(boss.length>0){
                    drawBoss();
                    moveBoss();
                    drawBulletsBoss();
                    moveBulletsBoss()
                }
        }
        else
            if(gameWin){
                context.drawImage(imageCache['gameWin'],0,0,canvas.width,canvas.height);
            }
            else {
                printBtnAgain();
                context.drawImage(imageCache['gameOver'],0,0,canvas.width,canvas.height);
            }
        contor++;
    };

    document.addEventListener("keydown", keyDownTextField, false);

 function checkBoss(){
        if(boss.length>0){
            for(var j = 0; j < playerBullets.length; j++)
            {
                if((playerBullets[j].xBullet >= boss[0].x && playerBullets[j].xBullet <= boss[0].x + 200) && (playerBullets[j].yBullet >= boss[0].y && playerBullets[j].yBullet <= boss[0].y + 200))
                {   
                    monsterTouch ++;
                    playerBullets.splice(j,1);
                    getScore(); 
                }
            }
        }      
    }

    function checkInvaders(){
        
        for (var i = 0; i < invaders.length; i++) {
            for(var j = 0; j < playerBullets.length; j++)
            {
                if((playerBullets[j].xBullet >= invaders[i].x && playerBullets[j].xBullet <= invaders[i].x + 67) && (playerBullets[j].yBullet >= invaders[i].y && playerBullets[j].yBullet <= invaders[i].y + 55))
                {   
                    invaders.splice(i,1);
                    playerBullets.splice(j,1);
                    getScore();
                    if(invaders.length == 0){
                            playerBullets = [];
                    }
                }
            }
        }
    }

    function checkPlayer(){
        
        var life = player.getLife();
        var x = player.getPoz();
        if(invaders.length>0){
            for(var j = 0; j < invadersBullets.length; j++)
            {
                if((invadersBullets[j].xBullet >= x-10 && invadersBullets[j].xBullet <= x + 50) && (invadersBullets[j].yBullet >= 655 && invadersBullets[j].yBullet <= 800))
                {   
                    invadersBullets.splice(j,1);
                    player.removeLife();
                    if ( life == 1) {
                        gameOver = true;
                    }             
                }
            }
            if(invaders[invaders.length-1].y>500){
                for(var j = 0; j < invaders.length; j++){
                    if(invaders[j].y >= 625){
                        gameOver = true;
                    }             
                }
            }
        }
        else
            if (boss.length>0) {
                for(var j = 0; j < bossBullets.length; j++)
                {
                    if((bossBullets[j].x >= x-10 && bossBullets[j].x <= x + 50) && (bossBullets[j].y >= 655 && bossBullets[j].y <= 800))
                    {   
                        bossBullets.splice(j,1);
                        player.removeLife();
                        if ( life == 1) {
                            gameOver = true;
                        }             
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
                if(bulletIcon.yBullet>0)
                    context.drawImage(imageCache['playerBullets'],bulletIcon.xBullet,bulletIcon.yBullet,10,20);
                else 
                    playerBullets.splice(bulletIcon,1);
                    console.log(playerBullets.length);
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
                if(bulletIcon.yBullet<800)
                    context.drawImage(imageCache['invadersBullets'],bulletIcon.xBullet,bulletIcon.yBullet,20,20);
                else
                     invadersBullets.splice(bulletIcon,1);   
            });
        }
    };

    function drawBoss() {

        if (boss.length > 0) {
            boss.forEach(function(bossIcon) {
                bossIcon.draw();
                
                if (monsterTouch >=0 && monsterTouch <3) {
                   printMonsterLife(imageCache['monsterLife1']);
                }
                else if (monsterTouch >= 3 && monsterTouch < 6) {
                   printMonsterLife(imageCache['monsterLife2']);
                }
                else if (monsterTouch >= 6 && monsterTouch < 9) {
                   printMonsterLife(imageCache['monsterLife3']);
                }
                else if (monsterTouch >= 9 && monsterTouch < 12) {
                   printMonsterLife(imageCache['monsterLife4']);
                }
                else if (monsterTouch >=12 && monsterTouch < 15) {
                   printMonsterLife(imageCache['monsterLife5']);
                }
                else if (monsterTouch == 15) {
                    scoreMonster();
                    boss.splice(0,1);
                    gameWin = true; 
                    printBtnAgain();
                    printBtnNext();
                    hideMonsterLife();
                }
            });
        }
    };

    function drawBulletsBoss() {
        if (bossBullets.length > 0) {
            bossBullets.forEach(function(bulletIcon) {
                if(bulletIcon.y<900)
                    context.drawImage(imageCache['invadersBullets'],bulletIcon.x,bulletIcon.y,20,20);
                else 
                    bossBullets.splice(bulletIcon,1);
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

    function moveBoss() {
        if (boss.length > 0) {
            boss.forEach(function(bossIcon) {
                bossIcon.move();
            });
        }
    };

    function moveBulletsBoss() {
        if (bossBullets.length > 0) {
            bossBullets.forEach(function(bulletIcon) {
                if(bulletIcon.position === 1)
                {
                    bulletIcon.y = bulletIcon.y + 3;
                }
                else 
                    if(bulletIcon.position === 2){
                        bulletIcon.y = bulletIcon.y + 3;
                        bulletIcon.x = bulletIcon.x - 3;
                    }
                    else
                        if(bulletIcon.position === 3){
                            bulletIcon.y = bulletIcon.y + 3;
                            bulletIcon.x = bulletIcon.x + 3;
                        }


            });
        }
    };


    function moveBulletsInvaders() {
        if (invadersBullets.length > 0) {
            invadersBullets.forEach(function(bulletIcon) {
                bulletIcon.currentAmountBullet = 0;
                bulletIcon.yBullet = bulletIcon.yBullet + 4;
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
            context.drawImage(imageCache['invader'+this.type],this.x,this.y,55,55);

        };

        this.currentStage = 0;
        this.currentAmount = 0;
        this.stage = [
            {
                x:2,
                y:0,
                amount:290
            },
            {
                x:0,
                y:2,
                amount:25
            },
            {
                x:-2,
                y:0,
                amount:290
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

    function Boss(startX, startY) {
        
        this.x = startX;
        this.y = startY;
        
        this.draw = function() {
           context.drawImage(imageCache['boss'],this.x,this.y,200,200);
        };

        this.currentStage = 0;
        this.currentAmount = 0;
        this.stage = [
            {
                x:3,
                y:0,
                amount:130
            },
            {
                x:0,
                y:3,
                amount:40
            },
            {
                x:-3,
                y:0,
                amount:253
            },
            {
                x:0,
                y:-3,
                amount:40
            }];

        this.move = function(){
            this.x += this.stage[this.currentStage].x;
            this.y += this.stage[this.currentStage].y;
            this.currentAmount++;
            if(this.currentAmount>=this.stage[this.currentStage].amount){
                if(this.stage[this.currentStage].amount === 130 && this.currentAmount === 130){
                    this.stage[this.currentStage].amount = 253;
                }
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
                    xBullet:player.getPoz() + 5,
                    yBullet:645,
                    amount:650
                }
            playerBullets.push(newBullet);
            }
           
        }  
    };

function scoreMonster(){
    score = parseInt(localStorage.getItem(name));
    score += 500;
    localStorage.setItem(name, score);
}

function getScore(){
    score = parseInt(localStorage.getItem(name));
    if (invaders.length > 0 && invaders.length < 6 ){
        score += 20;
    }
    else if (invaders.length >= 6 && invaders.length < 12){
        score += 30;
    }
    else if (invaders.length >= 12 && invaders.length < 24){
        score += 40;
    }
    else if (invaders.length >= 24){
        score += 70;
    }

    localStorage.setItem(name, score);
}

function hideMonsterLife(){
    var img = document.getElementById("monsterLife");
    img.style.display = "none";   
}

function printMonsterLife(path){ 
    var img = document.getElementById("monsterLife");
    img.src = path.src;
    img.style.display = "block";                 
}

function printLife(){  
    var text = " Life: " + player.getLife() + "  &#10084;";          // Create a <li> node   
    document.getElementById("noLife").innerHTML = text;                         // Append the text to <li> 
}

function printScore(){ 
    score = parseInt(localStorage.getItem(name)); 
    var text = " Score: " + score;          // Create a <li> node   
    document.getElementById("score").innerHTML = text;                         // Append the text to <li> 
}

function printBtnAgain(){
    again.style.display = "block";   
}

function printBtnNext(){
    next.style.display = "block";   
}

function removeBtnAgain(){
    again.style.display = "none";
}

function removeBtnNext(){
    next.style.display = "none";
}
