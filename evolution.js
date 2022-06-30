var data = [];
var chartDataX = [];
var chartDataY1 = [];
var chartDataY2 = [];
data.push('Generation, Individual, Reached Target, Time, Task Fitness, Ethical Fitness');

// Calculates the fitness of the individual cars,
// picks a member of the population to carry forward,
// and cleans up after the previous generation
function nextGeneration() {
    destination = createVector(DESTINATION_X, DESTINATION_Y);
    calculateFitness(destination);

    // Creates the next generation
    for (let i = 0; i < POPULATION_SIZE; i++) {
      alivePopulation[i] = selection();
    }

    // Clean up after previous generation and memory management
    for (let i = 0; i < POPULATION_SIZE; i++) {
      finishedPopulation[i].dispose();
    }
    finishedPopulation = [];
  }
  
  // Picks a car from the population based on its fitness with
  // higher fitness cars given a better probability of selection
  function selection() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
      r = r - finishedPopulation[index].taskFitness;
      index++;
    }
    index--;
    let car = finishedPopulation[index];
    let child = new Car(car.neuralNet);
    child.mutate();
    return child;
  }
  
  // Calculates the fitness of each member of the population
  function calculateFitness(target) {
    let topScore = 0;
    for (let car of finishedPopulation) {
      car.calculateFitness(target);
    }

    // Normalise and calculate the population average fitness
    let sumTotal = 0;
    for (i = 0; i < finishedPopulation.length; i++) {
      // Save data on the individual's performance
      data.push(generation + ',' + i + ',' + finishedPopulation[i].finished + ',' + finishedPopulation[i].timer + ',' + finishedPopulation[i].taskFitness + ',' + finishedPopulation[i].ethicalFitness);
      if (finishedPopulation[i].taskFitness > topScore) {
        topScore = finishedPopulation[i].taskFitness;
      }
      sumTotal += finishedPopulation[i].taskFitness;
    }
    for (let car of finishedPopulation) {
      car.taskFitness = car.taskFitness / sumTotal;
      //console.log(car.taskFitness)
    }

    // Update performance chart
    chartDataX.push(generation);
    chartDataY1.push(sumTotal/POPULATION_SIZE);
    chartDataY2.push(topScore);
    console.log('Average task fitness of generation ' + generation + ': '+ sumTotal/POPULATION_SIZE)
  }