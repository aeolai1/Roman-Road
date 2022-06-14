 class Kerb {
    constructor(startX, startY, endX, endY) {
        this.a = createVector(startX, startY)
        this.b = createVector(endX, endY)
    }
      show() {
        stroke(0);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
      }
}