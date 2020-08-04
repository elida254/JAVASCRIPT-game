let game;



const GAMESTATE = { PAUSED : 0, RUNNING: 1, MENU: 2, GAMEOVER: 3, NEWLEVEL: 4}


const level1 = [
    [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],

    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],

    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],

    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
];

const level2 = [
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],

    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],

    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
];



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

game  = new Game(GAME_WIDTH , GAME_HEIGHT);


function detectcollision(ball, gameObject)
{
    let bottomOfBall = ball.position.y + ball.size;

    let topOfBall = ball.position.y;



    let topOfObject = gameObject.position.y;

    let leftSideOfObject = gameObject.position.x;

    let rightSideOfObject = gameObject.position.x + gameObject.width;

    let bottomOfObject = gameObject.position.y + gameObject.height;
    if(bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && ball.position.x >= leftSideOfObject && ball.position.x + ball.size <= rightSideOfObject)
    {
       return true;
    } else {
        return false;
    }
}

class Brick {

    constructor(game , position)
    {
        this.image =  document.getElementById("img_brick");

        this.game = game;

        this.position = { x: 10, y: 10 };

        this.width = 80;

        this.height = 24;

        this.markedForDeletion = false;

    }

    update()
    {
        if(detectcollision(this.game.ball, this))
        {
            this.game.ball.speed.y + -this.game.ball.speed.y;

            this.markedForDeletion = true;
        }
    }

    draw ()
    {
        ctx.drawImage( this.image , this.position.x , this.position.y , this.width , this.height);
    }
}
function buildlevel(game, level)
{
    let bricks = [];

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => 
        {
            if(brick === 1)
            {
                let position = { x: 80 * brickIndex, y: 75 + 24 * rowIndex}

                bricks.push(new Brick(game, position));
            }
        })
    });

    return bricks;
}




// game.start();



 
