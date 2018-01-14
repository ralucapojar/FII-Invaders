function openLeftMenu() {
    document.getElementById("leftMenu").style.height = "30%";
    document.getElementById("leftMenu").style.display = "block";
}
function closeLeftMenu() {
    document.getElementById("leftMenu").style.display = "none";
}

// Get the modal
var modal_des = document.getElementById('Modal_des');
var modal_cont = document.getElementById('Modal_cont');
var modal_rul = document.getElementById('Modal_rul');
var modal_scor = document.getElementById('Modal_scor');

// Get the button that opens the modal
var btn_des = document.getElementById("descriptionBtn");
var btn_cont = document.getElementById("controlsBtn");
var btn_rul = document.getElementById("rulesBtn");
var btn_scor = document.getElementById("highScoresBtn");

// When the user clicks the button, open the modal 
btn_des.onclick = function() {
    modal_des.style.display = "block";
}

btn_cont.onclick = function() {
    modal_cont.style.display = "block";
}

btn_rul.onclick = function() {
    modal_rul.style.display = "block";
}

btn_scor.onclick = function() {
    modal_scor.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal_des) {
        modal_des.style.display = "none";
    }
    if (event.target == modal_cont) {
        modal_cont.style.display = "none";
    }
    if (event.target == modal_rul) {
        modal_rul.style.display = "none";
    }
    if (event.target == modal_scor) {
        modal_scor.style.display = "none";
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal_des.style.display = "none";
    modal_cont.style.display = "none";
    modal_rul.style.display = "none";
    modal_scor.style.display = "none";
}

