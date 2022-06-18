// Road settings
const MAP = 'A';
var STARTING_POINT_X, STARTING_POINT_Y;
var MAP_SIZE_X, MAP_SIZE_Y;

// Car settings
const ANGLE_BETWEEN_SENSORS = 5;

// Network settings


// Evolution settings


// Roads
let boundaries =[];
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

    STARTING_POINT_X = 200;
    STARTING_POINT_Y = 325;
}
