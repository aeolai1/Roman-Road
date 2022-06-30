// Evolution settings
POPULATION_SIZE = 100;
MUTATION_RATE = 0.01;

// Car settings
const MAX_STEERING = 0.5;
const MAX_SPEED = 4;
const MAX_LIFESPAN = 500;

// Car sensor settings
const ANGLE_BETWEEN_SENSORS = 10;
const SENSOR_DISTANCE = 100;
var SHOW_SENSORS = false;

// Road settings
const MAP = 'B';
var START_X, START_Y;
var DESTINATION_X, DESTINATION_Y;
var MAP_SIZE_X, MAP_SIZE_Y;

// Roads
let boundaries = [];
let roads =[];

function mapA()
{
    MAP_SIZE_X = 1600;
    MAP_SIZE_Y = 1000;
    
    boundaries.push(new Boundary(300, 50, 1200, 50));
    boundaries.push(new Boundary(350, 150, 1150, 150));
    
    boundaries.push(new Boundary(1200, 50, 1400, 300));
    boundaries.push(new Boundary(1150, 150, 1300, 350));

    boundaries.push(new Boundary(1400, 300, 1400, 450));
    boundaries.push(new Boundary(1300, 350, 1300, 400));

    boundaries.push(new Boundary(1400, 450, 1050, 850));
    boundaries.push(new Boundary(1300, 400, 1000, 750));

    boundaries.push(new Boundary(1050, 850, 300, 850));
    boundaries.push(new Boundary(1000, 750, 400, 750));

    boundaries.push(new Boundary(300, 850, 100, 450));
    boundaries.push(new Boundary(400, 750, 250, 500));

    boundaries.push(new Boundary(100, 450, 300, 50));
    boundaries.push(new Boundary(250, 500, 350, 150));

    START_X = 200;
    START_Y = 325;

    DESTINATION_X = 1350;
    DESTINATION_Y = 400;
}

function mapB()
{
    MAP_SIZE_X = 900;
    MAP_SIZE_Y = 600;
    
    // Section 1
    boundaries.push(new Boundary(50, 500, 50, 200));
    boundaries.push(new Boundary(100, 500, 100, 250));
    roads.push([50, 200, 50, 300, 0]);

    // Section 2
    boundaries.push(new Boundary(50, 200, 150, 50));
    boundaries.push(new Boundary(100, 250, 200, 100));
    roads.push([50, 200, 100, 250, 200, 100, 150, 50]);

    // Section 3
    boundaries.push(new Boundary(150, 50, 600, 50));
    boundaries.push(new Boundary(200, 100, 600, 100));
    roads.push([150, 50, 450, 50, 0]);

    // Ends
    boundaries.push(new Boundary(600, 50, 600, 100));
    boundaries.push(new Boundary(50, 500, 100, 500));

    START_X = 75;
    START_Y = 490;

    DESTINATION_X = 600;
    DESTINATION_Y = 75;
}