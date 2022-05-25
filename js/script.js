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

const game = new Game;

// todo: create element walls
const limits = [
    new Rectangle({x: 0, y: -20, width: canvas.width, height: 20}),
    new Rectangle({x: canvas.width, y: 0, width: 20, height: canvas.height}),
    new Rectangle({x: 0, y: canvas.height, width: canvas.width, height: 20}),
    new Rectangle({x: -20, y: 0, width: 20, height: canvas.height})
]


document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' ? game.platforma.leftKey = true :
    e.key === 'ArrowRight' ? game.platforma.rightKey = true :
    !game.playing && e.key === 'Enter' ? game.init() : null;
})
document.addEventListener('keyup', function (e) {
    e.key === 'ArrowLeft' ? game.platforma.leftKey = false :
    e.key === 'ArrowRight' ? game.platforma.rightKey = false : null;
})

function clearCanvas() {
    context.drawImage(space, 0, 0, space.width, space.height);
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
