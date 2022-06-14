//Road settings
const MAP = 'A';

//Car settings


//Network settings


//Evolution settings


//Roads
// specify as kerbs(start co-ord X, start co-ord Y, direction in degrees, length, width)
let kerbs =[];
function mapA()
{
    kerbs.push(new Kerb(300, 50, 1200, 50));
    kerbs.push(new Kerb(350, 150, 1150, 150));
    
    kerbs.push(new Kerb(1200, 50, 1400, 300));
    kerbs.push(new Kerb(1150, 150, 1300, 350));

    kerbs.push(new Kerb(1400, 300, 1400, 450));
    kerbs.push(new Kerb(1300, 350, 1300, 400));

    kerbs.push(new Kerb(1400, 450, 1050, 850));
    kerbs.push(new Kerb(1300, 400, 1000, 750));

    kerbs.push(new Kerb(1050, 850, 300, 850));
    kerbs.push(new Kerb(1000, 750, 400, 750));

    kerbs.push(new Kerb(300, 850, 100, 450));
    kerbs.push(new Kerb(400, 750, 250, 500));

    kerbs.push(new Kerb(100, 450, 300, 50));
    kerbs.push(new Kerb(250, 500, 350, 150));
}

