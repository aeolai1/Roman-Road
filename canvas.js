function setup() {
    // map selector
    if(MAP=='A') {
        mapA();
    }

    createCanvas(MAP_SIZE_X, MAP_SIZE_Y)
    car = new Car();
}

function draw() {
    background('rgb(75,140,97)');

    // draw boundaries, car, sensor beams
    for (let boundary of boundaries) {
      boundary.show();
  }

  car.show();
  car.fireSensorBeam(boundaries);
  car.update(mouseX, mouseY);
  }
