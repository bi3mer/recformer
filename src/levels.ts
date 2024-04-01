// Generated by ../levels/combiner.py
import { Graph } from "./GDM-TS";
import {CustomNode } from "./customNode";
import { KEY_DEATH, KEY_END, KEY_START } from "./constants";

// ========= Nodes =========
export const MDP = new Graph();

MDP.addNode(new CustomNode(KEY_START, 0, 0, false, []));MDP.addNode(new CustomNode(KEY_DEATH, -1, 0, true, []));
MDP.addNode(new CustomNode(KEY_END, 1, 0, true, []));

MDP.addNode(new CustomNode("4-b", -0.4444444444444444, 0, false, []));
MDP.addNode(new CustomNode("2-b", -0.6666666666666666, 0, false, []));
MDP.addNode(new CustomNode("3-b", -0.5555555555555556, 0, false, []));
MDP.addNode(new CustomNode("4-a", -0.4444444444444444, 0, false, []));
MDP.addNode(new CustomNode("3-a", -0.5555555555555556, 0, false, []));
MDP.addNode(new CustomNode("2-a", -0.6666666666666666, 0, false, []));
MDP.addNode(new CustomNode("6-a", -0.2222222222222222, 0, false, []));
MDP.addNode(new CustomNode("1-a", -0.7777777777777778, 0, false, []));
MDP.addNode(new CustomNode("5-c", -0.3333333333333333, 0, false, []));
MDP.addNode(new CustomNode("5-a", -0.3333333333333333, 0, false, []));
MDP.addNode(new CustomNode("5-b", -0.3333333333333333, 0, false, []));

// ========= Edges =========
MDP.addDefaultEdge("4-b", "5-a", [["5-a", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("4-b", "5-b", [["5-b", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("4-b", "5-c", [["5-c", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge("2-b", "3-a", [["3-a", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge("3-b", "4-a", [["4-a", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("3-b", "4-b", [["4-b", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge("4-a", "5-a", [["5-a", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("4-a", "5-b", [["5-b", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("4-a", "5-c", [["5-c", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge("3-a", "4-a", [["4-a", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("3-a", "4-b", [["4-b", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge("2-a", "3-b", [["3-b", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge("6-a", "end", [["end", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge(KEY_START, "1-a", [["1-a", 0.99], [KEY_DEATH, 0.01]])
MDP.addDefaultEdge("1-a", "2-a", [["2-a", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("1-a", "2-b", [["2-b", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge("5-c", "5-a", [["5-a", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("5-c", "5-b", [["5-b", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("5-c", "6-a", [["6-a", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge("5-a", "5-b", [["5-b", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("5-a", "5-c", [["5-c", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("5-a", "6-a", [["6-a", 0.99], [KEY_DEATH, 0.01]]);

MDP.addDefaultEdge("5-b", "5-a", [["5-a", 0.99], [KEY_DEATH, 0.01]]);
MDP.addDefaultEdge("5-b", "6-a", [["6-a", 0.99], [KEY_DEATH, 0.01]]);


// ========= Level Segments =========
export const idToLevel:{ [key: string]: string[] } = {
  "4-b": [
    "--------------------XX",
    "--------------------XX",
    "--------------------XX",
    "--------------------XX",
    "--------------------XX",
    "-------------H------XX",
    "-----------------o--XX",
    "--------------------XX",
    "-----------XXXXXXX--XX",
    "--------------------XX",
    "-------X------------XX",
    "------XXX-----------XX",
    "-----XXXXX-----------o",
    "----XXXXXXX-----------",
    "XXXXXXXXXXXXXXXX--XXXX"
  ],
  "2-b": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "-----------o----------",
    "--------------------o-",
    "-----X---H-----X------",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "3-b": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "-----------o----------",
    "--------------------o-",
    "-----X---H-----X------",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "4-a": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "-----------------X----",
    "-----------------V----",
    "-------X--------------",
    "------XX------o----o--",
    "-----XXX--------------",
    "XXXXXXXX---XXXXXXXXXXX"
  ],
  "3-a": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "-------XXXXXXXX-------",
    "----------------------",
    "-------V--o---V-------",
    "----------------------",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "end": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----oooooooooooooooooo",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "2-a": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "-------XXXXXXXX-------",
    "----------------------",
    "-------V--o---V-------",
    "----------------------",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "6-a": [
    "-----------------o--V-----o--------",
    "-----------------H--------H--------",
    "------------XXXXXXXXXXXXXXXXXXX----",
    "-----V--------------H--------------",
    "--------XX----o--------------------",
    "-----------------------------------",
    "-----------XXXXXX---Ho-------------",
    "-----------------------------------",
    "-------------V------XX--------H----",
    "-----------------------------------",
    "XX--------o------XXXXX----H--------",
    "-----------------------------------",
    "---X----H----H-X-----------------o-",
    "---XXXXXXXXXXXXX-------------------",
    "------------------------------XXXXX"
  ],
  "1-a": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "--------------X-------",
    "-----o-----o--X------o",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "5-c": [
    "0-----------------------------",
    "------------------------------",
    "X---XX------------------------",
    "------------------------------",
    "--------XX--------------------",
    "XX----------------------------",
    "--------XXXXX-----------------",
    "--------Xoo-------------------",
    "XXX-----Xoo----o------------o-",
    "--------X---------------------",
    "--------XXX---XX----XX----XXXX",
    "XXXX--------------------------",
    "------------------------------",
    "------------------------------",
    "XXXXXXXX----------------------"
  ],
  "5-a": [
    "---------------------X--------",
    "-------------------o-X--------",
    "---------------------X--------",
    "---------------------X--------",
    "------------------XXXX--------",
    "------------------------------",
    "-----------o--XX--------------",
    "------------------------------",
    "----------XX----------------o-",
    "------------------------------",
    "--------------XX---XXX----XXXX",
    "------------------------------",
    "----------XX------------------",
    "------------------------------",
    "XXXXXXXX----------------------"
  ],
  "5-b": [
    "------------------------------",
    "-o----------------------------",
    "------------------------------",
    "XXX---------------------------",
    "------------------------------",
    "-----XXX----------------------",
    "------------------------------",
    "-----------XXX-----------------",
    "-0--------------------------o-",
    "------XXX---------------------",
    "XXX-----------------------XXXX",
    "------------XXX-------XX------",
    "------------------XX----------",
    "------------------------------",
    "XXXXXXXX---XXXXX--------------"
  ]
};
