class Rectangle {
    constructor(param) {
        this.x = param.x;
        this.y = param.y;
        this.width = param.width;
        this.height = param.height;
    }
    /* drawRectangle () {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.strokeStyle = 'red';
        context.stroke();
    } */
    isIntersection (rectangle) {
        return Rectangle.isIntersection(this, rectangle);
    }
    static isIntersection(rectangleA, rectangleB) {
        const pointsA = [
            {x: rectangleA.x, y: rectangleA.y},
            {x: rectangleA.x + rectangleA.width, y: rectangleA.y},
            {x: rectangleA.x, y: rectangleA.y + rectangleA.height},
            {x: rectangleA.x + rectangleA.width, y: rectangleA.y + rectangleA.height}
        ]
        for (const pointA of pointsA) {
            if (rectangleB.x < pointA.x && pointA.x < rectangleB.x + rectangleB.width && rectangleB.y < pointA.y && pointA.y < rectangleB.y + rectangleB.height) return true;
        }
        const pointsB = [
            {x: rectangleB.x, y: rectangleB.y},
            {x: rectangleB.x + rectangleB.width, y: rectangleB.y},
            {x: rectangleB.x, y: rectangleB.y + rectangleB.height},
            {x: rectangleB.x + rectangleB.width, y: rectangleB.y + rectangleB.height}
        ]
        for (const pointB of pointsB) {
            if (rectangleA.x < pointB.x && pointB.x < rectangleA.x + rectangleA.width && rectangleA.y < pointB.y && pointB.y < rectangleA.y + rectangleA.height) return true;
        }
        return false;
    }
}