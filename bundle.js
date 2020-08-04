(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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


},{}],2:[function(require,module,exports){
var paddle = require("./paddle.js");
var _InputHandler = require("./input");

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d"); // 2d means 2 dimension
ctx.fillStyle = "#f00";

ctx.clearRect(0, 0, 800, 600);

// ctx.fillRect(20, 20, 100, 100);

// ctx.fillStyle = "#00f";

// ctx.fillRect(370, 260, 50, 50);
const GAME_WIDTH = 800;

const GAME_HEIGHT = 680;
let game = {
    gamewidth: GAME_WIDTH,
    gameheight: GAME_HEIGHT
}
let _paddle = new paddle(game);
_paddle.draw(ctx);

function gameloop(timestamp) {
    let deltaTime = timestamp - lasttime;
    lasttime = timestamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);


    game.update(deltaTime);

    game.draw(ctx);

    requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
},{"./input":1,"./paddle.js":3}],3:[function(require,module,exports){
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

},{}]},{},[2]);
