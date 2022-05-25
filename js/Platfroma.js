class Platfroma extends Rectangle {
    constructor(param) {
        super(param);

        this.speed = param.speed;
        this.leftKey = false;
        this.rightKey = false;
    }
    drawPlatforma () {
        context.drawImage(image,
            root.platforma.x, root.platforma.y, root.platforma.width, root.platforma.height,
            this.x, this.y, this.width, this.height
        );
    }
}