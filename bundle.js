(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
class Ball {
    constructor(game)
    {
        this.image =  document.getElementById("img_ball");

        this.gamewidth = game.gamewidth;

        this.gameheight = game.gameheight;

        this.size = 16;

        this.reset();
    }

    reset()
    {
        this.speed = { x: 2, y : -2};

        this.position = { x: 10, y: 200 };
    }
    draw(ctx)
        {
    ctx.drawImage(this.image, this.position.x , this.position.y ,this.size ,this.size);

        }

        update(deltatime)
        {
            this.position.x += this.speed.x;

            this.position.y += this.speed.y;

            if(this.position.x + this.size > this.gamewidth || this.position.x < 0)
            {
                this.speed.x = -this.speed.x;
            }

            if(//this.position.y + this.size > this.gameheight || 
                this.position.y < 0)
            {
                this.speed.y = -this.speed.y;
            }

            if(this.position.y + this.size > this.gameheight)
            {
                this.game.lives--;

                this.reset();
            }

            if(detectcollision(this, this.game.paddle))
            {
                this.speed.y = -this.speed.y;

                this.position.y = this.game.paddle.position.y - this.size;
            }
        }
}
module.exports = Ball;

},{}],2:[function(require,module,exports){
var Paddle = require("./paddle.js");
var InputHandler = require("./input");
var Ball = require("./ball");

class Game {

    constructor(gamewidth , gameheight)
    {
        this.gamewidth = gamewidth;

        this.gameheight = gameheight;

        this.game = game;
        
        this.gamestate = GAMESTATE.MENU;

        this.paddle = new Paddle(this);
 
        this.ball = new Ball(this);

        this.gameObjects = [];

        this.bricks = [];

        this.lives = 3;

        this.levels = [level1, level2];

        this.currentLevel = 0;
        
        new InputHandler(this.paddle, this);

    }

    start() 
    {
        // let brick = new Brick(this, { x: 20, y: 20});

        if(this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;

        this.bricks = buildlevel(this, this.levels[this.currentLevel]);
        // for (let index = 0; index < 10; index++) {
        //     bricks.push(new Brick(this, { x: 20, y: 20}));
        // }
        this.ball.reset();

        this.gameObjects = [ this.ball, this.paddle , /* ...bricks */];

        this.gamestate = GAMESTATE.RUNNING;

    }

    update(deltaTime) 
    {
        // this.paddle.update(deltaTime);
        // this.ball.update(deltaTime);

        if(this.lives == 0) this.gamestate = GAMESTATE.GAMEOVER;
        if(this.gamestate == GAMESTATE.PAUSED || this.gamestate == GAMESTATE.MENU || this.gamestate == GAMESTATE.GAMEOVER) return;

        if(this.bricks.length === 0)
        {
            this.currentLevel++;

            this.gamestate = GAMESTATE.NEWLEVEL;

            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

        this.bricks = this.bricks.filter(Brick => !brick.markedForDeletion)
      
    }

    draw(ctx)
    {
        // this.paddle.draw(ctx);
        // this.ball.draw(ctx);
        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(ctx));

        if(this.gamestate === GAMESTATE.PAUSED)
        {
        ctx.rect(0,0,this.gamewidth,this.gameheight);

        ctx.fillStyle = "rgba(0,0,0,0.5)";

        ctx.fill();

        ctx.font = "30px fantasy";

        ctx.fillStyle = "white";

        ctx.textAlign = "center";

        ctx.fillText("paused", this.gamewidth / 2, this.gameheight / 2);
        }

        if(this.gamestate === GAMESTATE.MENU)
        {
        ctx.rect(0,0,this.gamewidth,this.gameheight);

        ctx.fillStyle = "rgba(0,0,0,1)";

        ctx.fill();

        ctx.font = "30px fantasy";

        ctx.fillStyle = "white";

        ctx.textAlign = "center";

        ctx.fillText("press SPACEBAR to start", this.gamewidth / 2, this.gameheight / 2);
        }

        if(this.gamestate === GAMESTATE.GAMEOVER)
        {
        ctx.rect(0,0,this.gamewidth,this.gameheight);

        ctx.fillStyle = "rgba(0,0,0,1)";

        ctx.fill();

        ctx.font = "30px fantasy";

        ctx.fillStyle = "white";

        ctx.textAlign = "center";

        ctx.fillText("game over", this.gamewidth / 2, this.gameheight / 2);
        }

    }

    togglepause()
    {
        if(this.gamestate == GAMESTATE.PAUSED)
        {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
};

module.exports = Game
},{"./ball":1,"./input":3,"./paddle.js":5}],3:[function(require,module,exports){
// "use strict";
// exports.__esModule = true;
class InputHandler {
    constructor(paddle , game)
    {
        document.addEventListener("keydown", event => 
        {
            // alert(event.keyCode);
            switch (event.keyCode) {
                case 37:
                    // alert("move left")
                    paddle.moveleft();

                    break;

                    case 39:
                    // alert("move right")
                    paddle.moveright();

                    break;
                
                case 27: 
                    
                    game.togglepause();

                    break;

                case 32:
                
                    game.state();

                    break;
                default:
                    break;
            }
        });
        document.addEventListener("keyup", event => 
        {
            // alert(event.keyCode);
            switch (event.keyCode) {
                case 37:
                    // alert("move left")
                  if(Paddle.speed < 0)  paddle.stop();
                    break;
                    case 39:
                    // alert("move right")
                   if(Paddle.speed > 0) paddle.stop();
                    break;
            
                default:
                    break;
            }
        });
    }
}
module.exports = InputHandler;


},{}],4:[function(require,module,exports){
var _Game = require("./game");

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d"); // 2d means 2 dimension
ctx.fillStyle = "#f00";

ctx.clearRect(0, 0, 800, 600);

// ctx.fillRect(20, 20, 100, 100);

// ctx.fillStyle = "#00f";

// ctx.fillRect(370, 260, 50, 50);
const GAME_WIDTH = 800;

const GAME_HEIGHT = 680;
let game = new _Game(GAME_WIDTH, GAME_HEIGHT)
let _paddle = new _Paddle(game);
_paddle.draw(ctx);
let lasttime = 0;

function gameloop(timestamp) {
    let deltaTime = timestamp - lasttime;
    lasttime = timestamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);


    game.update(deltaTime);

    game.draw(ctx);

    requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
},{"./game":2}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;

class Paddle {
    constructor (game){
        this.gamewidth = game.gamewidth;
        this.width = 150;
        this.height = 20;

        this.maxspeed = 10;
        this.speed =0;

        this.position = {
            x : game.gamewidth / 2 - this.width / 2,
            y : game.gameheight - this.height - 10
        }
    }

    moveleft()
    {
        this.speed = -this.maxspeed;
    }

    moveright()
    {
        this.speed = this.maxspeed;
    }

    stop()
    {
        this.speed = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "#0ff";
        ctx.fillRect(this.position.x, this.position.y, this.width ,this.height)
    }

    update(deltaTime)
    {
        // if (!deltaTime)  return;

        // this.position.x += 5 / deltaTime;
        this.position.x += this.speed;

        if (this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > this.gamewidth)
        this.position.x = this.gamewidth - this.width;
    }
};

module.exports = Paddle;

},{}]},{},[4]);
