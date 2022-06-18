// A car is an object capable of moving in any direction, with various speeds
// that uses sensors to detect nearby objects and to navigate around them
class Car {
    constructor() {
        this.position = createVector(STARTING_POINT_X, STARTING_POINT_Y); // starting position of the car
        this.beams = [];
        // create a variable number of sensors that fire beams from the car at specified angles
        for (let angle = 0; angle < 360; angle += ANGLE_BETWEEN_SENSORS) {
            this.beams.push(new Sensor(this.position, radians(angle)));
        }
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        // car visuals 
        fill(255, 100);
        rectMode(CENTER);
        rect(0, 0, 30, 15);
        pop();
    }

    // controls the car's position
    update (x,y) {
        this.position.set(x,y);
    }

    // creates a sensor beam and determines if it senses a boundary
    // if there are multiple boundaries in a beams path, we determine which one is the closest
    // the sensor beam then stops at the closest boundary (i.e. it doesn't shine through to the other boundary)
    fireSensorBeam(boundaries) {
        for (let beam of this.beams) {
            let closestBoundary = null;
            let recordDistance = Infinity;

            // for each boundary, works out if there is an intersection with the sensor beam 
            // and if so, is it the closest one
            for (let boundary of boundaries) {

                const intersect = beam.detect(boundary);
                if (intersect) {
                    const distance = p5.Vector.dist(this.position, intersect);
                    if (distance < recordDistance) {
                        recordDistance = distance;
                        closestBoundary = intersect;
                    }
                }
            }

            if (closestBoundary) {
                line(this.position.x, this.position.y, closestBoundary.x, closestBoundary.y);
            }
        }

    }
}
