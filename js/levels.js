var Brick = require("./brick");

const level1 = [
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const level2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function buildlevel(game, level) {
    let bricks = [];

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if (brick === 1) {
                let position = {
                    x: 80 * brickIndex,
                    y: 75 + 24 * rowIndex
                }

                bricks.push(new Brick(game, position));
            }
        })
    });

    return bricks;
}
const AllLevels = {
    level1: level1,
    level2: level2,
    buildlevel: buildlevel
}
module.exports = AllLevels;