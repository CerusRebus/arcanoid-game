class Blocks extends Rectangle {
    constructor(param) {
        super(param);

        this.color = param.color;
    }
    drawBlock () {
        context.drawImage(image,
            root[this.color].x, root[this.color].y, root[this.color].width, root[this.color].height,
            this.x, this.y, this.width, this.height);
    }
}