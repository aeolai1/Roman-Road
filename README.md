# Evolutionary AI and Social Responsibility
This is an experiment examining how neuroevolution could potentially be used to bring about ethical behaviours in algorithms.

The purpose is to set multiple conflicting goals and use neuroevolution to explore the trade-offs. Goals fall into two types: task/engineering goals (e.g how quickly can a car get from start to finsh), and social/ethical goals (e.g co-operation with other drivers).

In the scenaro, an AI has the opportunity to "cheat", i.e. to disregard ethical or social norms, in order gain an advantage in the task/engineering goals. By experimenting with various combinations of less well defined ethical rewards/punishments ("soft goals") and more rigidly defined task goals ("hard goals") the experiment intends to explore:
1. The consequences of pursuing engineering objectives in neuroevolution (how ethically or socially acceptable/unacceptable is this?).
2. What happens if ethical objectives are pursued as a primary goal (i.e. as the fitness function for the neuroevolution).
3. What the trade-offs are between ethically/socially driven solutions, verses engineering driven solutions.
4. The mechanisms for embedding ethical or social norms into the pursuit of objectives, either directly (e.g., what are the minimal necessary objectives that need to be incorporated) or indirectly (e.g., from being influenced from AI’s observation of human behaviour or AI being rated by human observers); 
5. How individual users ethical or social perspectives can be used to personalise the behaviour of the algorithm.

## Components
 - p5.js is used for the drawing and animations
 - tensorflow.js is used for the neural networks
 - chart.js is used for the charts
 - The genetic algorythm is currently coded as part of the solution but may switch to something else (e.g. NEAT)

## To Do
 - [x] Give cars ability to vary speeds individually
 - [x] Add speed of completion to the task fitness calculation
 - [ ] Have each car evolve in seperate environments (grid)
 - [ ] Detect colisions between vehicles
 - [ ] Create ethical fitness function
 - [ ] Saving of the network model
 - [x] Graph the performance over time
 - [ ] Try adding mutation of the topology of the networks

## Colaborators
- Mr. Paul Murphy (Cardiff University)
- Prof. Roger Whitaker (Cardiff University)
- Dr Liam Turner  (Cardiff University)
- Prof. Alun Preece  (Cardiff University)

## References
 - Neuroevolution steering vehicles, Dan Shiffman, https://www.youtube.com/watch?v=mXDrH0wStHs&t=11127s
 - Line-line intersection, Wikipedia, https://en.wikipedia.org/wiki/Line–line_intersection
 - Steering Behaviors For Autonomous Characters, Craig Reynolds, https://www.researchgate.net/publication/2495826_Steering_Behaviors_For_Autonomous_Characters