

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

	var h2 = document.createElement("h3");
	var h3 = document.createElement("h3");
	var p=document.createElement("p");
	h2.id='info;'
	h3.id='info';

	h3.innerHTML="User: " + name;
	h2.innerHTML="Score: " + score;

document.getElementById("info").appendChild(h3);
document.getElementById("info").appendChild(h2);
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