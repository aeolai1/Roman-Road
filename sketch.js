let alivePopulation = [];
let finishedPopulation = [];

let displaySelector;
let ethicalModeSelector;
let speedSlider;

let destination;
let generation = 0;
var ethicalMode;

function setup() {
    tf.setBackend('cpu');

    // Map selector
    if(MAP=='A') {
        mapA();
    }
    else if(MAP=='B') {
        mapB();
    }
    if (DESTINATION_X) {
        destination = createVector(DESTINATION_X,DESTINATION_Y);
    }

    createCanvas(MAP_SIZE_X, MAP_SIZE_Y)

    // Create the population of cars
    for (let i = 0; i < POPULATION_SIZE; i++) {
        alivePopulation[i] = new Car();
    }

    // Selector to display all/select cars
    displaySelector = createRadio();
    displaySelector.option('true', 'Show entire population');
    displaySelector.option('', 'Show only the best individual');
    displaySelector.selected('true');
    displaySelector.style('width', '460px');
    displaySelector.style('font-family', 'sans-serif');

    // Selector to enable ethical mode
    ethicalModeSelector = createCheckbox(" Ethical mode");
    ethicalModeSelector.position(30, MAP_SIZE_Y-50);
    ethicalModeSelector.mousePressed(ethicalMode);
    ethicalModeSelector.style('font-family', 'sans-serif');
    ethicalModeSelector.style('color', 'white');

    // Slider to control the speed of the scenaro
    speedSlider = createSlider(0, 10, 2);
    speedSlider.position(150, MAP_SIZE_Y-50);

    // Button to save out data
    saveDataBtn = createButton("Save Data");
    saveDataBtn.position(425, MAP_SIZE_Y-50);
    saveDataBtn.mousePressed(saveData);

    textAlign(CENTER);
}

function draw() {
    background('rgb(75,140,97)');
    fill(255);
    textSize(16);
    noStroke();
    text('Generation ' + generation, 600, MAP_SIZE_Y-50);
    text('Population size ' + alivePopulation.length, 600, MAP_SIZE_Y-25);
    text('Scenaro speed', speedSlider.x + speedSlider.width + 60, speedSlider.y);

    // Draw map
    for (let road of roads) {
        push();
        fill(200);
        noStroke();
        if (road[4] > 0) {
            quad(road[0], road[1], road[2], road[3], road[4], road[5], road[6], road[7])
        }
        else {
            rect(road[0], road[1], road[2], road[3]);
        }
        pop();

    }
    rectMode(CORNER);
    for (let boundary of boundaries) {
        boundary.show();
    }

    let bestIndividual = alivePopulation[0]; // use previous generation's best as initial best
    
    ellipse(START_X, START_Y, 10);
    start = createVector(START_X, START_Y);
    if (DESTINATION_X) {
        ellipse(DESTINATION_X, DESTINATION_Y, 10);
    }

    let showAllCars = displaySelector.value();

    // Speed controller
    const cycles = speedSlider.value();
    for (let n = 0; n < cycles; n++) {

        // Draw car and sensor beams
        for (let car of alivePopulation) {
            car.fireSensorBeam(boundaries);
            car.outOfBounds();
            car.update();
            car.check(destination);
            if (showAllCars) {

                car.show();
        }

            // Get the fittest one
            if (car.taskFitness > bestIndividual.taskFitness) {
                bestIndividual = car;
            }
        }

        bestIndividual.highlight();

        for(let i = alivePopulation.length -1; i >= 0; i--) {
            const car = alivePopulation[i];
            if (car.dead || car.finished) {
                finishedPopulation.push(alivePopulation.splice(i, 1)[0]);
            }
        }

        if (alivePopulation.length == 0)
        {
            nextGeneration();
            generation++;
        }
  }
}

function saveData() {
    save(data, "cars_data.csv");
  }

function ethicalMode() {
    if (ethicalModeSelector.checked()) {
        ethicalMode = false;
        console.log('Ethical mode turned off');
    }
    else {
        ethicalMode = true;
        console.log('Ethical mode turned on');
    }

}




