import Game from "./game";


let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");// 2d means 2 dimension

ctx.clearRect(0,0,800,600);
// ctx.fillStyle = "#f00";
// ctx.fillRect(20,20,100,100);

// ctx.fillStyle = "#00f";
// ctx.fillRect(200,200,50,50);



const GAME_WIDTH = 800;
const GAME_HEIGHT =600;

let game = new Game(GAME_WIDTH , GAME_HEIGHT);

// game.start();

// paddle.draw(ctx);

let lasttime = 0;

 
function gameloop(timestamp)
{
    let deltaTime = timestamp - lasttime;
    lasttime = timestamp;
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);


   game.update(deltaTime);

   game.draw(ctx);

    requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
