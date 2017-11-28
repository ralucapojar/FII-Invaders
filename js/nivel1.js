

var urlStr = window.location.href;
var url = new URL(urlStr);
var name = url.searchParams.get("name");
var score = 0;
var result =  checkStorage();

if( result == 0){
	var userData = {}; 
	userData['user'+name] = url.searchParams.get("name");
	userData['userScore' ] = score;
	save(userData);

	var h2Score = document.createElement("p");
	var h3 = document.createElement("p");
	var h3Life = document.createElement("p");
	var p=document.createElement("p");
	h2Score.id='info;'
	h3.id='info';
	h3Life.id='info';

	h3Life.innerHTML="Life: 3*";
	h3.innerHTML="User: " + name;
	h2Score.innerHTML="Score: " + score;



document.getElementById("info").appendChild(h3Life);
document.getElementById("info").appendChild(h3);

}

window.onbeforeunload = function(e) {
  localStorage.clear();
}

function save(userData){
	var data = JSON.stringify(userData);
	console.log(data);
	localStorage.setItem('userData', data);
}

function checkStorage() { 
    if( localStorage.getItem('userData') ){
        userData = JSON.parse(localStorage.getItem('userData'));
 	   return 1;
	}
	return 0;
};


document.addEventListener("keydown", keyDownTextField, false);



function moveRight(){
	document.getElementById("moveStud").direction = "right";
}

function moveUp(){
	document.getElementById("moveStud").direction = "up"; 
}
function moveDown(){
	document.getElementById("moveStud").direction = "down"; 
}
function moveLeft(){
	document.getElementById("moveStud").direction = "left";
}



function keyDownTextField(e) {
	var keyCode = e.keyCode;
	if (keyCode == 37) {
		console.log('left');
	} 
	if (keyCode == 38) {
		console.log('up');
	} 
	if (keyCode == 39) {
		console.log('rigth');
		moveRight();
	} 
	if (keyCode == 40) {
		console.log('down');
		moveDown();
	} 
  
}