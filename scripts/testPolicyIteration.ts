import { AUTO_MDP } from "../src/LevelGeneration/autoMDP.ts";
import { Graph, policyIteration } from "../src/LevelGeneration/GDM-TS";

const pi = policyIteration(AUTO_MDP, 0.95, true, true, 20);
console.log(pi);
