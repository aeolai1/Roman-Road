// A sensor is a beam fired from a car that detects when it hits a boundary
// and measures the distance to the boundary
class Sensor {
    constructor(position, angle) {
        this.position = position;
        this.direction = p5.Vector.fromAngle(angle);
    }

    // sets the direction that the sensor beam fires in
    direction(x, y) {
        this.direction.x = x - this.pos.x;
        this.direction.y = y - this.pos.y;
        this.direction.normalize();
    }

    show() {
        stroke(255);
        push();
        translate(this.position.x, this.position.y);
        line(0, 0, this.direction.x * 10, this.direction.y * 10);
        pop();
    }

    detect(boundary) {
        // detect the intersection of the sensor beam and the boundary line
        // ref https://en.wikipedia.org/wiki/Line–line_intersection
        const x1 = boundary.a.x;
        const y1 = boundary.a.y;
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;

        const x3 = this.position.x;
        const y3 = this.position.y;
        const x4 = this.position.x + this.direction.x;
        const y4 = this.position.y + this.direction.y;

        // calculate the denominator
        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        
        // deals with the denominator being zero, which happens if the sensor beam and boundary are perfectly parallel
        if (denominator == 0) {
            return;
        }

        // calculate t and u
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        // use u&t to detect if there is an intersection
        if (t > 0 && t < 1 && u > 0) {
            //if the sensor beam intersects a boundary, return the co-ords of the intersect
            const intersect = createVector();
            intersect.x = x1 + t * (x2 - x1);
            intersect.y = y1 + t * (y2 - y1);
            return intersect;
        } else {
            // no intersection
            return;
        }
        }
    }
