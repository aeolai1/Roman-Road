var data = [];
data.push('Generation, Individual, Task Fitness, Ethical Fitness');

// Calculates the fitness of the individual cars,
// picks a member of the population to carry forward,
// and cleans up after the previous generation
function nextGeneration() {
    destination = createVector(DESTINATION_X, DESTINATION_Y);
    calculateFitness(destination);
    for (let i = 0; i < POPULATION_SIZE; i++) {
      alivePopulation[i] = selection();
    }

    // Clean up after previous generation and memory management
    for (let i = 0; i < POPULATION_SIZE; i++) {

      // Save data about the generation
      //console.log(generation + ',' + i + ',' + finishedPopulation[i].taskFitness + ',' + finishedPopulation[i].ethicalFitness);
      data.push(generation + ',' + i + ',' + finishedPopulation[i].taskFitness + ',' + finishedPopulation[i].ethicalFitness);
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
    for (let car of finishedPopulation) {
      car.calculateFitness(target);
      console.log(car.taskFitness);
    }

    //normalise and calculate the population average fitness
    let sumTotal = 0;
    for (let car of finishedPopulation) {
      sumTotal += car.taskFitness;
    }
    for (let car of finishedPopulation) {
      car.taskFitness = car.taskFitness / sumTotal;
      console.log(car.taskFitness)
    }
    console.log('Average task fitness of generation ' + generation + ': '+ sumTotal/POPULATION_SIZE)
  }