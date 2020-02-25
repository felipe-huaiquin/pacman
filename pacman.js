var world = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,2,2,0,2,2,2,2,2,2,2,0],
    [0,2,0,2,2,0,2,2,2,2,5,2,2,0],
    [0,2,0,2,2,0,2,2,2,2,2,2,2,0],
    [0,2,0,2,2,2,2,0,2,3,2,2,2,0],
    [0,2,2,2,2,2,2,0,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var worldClass = {
    0: 'wall',
    1: 'blank',
    2: 'dot',
    3: 'ghost',
    4: 'blank2',
    5: 'fruit'
};

var pacman = {
    x: 1,
    y: 1
};

var ms_pacman = {
    x: 0,
    y: 0
}

var ghost = {
    x: 0,
    y: 0
}

var life = 3;

var points_init= 0;

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

    function intialPacman(){
        for(var i = 0; i < world.length; i++){
            for(var j=0; j < world[i].length; j++){
                if(worldClass[world[i][j]]=='blank'){
                    pacman.x = i;
                    pacman.y = j; 
                }
            }
        }
    }

    intialPacman();
    
    function initialMsPacman(){
        for(var i = 0; i < world.length; i++){
            for(var j=0; j < world[i].length; j++){
                if(worldClass[world[i][j]]=='blank2'){
                    ms_pacman.x = i;
                    ms_pacman.y = j; 
                }
            }
        }

    }

    initialMsPacman();

    function initialGhost(){
        for(var i = 0; i < world.length; i++){
            for(var j=0; j < world[i].length; j++){
                if(worldClass[world[i][j]]=='ghost'){
                    ghost.x = j;
                    ghost.y = i; 
                }
            }
        }
    };

    initialGhost();

    
    function drawPacman(){
        document.getElementById('pacman').style.top = pacman.y * 40 + "px";
        document.getElementById('pacman').style.left = pacman.x * 40 + "px";
    }
    
    drawPacman();

    function drawMsPacman(){
        document.getElementById('ms_pacman').style.top = ms_pacman.y * 40 + "px";
        document.getElementById('ms_pacman').style.left = ms_pacman.x * 40 + "px";
    }
    
    drawMsPacman();

    function drawGhost(){
        document.getElementById('ghost').style.top = ghost.y * 40 + "px";
        document.getElementById('ghost').style.left = ghost.x * 40 + "px";
    }
    
    drawGhost();


    document.onkeydown = function(e){
        if(e.key == "ArrowLeft" && world[pacman.y][pacman.x - 1]!=0){
            pacman.x += -1;
        }
        if(e.key == "ArrowRight" && world[pacman.y][pacman.x + 1]!=0){
            pacman.x += 1;
        }
        if(e.key == "ArrowUp" && world[pacman.y - 1][pacman.x]!=0){
            pacman.y += -1
        }
        if(e.key == "ArrowDown" && world[pacman.y + 1][pacman.x]!=0){
            pacman.y += 1
        }

        drawPacman();
        lifes();
        points();
        buildWorld();
        console.log(world[pacman.y][pacman.x])
    };

    function ghostMovement(){

        var temp = "";

        if(world[ghost.y - 1][ghost.x]!=0){
            world[ghost.y][ghost.x] = 2;
            ghost.y += -1
            world[ghost.y][ghost.x] = 3;
        };

        drawGhost();
        buildWorld();
        setTimeout(ghostMovement,1000);
    };

    ghostMovement();

    function points(){
        var points_sofar = "<p> Points: " +points_init+ "</p>";
        if(world[pacman.y][pacman.x]==2){
            world[pacman.y][pacman.x]=1;
            points_init +=10;
        };
        if(world[pacman.y][pacman.x]==5){
            world[pacman.y][pacman.x]=1;
            points_init +=50;
        };

        document.getElementById('points').innerHTML = points_sofar;
    };
    
    points();

    function lifes(){
        if(ghost.y == pacman.y && ghost.x==pacman.x){
            life+=-1
        }
        
        var remain_lifes = "<p>Lifes Remaining: "+life+"</p>"
        
        document.getElementById('lifes').innerHTML = remain_lifes;
        
        if(life < 0){
            var remain_lifes = "<p>Lifes Remaining: "+life+"</p>"
            document.getElementById('lifes').innerHTML = remain_lifes;
            var game_end = confirm("Has perdido, ¿Deseas reiniciar el juego?")
            
            if(game_end == true){
                location.reload();
            }
        }
    }

    lifes();

}