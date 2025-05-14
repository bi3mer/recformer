export const CONFIG = {
  "death-reward": -1,
  "end-reward": 10,
  n: 3,
  "levels-are-horizontal": true,
  "start-population-size": 200,
  iterations: 100,
  "elites-per-bin": 5,
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
  "max-linker-length": 1,
  "computational-metrics": [
    {
      name: "verticalEnemies",
      max: 30,
    },
    {
      name: "horizontalEnemies",
      max: 30,
    },
    {
      name: "circleEnemies",
      max: 30,
    },
    {
      name: "lasers",
      max: 30,
    },
    {
      name: "turrets",
      max: 30,
    },
    {
      name: "coins",
      max: 30,
    },
    {
      name: "blueBlocks",
      max: 30,
    },
    // {
    //   name: "gaps",
    //   max: 30,
    // },
    {
      name: "inverseDensity",
      min: 0,
      max: 1,
      resolution: 30,
    },
    // {
    //   name: "pathLength",
    //   min: 0,
    //   max: 1,
    //   resolution: 15,
    // },
  ],
  seed: 42,
};
