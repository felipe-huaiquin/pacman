var world = [
    [0,0,0,0,0],
    [0,1,2,2,0],
    [0,2,3,2,0],
    [0,2,2,2,0],
    [0,0,0,0,0],
];

var worldClass = {
    0: 'wall',
    1: 'blank',
    2: 'dot',
    3: 'ghost'
};

var pacman = {
    x: 1,
    y: 1
};

var ghost = {
    x: 2,
    y: 2
}

var life = 3;

window.onload = function(){

    function buildWorld(){
        
        var output = "";

        for(var i = 0; i < world.length; i++){
            output += "<div class='row'>";
            for(var j = 0; j < world[i].length; j++){
                output += "<div class='"+worldClass[world[i][j]]+"'></div>"
            }

            output += "</div>"

        }
        document.getElementById('world').innerHTML = output
    }

    buildWorld();

    
    function drawPacman(){
        document.getElementById('pacman').style.top = pacman.y * 40 + "px";
        document.getElementById('pacman').style.left = pacman.x * 40 + "px";
    }
    drawPacman();

    function drawGhost(){
        document.getElementById('ghost').style.top = ghost.y * 40 + "px";
        document.getElementById('ghost').style.left = ghost.x * 40 + "px";
    }
    drawGhost();


    document.onkeydown = function(e){
        if(e.key == "ArrowLeft" && world[pacman.y][pacman.x - 1]!=0){
            pacman.x += -1;
        }
        if(e.key == "ArrowRight" && world[pacman.y][pacman.x + 1]){
            pacman.x += 1;
        }
        if(e.key == "ArrowUp" && world[pacman.y -1][pacman.x]){
            pacman.y += -1
        }
        if(e.key == "ArrowDown" && world[pacman.y +1][pacman.x]){
            pacman.y += 1
        }

        drawPacman();
    }

    function lifes(){
        var remain_lifes = "<p>"+life+"</p>"
        if(world[ghost.y][ghost.x]==world[pacman.y][pacman.x]){
            document.getElementById('lifes').innerHTML = remain_lifes;
        }

        if(life == 0){
            var game_end = confirm("¿Deseas reiniciar el juego?")
            if(game_end == true){
                location.reload
            }
        }
    }
    lifes();
}