var Player;

(function(){

	function CreatePlayer (){
		var playerObj = {
			  img: '',
			  speedX: 0, // movement in pixels per second
			  x: 0,
			  y: 0,
			  bullets: []
		};
		
		return {
			init: function(){
				playerObj = {
					img: 'student1',
					speedX: 30, // movement in pixels per second
					startPosition: 450, 
					x: 130,
					y: 100,
					bullets:[]
				}
			},
			 shoot: function() {
			    var bullet = Player.getPoz();
			    this.bullets.push(bullet);
			  },

			clear : function(){
				context.clearRect(0, 0, canvas.width, canvas.height);
			},
			getPoz : function(){
				return playerObj.startPosition;
			},
			moveLeft : function() {
				(playerObj.startPosition - playerObj.speedX > -30) ? playerObj.startPosition -= playerObj.speedX :  playerObj.startPosition      
			},
			moveRight : function() {
				(playerObj.startPosition + playerObj.speedX < 910) ? playerObj.startPosition += playerObj.speedX :  playerObj.startPosition            
			},
			drawPlayer : function(poz) {
				context.drawImage( imageCache[playerObj.img], poz, 630, playerObj.x, playerObj.y);     
			} 

		}
	};

	return Player = CreatePlayer();
})();



	
