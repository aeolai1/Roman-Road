function setup() {
    createCanvas(1600,1000)
    
    if(MAP=='A')
        mapA();
}

function draw() {
    background('rgb(75,140,97)');

    for (let kerb of kerbs) {
        kerb.show();
      }
  }