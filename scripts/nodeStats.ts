import { AUTO_MDP } from "../src/LevelGeneration/autoMDP.ts";

// const NODE_NAME = "0_1_3_0_0_0_0_9-1";
// const NODE_NAME = "1_0_2_1_0_4_0_9-0";
const NODE_NAME = "4_0_2_0_0_0_0_6-0";

const N = AUTO_MDP.getNode(NODE_NAME);

console.log(N);
