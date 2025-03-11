export const CONFIG = {
  "death-reward": -1,
  "end-reward": 1,
  n: 3,
  "levels-are-horizontal": true,
  "start-population-size": 50,
  iterations: 10,
  "elites-per-bin": 4,
  "start-strand-size": 10,
  "max-strand-size": 10,
  "n-gram-operators": true,
  "mutation-rate": 0.05,
  "structure-chars": [],
  "custom-liking-columns": [
    ["X--------------"],
    ["----X----------"],
    ["---------X-----"],
  ],
  "structure-size": 0,
  "allow-empty-link": true,
  "max-linker-length": 7,
  "computational-metrics": [
    {
      name: "linearity",
      min: 0,
      max: 1,
      resolution: 10,
    },
    {
      name: "leniency",
      min: 0,
      max: 1,
      resolution: 15,
    },
  ],
  seed: 42,
};
