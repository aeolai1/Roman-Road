let alivePopulation = [];
let finishedPopulation = [];

let populationDisplaySelector;
let ethicalModeSelector;
let speedSlider;

let destination;
let generation = 0;
var ethicalMode;
var showAllCars = true;
var clock = 0;

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

    var p5Canvas = createCanvas(MAP_SIZE_X, MAP_SIZE_Y)
    p5Canvas.parent("p5");

    // Create the population of cars
    for (let i = 0; i < POPULATION_SIZE; i++) {
        alivePopulation[i] = new Car();
    }

    // Selector to display all/select cars
    populationDisplaySelector = createCheckbox(' Show entire population');
    populationDisplaySelector.position(MAP_SIZE_X-200, 75);
    populationDisplaySelector.checked('true');
    populationDisplaySelector.mousePressed(togglePopulationDisplay);
    populationDisplaySelector.style('font-family', 'sans-serif');
    populationDisplaySelector.style('color', 'white');

    // Selector to enable ethical mode
    ethicalModeSelector = createCheckbox(" Ethical mode");
    ethicalModeSelector.position(MAP_SIZE_X-200, 100);
    ethicalModeSelector.mousePressed(toggleEthicalMode);
    ethicalModeSelector.style('font-family', 'sans-serif');
    ethicalModeSelector.style('color', 'white');

    // Selector to show sensor beams
    sensorDisplaySelector = createCheckbox(" Show sensors");
    sensorDisplaySelector.position(MAP_SIZE_X-200, 50);
    sensorDisplaySelector.mousePressed(toggleSensorDisplay);
    sensorDisplaySelector.style('font-family', 'sans-serif');
    sensorDisplaySelector.style('color', 'white')

    // Slider to control the speed of the scenaro
    speedSlider = createSlider(0, 100, 2);
    speedSlider.position(50, MAP_SIZE_Y-50);

    // Button to save out data
    saveDataBtn = createButton("Save Data");
    saveDataBtn.position(MAP_SIZE_X-200, 155);
    saveDataBtn.mousePressed(saveData);

    textAlign(CENTER);
}

function draw() {
    background('rgb(75,140,97)');
    fill(255);
    textSize(16);
    noStroke();
    text('Generation ' + generation, MAP_SIZE_X-100, MAP_SIZE_Y-100);
    text('Population size ' + alivePopulation.length, MAP_SIZE_X-100, MAP_SIZE_Y-75);
    text('Timer ' + clock, MAP_SIZE_X-100, MAP_SIZE_Y-50);
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

        if (alivePopulation.length == 0) {
            nextGeneration();
            generation++;
            chart.update();
            clock = 0;
        }
    }
    clock++;
}

function saveData() {
    save(data, "cars_data.csv");
}

function toggleEthicalMode() {
    if (ethicalModeSelector.checked()) {
        ethicalMode = false;
        console.log('Ethical mode turned off');
    }
    else {
        ethicalMode = true;
        console.log('Ethical mode turned on');
    }
}

function togglePopulationDisplay() {
    if (populationDisplaySelector.checked()) {
        showAllCars = false;
    }
    else {
        showAllCars = true;
    }
}

function toggleSensorDisplay() {
    if (sensorDisplaySelector.checked()) {
        SHOW_SENSORS = false;
    }
    else {
        SHOW_SENSORS = true;
    }
}
