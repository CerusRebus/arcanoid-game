const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let image = new Image;
image.src = 'images/icon-arcanoid.png';

let space = new Image;
space.src = 'images/space.jpg'

const root = {
    ball: {x: 223, y: 587, width: 38, height: 38},
    platforma: {x: 104, y: 176, width: 231, height: 18},
    silver: {x: 0, y: 0, width: 42, height: 20},
    orange: {x: 58, y: 0, width: 42, height: 20},
    blue: {x: 116, y: 0, width: 42, height: 20},
    green: {x: 174, y: 0, width: 42, height: 20},
    red: {x: 0, y: 36, width: 42, height: 20},
    darkblue: {x: 58, y: 36, width: 42, height: 20},
    pink: {x: 116, y: 36, width: 42, height: 20},
    yellow: {x: 174, y: 36, width: 42, height: 20}
}

// element ball
let ball = {
    x: canvas.width / 2 - 5,
    y: canvas.height - 50,
    width: 10,
    height: 10,
    speed: 200,
    angle: Math.PI / 4 + Math.random() * Math.PI / 2,
    drawBall: function () {
        context.drawImage(image, root.ball.x, root.ball.y, root.ball.width, root.ball.height, this.x, this.y, this.width, this.height)
    }
}

// element platform
let platforma = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 200,
    leftKey: false,
    rightKey: false,
    drawPlatforma: function () {
        context.drawImage(image,
            root.platforma.x, root.platforma.y, root.platforma.width, root.platforma.height,
            this.x, this.y, this.width, this.height
        )
    }
}

// elements blocks
const blocks = [];
for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 10; y++) {
        blocks.push({
            x: 50 + 50 * x,
            y: 50 + 20 * y,
            width: 50,
            height: 20,
            color: getRandomFrom(['silver', 'orange', 'blue', 'green', 'red', 'darkblue', 'pink', 'yellow'])
        });
    }
}

function drawBlock(block) {
    context.drawImage(image,
        root[block.color].x, root[block.color].y, root[block.color].width, root[block.color].height,
        block.x, block.y, block.width, block.height)
}

// walls
const limits = [
    {x: 0, y: -20, width: canvas.width, height: 20},
    {x: canvas.width, y: 0, width: 20, height: canvas.height},
    {x: 0, y: canvas.height, width: canvas.width, height: 20},
    {x: -20, y: 0, width: 20, height: canvas.height}
]


document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        platforma.leftKey = true;
    } else if (e.key === 'ArrowRight') {
        platforma.rightKey = true;
    } else if (e.key === 'Enter') {
        if (!playing) {
            playing = true;
            ball = {
                x: canvas.width / 2 - ball.width / 2,
                y: canvas.height - 50,
                width: ball.width,
                height: ball.height,
                speed: ball.speed,
                angle: Math.PI / 4 + Math.random() * Math.PI / 2,
                drawBall: function () {
                    context.drawImage(
                        image, root.ball.x, root.ball.y, root.ball.width, root.ball.height, ball.x, ball.y, ball.width, ball.height
                    )
                }
            };
            platforma = {
                x: canvas.width / 2 - platforma.width / 2,
                y: canvas.height - 30,
                width: platforma.width,
                height: platforma.height,
                speed: platforma.speed,
                leftKey: false,
                rightKey: false,
                drawPlatforma: function () {
                    context.drawImage(
                        image,
                        root.platforma.x, root.platforma.y, root.platforma.width, root.platforma.height,
                        this.x, this.y, this.width, this.height
                    )
                }
            };
            blocks.splice(0, blocks.length);
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 10; y++) {
                    blocks.push({
                        x: 50 + 50 * x,
                        y: 50 + 20 * y,
                        width: 50,
                        height: 20,
                        color: getRandomFrom(['yellow', 'pink', 'orange', 'blue'])
                    });
                }
            }
        }
    }
})
document.addEventListener('keyup', function (e) {
    e.key === 'ArrowLeft' ? platforma.leftKey = false :
        e.key === 'ArrowRight' ? platforma.rightKey = false : null;
})


let pTimestamp = 0;
let playing = true;

requestAnimationFrame(loop);

function loop(timestamp) {
    requestAnimationFrame(loop);
    clearCanvas();
    if (playing) {
        const dTimestamp = Math.min(16.7, timestamp - pTimestamp);
        const secondPart = dTimestamp / 1000;
        pTimestamp = timestamp;

        ball.x += secondPart * ball.speed * Math.cos(ball.angle);
        ball.y -= secondPart * ball.speed * Math.sin(ball.angle);

        platforma.leftKey ? platforma.x = Math.max(0, platforma.x - secondPart * platforma.speed) :
            platforma.rightKey ? platforma.x = Math.min(canvas.width - platforma.width, platforma.x + secondPart * platforma.speed) : null;

        for (const block of blocks) {
            if (isIntersection(block, ball)) {
                toggleItem(blocks, block);
                const ctrl1 = {
                    x: block.x,
                    y: block.y - 10,
                    width: block.width,
                    height: 10
                }
                const ctrl2 = {
                    x: block.x + block.width,
                    y: block.y,
                    width: 10,
                    height: block.height
                }
                const ctrl3 = {
                    x: block.x,
                    y: block.y + block.height,
                    width: block.width,
                    height: 10
                }
                const ctrl4 = {
                    x: block.x - 10,
                    y: block.y,
                    width: 10,
                    height: block.height
                }
                if (isIntersection(ctrl1, ball) || isIntersection(ctrl3, ball)) {
                    ball.angle = Math.PI * 2 - ball.angle;
                } else if (isIntersection(ctrl2, ball) || isIntersection(ctrl4, ball)) {
                    ball.angle = Math.PI - ball.angle;
                }
                break;
            }
        }
        (isIntersection(limits[0], ball)) ? ball.angle = Math.PI * 2 - ball.angle :
            (isIntersection(limits[1], ball) || isIntersection(limits[3], ball)) ? ball.angle = Math.PI - ball.angle : null;
        if (isIntersection(platforma, ball)) {
            const x = ball.x + ball.width / 2;
            const percent = (x - platforma.x) / platforma.width;
            ball.angle = Math.PI - Math.PI * 8 / 10 * (percent + 0.05);
        }
        isIntersection(limits[2], ball) ? playing = false : null;
    }

    ball.drawBall();
    platforma.drawPlatforma();
    for (const block of blocks) {
        drawBlock(block);
    }

    !playing ? drawResult() : null;
}


function clearCanvas() {
    context.drawImage(space, 0, 0, space.width, space.height);
}

function isIntersection(blockA, blockB) {
    const pointsA = [
        {x: blockA.x, y: blockA.y},
        {x: blockA.x + blockA.width, y: blockA.y},
        {x: blockA.x, y: blockA.y + blockA.height},
        {x: blockA.x + blockA.width, y: blockA.y + blockA.height}
    ]
    for (const pointA of pointsA) {
        if (blockB.x < pointA.x && pointA.x < blockB.x + blockB.width && blockB.y < pointA.y && pointA.y < blockB.y + blockB.height) return true;
    }
    const pointsB = [
        {x: blockB.x, y: blockB.y},
        {x: blockB.x + blockB.width, y: blockB.y},
        {x: blockB.x, y: blockB.y + blockB.height},
        {x: blockB.x + blockB.width, y: blockB.y + blockB.height}
    ]
    for (const pointB of pointsB) {
        if (blockA.x < pointB.x && pointB.x < blockA.x + blockA.width && blockA.y < pointB.y && pointB.y < blockA.y + blockA.height) return true;
    }
    return false;
}

function toggleItem(array, item) {
    if (array.includes(item)) {
        const index = array.indexOf(item);
        array.splice(index, 1);
    } else {
        array.push(item);
    }
}

function getRandomFrom(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function drawResult() {
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fill();

    context.fillStyle = 'black';
    context.font = '50px Monaco';
    context.textAlign = 'center';
    context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 50);

    context.fillStyle = 'black';
    context.font = '30px Monaco';
    context.textAlign = 'center';
    context.fillText('For continue press enter', canvas.width / 2, canvas.height / 2 - 20);
}

