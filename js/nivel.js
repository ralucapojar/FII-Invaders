
    function checkPlayer(){
        // 130, 100 20 20
        var life = player.getLife();
        var x = player.getPoz();
        for(var j = 0; j < invadersBullets.length; j++)
        {
            if((invadersBullets[j].xBullet >= x && invadersBullets[j].xBullet <= x + 100) && (invadersBullets[j].yBullet >= 655 && invadersBullets[j].yBullet <= 700))
            {   
                invadersBullets.splice(j,1);
                player.removeLife();
                if ( life == 0 ) {
                   players.pop();
                }
               
            }
        }
    }

function printLife(){  
    var text = " Life: " + player.getLife() + " *";          // Create a <li> node   
    document.getElementById("noLife").innerHTML = text;                         // Append the text to <li> 
}