// A car is an object capable of moving in any direction, with various speeds
// that uses sensors to detect nearby objects and to navigate around them
class Car {
    constructor(parentNeuralNet, modelToLoad) {
        this.position = createVector(START_X, START_Y); // Starting position of the car
        this.beams = []; // Array of sensor beams emitted from the car
        this.dead = false; // Indicates that the car has crashed
        this.finished = false // Indicates the car has successfully reached the end point
        this.taskFitness = 0;
        this.timer = 0; // the number of cycles it takes to complete the track (or die)
        this.ethicalFitness = 0;
        this.velocity = createVector();
        this.acceleration = createVector();
        this.highlighted = false;

        // Create a variable number of sensors that fire beams from the car at specified angles
        for (let angle = 0; angle < 360; angle += ANGLE_BETWEEN_SENSORS) {
            this.beams.push(new Sensor(this.position, radians(angle)));
        }

        // If the car has a parent, use their neural net
        if (parentNeuralNet) {
            this.neuralNet = parentNeuralNet.copy();
        }
        // If a model has been loaded from storage, use that
        else if (modelToLoad) {
            this.neuralNet = new NeuralNetwork(this.beams.length, this.beams.length, 2, modelToLoad);
        }
        // Create a NN from scratch
        else {
            // Creates the neural nework with an input for each sensor beam,
            // a corrisponding number of hidden nodes, and 1 output (steering)
            this.neuralNet = new NeuralNetwork(this.beams.length, this.beams.length, 2);
        }
    }

    show() {
        push();
            translate(this.position.x, this.position.y);
            const heading = this.velocity.heading();
            rotate(heading);

            // car visuals 
            fill(255, 100);
            rectMode(CENTER);
            rect(0, 0, 20, 10);
        pop();
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    // controls the car's position, 
    update() {
        if(!this.dead && !this.finished)
        {
            this.position.add(this.velocity);
            this.velocity.add(this.acceleration);
            this.velocity.limit(MAX_SPEED)

            //kill the car if it exceeds maximum allowed lifespan
            this.acceleration.set(0,0);
            this.timer++;
            if (this.timer > MAX_LIFESPAN) {
                this.dead = true;
            }
        }
    }

    // Checks whether the car has reached the destination
    check(target) {
        const distance = p5.Vector.dist(this.position, target);
        if (distance < 50) {
            this.finished = true;
        }
    }

    // Creates a sensor beam and determines if it senses a boundary
    // if there are multiple boundaries in a beams path, we determine which one is the closest
    // the sensor beam then stops at the closest boundary (i.e. it doesn't shine through to the other boundary)
    fireSensorBeam(boundaries) {
        const inputs = []; 
        for (let i = 0; i < this.beams.length; i++) {
            let closestBoundary = null;
            let recordDistance = SENSOR_DISTANCE;

            // For each boundary, works out if there is an intersection with the sensor beam 
            // and if so, is it the closest one
            for (let boundary of boundaries) {

                const intersect = this.beams[i].detect(boundary);
                if (intersect) {
                    const distance = p5.Vector.dist(this.position, intersect);
                    if (distance < recordDistance && distance < SENSOR_DISTANCE) {
                        recordDistance = distance;
                        closestBoundary = intersect;
                    }
                }
            }

            inputs[i] = map(recordDistance, 0, 50, 1, 0);

            // Detect collision
            if (recordDistance < 2) {
                this.dead = true;
            }

            if (closestBoundary && ((SHOW_SENSORS && showAllCars) || SHOW_SENSORS && this.highlighted)) {
                line(this.position.x, this.position.y, closestBoundary.x, closestBoundary.y);
            }
        }
        const output = this.neuralNet.predict(inputs);
        const angle = map(output[0], 0, 1, 0, TWO_PI);
        const steering = p5.Vector.fromAngle(angle);
        steering.setMag(output[1]);
        steering.sub(this.velocity);
        steering.limit(MAX_STEERING);
        this.applyForce(steering);
    }

    calculateFitness(target) {
        if (this.finished) {
            // For cars that complete the track use time taken
            // to calculate fitness
            this.taskFitness = MAX_LIFESPAN-this.timer;
        } else {
            // For cars that don't finish the track, calculate
            /// fitness based on distance away from the destination
            const d = p5.Vector.dist(this.position, target);
            this.taskFitness = constrain(1 / d, 0, 1);
        }
    }

    mutate() {
        this.neuralNet.mutate(MUTATION_RATE);
    }

    dispose() {
        this.neuralNet.dispose();
    }

    // Kills car if it goes off the canvas
    outOfBounds() {
        if (this.position.x < 0 || this.position > MAP_SIZE_X || this.position.y < 0 || this.position.y > MAP_SIZE_Y)
            this.dead = true;
    }

    //Kills the car
    kill() {
        this.dead = true;
    }

    // Changes the drawing style of a car
    // used to highlight the best performing individual
    highlight() {
        this.highlighted = true;
        push();
            translate(this.position.x, this.position.y);
            const heading = this.velocity.heading();
            rotate(heading);
            stroke(255, 255, 255);
            fill(170, 20, 60, 200);
            rectMode(CENTER);
            rect(0, 0, 20, 10);
        pop();

        //display highlighted car's speed
        push();
            fill(170, 20, 60);
            noStroke();
            var speed = mag(this.velocity.x, this.velocity.y);  //convert x,y vector velocity to a magnitude (speed)
            text('Current speed: ' + nf((speed*10), 2, 1), MAP_SIZE_X-100, MAP_SIZE_Y-25);
        pop();
    }

    saveModel() {
        this.neuralNet.saveModel();
    }

    loadModel() {
        this.neuralNet.loadModel();
    }
}
