    var objPlayer;
    var sortable = [];
   

    objPlayer = Object.keys(localStorage).reduce(function(obj, str) { 
        obj[str] = localStorage.getItem(str); 
        return obj
    }, {});

    for (var player in objPlayer) {
        sortable.push([player, objPlayer[player]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    }) ;

    function printHighScore(){
    var index = 1 ;
     for (var player in sortable) {
        if(index <= 5 ) {
            var h1 = document.createElement("h3");   
            var text = "" + index  + ". " + sortable[player][0] + " : " + sortable[player][1];        
            var textnode = document.createTextNode(text);         
            h1.appendChild(textnode);                         
            document.getElementById("high").appendChild(h1);  
            index++;
        }
     }
}

printHighScore();