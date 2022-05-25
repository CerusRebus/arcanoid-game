class Game {
    constructor() {
        this.ball = null;
        this.platforma = null;
        this.blocks = [];
        this.playing = false;
        this.pTimestamp = 0;

        this.init();

        requestAnimationFrame(x => this.tick(x));
    }
    init () {
        this.playing = true;

        // todo: create element ball
        this.ball = new Ball({
            x: canvas.width / 2 - 5,
            y: canvas.height - 50,
            width: 10,
            height: 10,
            speed: 200,
            angle: Math.PI / 4 + Math.random() * Math.PI / 2,
        });

        // todo: create element platform
        this.platforma = new Platfroma({
            x: canvas.width / 2 - 50,
            y: canvas.height - 30,
            width: 100,
            height: 20,
            speed: 200,
            leftKey: false,
            rightKey: false
        });

        // todo: create elements blocks
        this.blocks = [];
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 10; y++) {
                this.blocks.push(new Blocks({
                    x: 50 + 50 * x,
                    y: 50 + 20 * y,
                    width: 50,
                    height: 20,
                    color: getRandomFrom(['silver', 'orange', 'blue', 'green', 'red', 'darkblue', 'pink', 'yellow'])
                }));
            }
        }
    }
    tick(timestamp) {
        requestAnimationFrame(x => this.tick(x));

        clearCanvas();

        if (this.playing) {
            const dTimestamp = Math.min(16.7, timestamp - this.pTimestamp);
            const secondPart = dTimestamp / 1000;
            this.pTimestamp = timestamp;

            this.ball.x += secondPart * this.ball.speed * Math.cos(this.ball.angle);
            this.ball.y -= secondPart * this.ball.speed * Math.sin(this.ball.angle);

            this.platforma.leftKey ? this.platforma.x = Math.max(0, this.platforma.x - secondPart * this.platforma.speed) :
                this.platforma.rightKey ? this.platforma.x = Math.min(canvas.width - this.platforma.width, this.platforma.x + secondPart * this.platforma.speed) : null;

            for (const block of this.blocks) {
                if (block.isIntersection(this.ball)) {
                    toggleItem(this.blocks, block);
                    const ctrl1 = new Rectangle( {
                        x: block.x,
                        y: block.y - 10,
                        width: block.width,
                        height: 10
                    });
                    const ctrl2 = new Rectangle( {
                        x: block.x + block.width,
                        y: block.y,
                        width: 10,
                        height: block.height
                    });
                    const ctrl3 = new Rectangle( {
                        x: block.x,
                        y: block.y + block.height,
                        width: block.width,
                        height: 10
                    });
                    const ctrl4 = new Rectangle( {
                        x: block.x - 10,
                        y: block.y,
                        width: 10,
                        height: block.height
                    });
                    if (ctrl1.isIntersection(this.ball) || ctrl3.isIntersection(this.ball)) {
                        this.ball.angle = Math.PI * 2 - this.ball.angle;
                    } else if (ctrl2.isIntersection(this.ball) || ctrl4.isIntersection(this.ball)) {
                        this.ball.angle = Math.PI - this.ball.angle;
                    }
                    break;
                }
            }
            limits[0].isIntersection(this.ball) ? this.ball.angle = Math.PI * 2 - this.ball.angle :
            (limits[1].isIntersection(this.ball)|| limits[3].isIntersection(this.ball)) ? this.ball.angle = Math.PI - this.ball.angle : null;
            if (this.platforma.isIntersection(this.ball)) {
                const x = this.ball.x + this.ball.width / 2;
                const percent = (x - this.platforma.x) / this.platforma.width;
                this.ball.angle = Math.PI - Math.PI * 8 / 10 * (percent + 0.05);
            }
            limits[2].isIntersection(this.ball) ? this.playing = false : null;
        }

        this.ball.drawBall();
        this.platforma.drawPlatforma();
        for (const block of this.blocks) {
            block.drawBlock();
        }

        !this.playing ? drawResult() : null;
    }
}