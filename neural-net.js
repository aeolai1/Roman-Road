// A neural network that will not be trained using
// conventional supervised learning, but will be evolved using a
// genetic algorythm.

class NeuralNetwork {
    constructor(numbOfInputNodes, numbOfHiddenNodes, numbOfOutputNodes, parent) {
      if (parent instanceof tf.Sequential) {
        this.model = parent;
        this.input_nodes = numbOfInputNodes;
        this.hidden_nodes = numbOfHiddenNodes;
        this.output_nodes = numbOfOutputNodes;
      }
      else {
        this.input_nodes = numbOfInputNodes;
        this.hidden_nodes = numbOfHiddenNodes;
        this.output_nodes = numbOfOutputNodes;
        this.model = this.createModel();
      }
    }
    
    // Creates a complete copy of a neural network in its current state
    copy() {
      return tf.tidy(() => {
        const modelCopy = this.createModel();
        const weights = this.model.getWeights();
        const weightCopies = [];
        for (let i = 0; i < weights.length; i++) {
          weightCopies[i] = weights[i].clone();
        }
        modelCopy.setWeights(weightCopies);
        return new NeuralNetwork(this.input_nodes, this.hidden_nodes, this.output_nodes, modelCopy);
      });
    }

    // Makes random changes to the weights of a neural network.
    // Uses a random gaussian distribution 
    // with median of 1 to determine how much to mutate by
    mutate(rate) {
      tf.tidy(() => {
        const weights = this.model.getWeights();
        const mutatedWeights = [];
        for (let i = 0; i < weights.length; i++) {
          let tensor = weights[i];
          let shape = weights[i].shape;
          let values = tensor.dataSync().slice();
          for (let j = 0; j < values.length; j++) {
            if (random(1) < rate) {
              let w = values[j];
              values[j] = w + randomGaussian();
            }
          }
          let newTensor = tf.tensor(values, shape);
          mutatedWeights[i] = newTensor;
        }
        this.model.setWeights(mutatedWeights);
      });
    }
  
    dispose() {
      this.model.dispose();
    }
  
    predict(inputs) {
      return tf.tidy(() => {
        const xs = tf.tensor2d([inputs]);
        const ys = this.model.predict(xs);
        const outputs = ys.dataSync();
        return outputs;
      });
    }
  
    createModel() {
      const model = tf.sequential();
      const hidden1 = tf.layers.dense({
        units: this.hidden_nodes,
        inputShape: [this.input_nodes],
        activation: 'sigmoid'
      });
      const hidden2 = tf.layers.dense({
        units: this.hidden_nodes,
        inputShape: this.hidden_nodes,
        activation: 'sigmoid'
      });
      const hidden3 = tf.layers.dense({
        units: this.hidden_nodes,
        inputShape: this.hidden_nodes,
        activation: 'sigmoid'
      });
      model.add(hidden1);
      model.add(hidden2);
      model.add(hidden3);
      const output = tf.layers.dense({
        units: this.output_nodes,
        activation: 'sigmoid'
      });
      model.add(output);
      return model;
    }

    // Saves the Tensorflow model to the browser's storage for later use
    saveModel() {
      (async ()=>{
        try {
          const saveResult = await this.model.save('indexeddb://car-model');
          alert('Car saved to browser storage');
          console.log('Car saved to browser');
        }
        catch(error) {
          alert('An error occured, car not saved.');
          console.log('An error occured saving the model to browser storage: ' + error);
        }
      })()
    }

    // Loads a model from browser storage
    loadModel() {
      (async ()=>{
        const loadResult = await tf.loadLayersModel('indexeddb://car-model');
        this.model = loadResult;
    })()
    }
}
