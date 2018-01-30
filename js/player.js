var Player;
var name2 = name;

(function(){

	function CreatePlayer (){
		var playerObj = {
			  life: 0,
			  img: '',
			  speedX: 0, // movement in pixels per second
			  x: 0,
			  y: 0,
			  bullets: []
		};
		
		return {
			init: function(){
				playerObj = {
					life:  3,
					img: 'student1',
					speedX: 20, // movement in pixels per second
					startPosition: 460, 
					x: 50,
					y: 100,
					bullets:[]
				}
			},
			shoot: function() {
				var bullet = Player.getPoz();
				bullets.push(bullet);
				this.bullets = bullets;
			},
			removeLife : function(){
				playerObj.life = playerObj.life - 1 ;
			}, 
			getLife : function(){
				return playerObj.life;
			},
			clear : function(){
				context.clearRect(0, 0, canvas.width, canvas.height);
			},
			getPoz : function(){
				return playerObj.startPosition;
			},
			moveLeft : function() {
				(playerObj.startPosition - playerObj.speedX > 10) ? playerObj.startPosition -= playerObj.speedX :  playerObj.startPosition      
			},
			moveRight : function() {
				(playerObj.startPosition + playerObj.speedX < 970) ? playerObj.startPosition += playerObj.speedX :  playerObj.startPosition            
			},
			drawPlayer : function(poz) {
				context.drawImage( imageCache[playerObj.img], poz, 655, playerObj.x, playerObj.y);     
			},
			getListBullets : function(){
    			return this.bullets;
   			}

		}
	};

	return Player = CreatePlayer();
})();



	
