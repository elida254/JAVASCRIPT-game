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



 
