function save(){
	localStorage.setItem('userData', JSON.stringify(userData));
}

function checkStorage() { 
    if( localStorage.getItem('userData') )
        userData = JSON.parse(localStorage.getItem('userData'));

};