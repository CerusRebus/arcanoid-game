class Ball extends Rectangle {
    constructor(param) {
        super(param);

        this.speed = param.speed;
        this.angle = param.angle;
    }
    drawBall() {
        context.drawImage(image, root.ball.x, root.ball.y, root.ball.width, root.ball.height, this.x, this.y, this.width, this.height);
    }
}