let alivePopulation = [];
let finishedPopulation = [];

let autoMapSelector;
let populationDisplaySelector;
let ethicalModeSelector;
let speedSlider;
let mapSelector;

let destination;
let generation = 0;
let bestIndividual;

var ethicalMode;
var autoMapChanging = true;
var showAllCars = true;
var clock = 0;

function setup() {
    tf.setBackend('cpu');

    var p5Canvas = createCanvas(1, 1)
    p5Canvas.parent("p5");
    
    // Position the dropdown menu
    mapSelector = createSelect();
    for (i=0; i < maps.length; i++) {
        mapSelector.option(maps[i]);
    }
    mapSelector.changed(mapChanged);
    mapSelector.disable();

    // Selector to display all/select cars
    populationDisplaySelector = createCheckbox(' Show entire population');
    populationDisplaySelector.checked('true');
    populationDisplaySelector.mousePressed(togglePopulationDisplay);
    populationDisplaySelector.style('font-family', 'sans-serif');
    populationDisplaySelector.style('color', 'white');

    // Selector to show sensor beams
    sensorDisplaySelector = createCheckbox(' Show sensors');
    sensorDisplaySelector.mousePressed(toggleSensorDisplay);
    sensorDisplaySelector.style('font-family', 'sans-serif');
    sensorDisplaySelector.style('color', 'white');

    // Selector to enable auto map changing
    autoMapSelector = createCheckbox(' Auto change map');
    autoMapSelector.checked('true');
    autoMapSelector.mousePressed(toggleAutoMap);
    autoMapSelector.style('font-family', 'sans-serif');
    autoMapSelector.style('color', 'white');

    // Selector to enable ethical mode
    ethicalModeSelector = createCheckbox(" Ethical mode");
    //ethicalModeSelector.position(MAP_SIZE_X-200, 150);
    ethicalModeSelector.mousePressed(toggleEthicalMode);
    ethicalModeSelector.style('font-family', 'sans-serif');
    ethicalModeSelector.style('color', 'white');

    // Slider to control the speed of the scenaro
    speedSlider = createSlider(0, 100, 2);
    speedSlider.position(50, MAP_SIZE_Y-50);

    // Button to save out data
    saveDataBtn = createButton("Save data");
    //saveDataBtn.position(MAP_SIZE_X-200, 180);
    saveDataBtn.mousePressed(saveData);

    // Button to save car
    saveCarBtn = createButton("Save highlighted car");
    //saveCarBtn.position(MAP_SIZE_X-200, 205);
    saveCarBtn.mousePressed(saveCar);

    // Button to load car
    loadCarBtn = createButton("Add saved car");
    //loadCarBtn.position(MAP_SIZE_X-200, 230);
    loadCarBtn.mousePressed(loadSavedCar);

    // Button to start the next generation
    nextGenBtn = createButton("Next generation");
    //nextGenBtn.position(MAP_SIZE_X-200, 255);
    nextGenBtn.mousePressed(endCurrentGeneration);

    loadMap('A');

    // Create the population of cars
    for (let i = 0; i < POPULATION_SIZE; i++) {
        alivePopulation[i] = new Car();
    }

    textAlign(CENTER);
}

function draw() {
    background('rgb(75,140,97)');
    fill(255);
    textSize(16);
    noStroke();
    text('Map: ', MAP_SIZE_X-185, 58);
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
            stroke(255);
            boundary.show();
    }

    if(finishLine) {
        push()
            stroke('yellow');
            fill(170, 20, 60);
            strokeWeight(8); 
            finishLine.show();
        pop()
    }

    bestIndividual = alivePopulation[0]; // use previous generation's best as initial best
    
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

        if(alivePopulation.length > 0) {
            bestIndividual.highlight();
        }
    }
    clock++;
}

function saveData() {
    save(data, "cars_data.csv");
}

function saveCar() {
    bestIndividual.saveModel();
}

// Loads the saved Tensorflow model from browser storage and
// adds it to the current population as a new car
function loadSavedCar() {
    (async ()=>{
        try {
            const loadResult = await tf.loadLayersModel('indexeddb://car-model');
            alivePopulation.push(new Car(false, loadResult));
            alert('Successfully added car from model');
            console.log('Successfully loaded model');
        }
        catch(error) {
            alert('An error occured, model not loaded: ' + error);
            console.log('Error saving loading the model from browser storage: ' + error);
        }
    })()
}

function toggleAutoMap() {
    if (autoMapSelector.checked()) {
        autoMapChanging = false;
        mapSelector.removeAttribute('disabled');
    }
    else {
        autoMapChanging = true;
        mapSelector.disable();
    }
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

// Ends the current generation by killing all alive cars
function endCurrentGeneration() {
    for(let i = alivePopulation.length -1; i >= 0; i--) {
        const car = alivePopulation[i];
        car.kill();
    }
}

function mapChanged() {
    loadMap(mapSelector.value());
}

function loadMap(mapID) {
    console.log('Loading map ' + mapID)

    // Clear exisiting map
    boundaries.length = 0;
    roads.length = 0;

    // Load new map
    if(mapID=='A') {
        mapA();
    }
    else if(mapID=='B') {
        mapB();
    }
    else if(mapID=='C') {
        mapC();
    }
    else if(mapID=='D') {
        mapD();
    }
    else if(mapID=='E') {
        mapE();
    }
    resizeCanvas(MAP_SIZE_X, MAP_SIZE_Y);
    if (DESTINATION_X) {
        destination = createVector(DESTINATION_X,DESTINATION_Y);
    }

    // Reposition UI controls
    mapSelector.position(MAP_SIZE_X-160, 50);
    autoMapSelector.position(MAP_SIZE_X-200, 75);
    populationDisplaySelector.position(MAP_SIZE_X-200, 100);
    sensorDisplaySelector.position(MAP_SIZE_X-200, 125);
    // ethicalModeSelector.position(MAP_SIZE_X-200, 150);
    speedSlider.position(50, MAP_SIZE_Y-50);
    saveDataBtn.position(MAP_SIZE_X-200, 180);
    saveCarBtn.position(MAP_SIZE_X-200, 205);
    loadCarBtn.position(MAP_SIZE_X-200, 230);
    nextGenBtn.position(MAP_SIZE_X-200, 255);
}
function autoChangeMap() {
    if(autoMapChanging) {
        randomMap = maps[Math.floor(Math.random() * maps.length)];
        loadMap(randomMap);
        mapSelector.selected(randomMap);
    }
}
