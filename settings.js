// Evolution settings
POPULATION_SIZE = 100;
MUTATION_RATE = 0.02;

// Car settings
const MAX_STEERING = 0.5;
const MAX_SPEED = 10;
const MAX_LIFESPAN = 10000;

// Car sensor settings
const ANGLE_BETWEEN_SENSORS = 20;
const SENSOR_DISTANCE = 100;
var SHOW_SENSORS = false;

// Road settings
var START_X, START_Y;
var DESTINATION_X, DESTINATION_Y;
var MAP_SIZE_X, MAP_SIZE_Y;
var finishLine;

// Roads
let boundaries = [];
let roads =[];

let maps = ['A','B','C', 'D', 'E'];

function mapA()
{
    MAP_SIZE_X = 950;
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

    DESTINATION_X = 550;
    DESTINATION_Y = 75;

    finishLine = new Boundary(550, 50, 550, 100);
    finishLine.show();
}

function mapB()
{
    MAP_SIZE_X = 950;
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

    START_X = 550;
    START_Y = 75;

    DESTINATION_X = 75;
    DESTINATION_Y = 475;

    finishLine = new Boundary(50, 475, 100, 475);
    finishLine.show();
}

function mapC()
{
    MAP_SIZE_X = 950;
    MAP_SIZE_Y = 600;
    
    // Section 1
    boundaries.push(new Boundary(50, 50, 300, 50));
    boundaries.push(new Boundary(50, 100, 275, 100));
    roads.push([50, 50, 250, 50, 0]);
    
    // Section 2
    boundaries.push(new Boundary(300, 50, 500, 350));
    boundaries.push(new Boundary(275, 100, 475, 400));
    roads.push([300, 50, 500, 350, 475, 400, 275, 100]);

    // Section 3
    boundaries.push(new Boundary(500, 350, 650, 350));
    boundaries.push(new Boundary(475, 400, 650, 400));
    roads.push([475, 350, 175, 50, 0]);

    // Ends
    boundaries.push(new Boundary(50, 50, 50, 100));
    boundaries.push(new Boundary(650, 350, 650, 400));

    START_X = 75;
    START_Y = 75;

    DESTINATION_X = 625;
    DESTINATION_Y = 375;

    finishLine = new Boundary(625, 350, 625, 400);
    finishLine.show();
}

function mapD()
{
    MAP_SIZE_X = 950;
    MAP_SIZE_Y = 600;
    
    // Section 1
    boundaries.push(new Boundary(50, 50, 300, 50));
    boundaries.push(new Boundary(50, 100, 275, 100));
    roads.push([50, 50, 250, 50, 0]);
    
    // Section 2
    boundaries.push(new Boundary(300, 50, 500, 350));
    boundaries.push(new Boundary(275, 100, 475, 400));
    roads.push([300, 50, 500, 350, 475, 400, 275, 100]);

    // Section 3
    boundaries.push(new Boundary(500, 350, 650, 350));
    boundaries.push(new Boundary(475, 400, 650, 400));
    roads.push([475, 350, 175, 50, 0]);

    // Ends
    boundaries.push(new Boundary(50, 50, 50, 100));
    boundaries.push(new Boundary(650, 350, 650, 400));

    START_X = 625;
    START_Y = 375;

    DESTINATION_X = 75;
    DESTINATION_Y = 75;

    finishLine = new Boundary(75, 50, 75, 100);
    finishLine.show();
}

function mapE()
{
    MAP_SIZE_X = 950;
    MAP_SIZE_Y = 600;
    
    // Section 1
    boundaries.push(new Boundary(200, 50, 600, 50));
    boundaries.push(new Boundary(225, 100, 575, 100));
    roads.push([200, 50, 400, 50, 0]);
    
    // Section 2
    boundaries.push(new Boundary(600, 50, 700, 125));
    boundaries.push(new Boundary(575, 100, 650, 150));
    roads.push([600, 50, 700, 125, 650, 150, 575, 100]);

    // Section 3
    boundaries.push(new Boundary(700, 125, 700, 400));
    boundaries.push(new Boundary(650, 150, 650, 375));
    roads.push([650, 125, 50, 275, 0]);

    // Section 4
    boundaries.push(new Boundary(700, 400, 600, 500));
    boundaries.push(new Boundary(650, 375, 575, 450));
    roads.push([650, 375, 700, 400, 600, 500, 575, 450]);

    // Section 5
    boundaries.push(new Boundary(600, 500, 200, 500));
    boundaries.push(new Boundary(575, 450, 225, 450));
    roads.push([200, 450, 400, 50, 0]);

    // Section 6
    boundaries.push(new Boundary(200, 500, 100, 400));
    boundaries.push(new Boundary(225, 450, 150, 375));
    roads.push([200, 500, 100, 400, 150, 375, 225, 450]);

    // Section 7
    boundaries.push(new Boundary(100, 400, 100, 150));
    boundaries.push(new Boundary(150, 375, 150, 175));
    roads.push([100, 150, 50, 250, 0]);

    // Section 8
    boundaries.push(new Boundary(100, 150, 200, 50));
    boundaries.push(new Boundary(150, 175, 225, 100));
    roads.push([150, 175, 100, 150, 200, 50, 225, 100]);

    START_X = 165;
    START_Y = 125;

    DESTINATION_X = 550;
    DESTINATION_Y = 475;

    finishLine = new Boundary(550, 450, 550, 500);
    finishLine.show();
}