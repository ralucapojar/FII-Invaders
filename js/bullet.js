var Bullet;

(function(){

	function CreateBullet (){
		var bulletObj = {
			  img: '',
			  speedX: 0, // movement in pixels per second
			  x: 0,
			  y: 0,
		};
		
		return {
			init: function(){
				bulletObj = {
					img: 'bomba1',
					speedX: 20, // movement in pixels per second
					startPosition: 630, 
					x: 25,
					y: 20,
				}
			},
			clear : function(){
				context.clearRect(0, 0, canvas.width, canvas.height);
			},
			getPoz : function(){
				return bulletObj.startPosition;
			},
			moveUp : function() {
				(bulletObj.startPosition - bulletObj.speedX < 800) ? bulletObj.startPosition -= bulletObj.speedX :  bulletObj.startPosition            
			},
			drawBullet : function(pozX, pozY) {
				context.drawImage( imageCache[bulletObj.img], pozX, pozY, bulletObj.x, bulletObj.y);     
			}
		}
	};

	return Bullet = CreateBullet();
})();



	
