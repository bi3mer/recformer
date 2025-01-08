// Generated by ../levels/combiner.py
import { Graph } from "./GDM-TS";
import { CustomNode } from "./customNode";
import { KEY_DEATH, KEY_END, KEY_START } from "./constants";

// ========= Nodes =========
export const MDP = new Graph();

MDP.addNode(new CustomNode(KEY_START, 0, 0, false, [], -1));
MDP.addNode(new CustomNode(KEY_DEATH, -1, 0, true, [], -1));
MDP.addNode(new CustomNode(KEY_END, 1, 0, true, [], -1));

MDP.addNode(new CustomNode("1-a", -0.95, 0, false, [], 1));
MDP.addNode(new CustomNode("2-a", -0.925, 0, false, [], 2));
MDP.addNode(new CustomNode("2-b", -0.925, 0, false, [], 2));
MDP.addNode(new CustomNode("3-a", -0.9, 0, false, [], 3));
MDP.addNode(new CustomNode("3-b", -0.9, 0, false, [], 3));
MDP.addNode(new CustomNode("4-a", -0.825, 0, false, [], 4));
MDP.addNode(new CustomNode("4-b", -0.825, 0, false, [], 4));
MDP.addNode(new CustomNode("5-a", -0.8, 0, false, [], 5));
MDP.addNode(new CustomNode("5-b", -0.8, 0, false, [], 5));
MDP.addNode(new CustomNode("5-c", -0.8, 0, false, [], 5));
MDP.addNode(new CustomNode("6-a", -0.775, 0, false, [], 6));
MDP.addNode(new CustomNode("7-a", -0.75, 0, false, [], 7));
MDP.addNode(new CustomNode("6-b", -0.775, 0, false, [], 6));
MDP.addNode(new CustomNode("1-b", -0.95, 0, false, [], 1));

// ========= Edges =========
MDP.addDefaultEdge(KEY_START, "1-a", [
  ["1-a", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("1-a", "2-b", [
  ["2-b", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("1-a", "2-a", [
  ["2-a", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("2-a", "3-a", [
  ["3-a", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("2-b", "3-b", [
  ["3-b", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("3-a", "4-b", [
  ["4-b", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("3-a", "4-a", [
  ["4-a", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("3-b", "4-b", [
  ["4-b", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("3-b", "4-a", [
  ["4-a", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("4-a", "5-b", [
  ["5-b", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("4-a", "5-a", [
  ["5-a", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("4-a", "5-c", [
  ["5-c", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("4-b", "5-b", [
  ["5-b", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("4-b", "5-a", [
  ["5-a", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("4-b", "5-c", [
  ["5-c", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("5-a", "6-a", [
  ["6-a", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("5-a", "6-b", [
  ["6-b", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("5-b", "6-a", [
  ["6-a", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("5-b", "6-b", [
  ["6-b", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("5-c", "6-a", [
  ["6-a", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("5-c", "6-b", [
  ["6-b", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("6-a", "7-a", [
  ["7-a", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("7-a", "end", [
  ["end", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge("6-b", "7-a", [
  ["7-a", 0.99],
  [KEY_DEATH, 0.01],
]);

MDP.addDefaultEdge(KEY_START, "1-b", [
  ["1-b", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("1-b", "2-b", [
  ["2-b", 0.99],
  [KEY_DEATH, 0.01],
]);
MDP.addDefaultEdge("1-b", "2-a", [
  ["2-a", 0.99],
  [KEY_DEATH, 0.01],
]);

// ========= Level Segments =========
export const idToLevel: { [key: string]: string[] } = {
  "1-a": [
    "------------XXX-",
    "-------------T--",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "-----X-C-----X--",
    "--------------b-",
    "-----------o----",
    "--------o-XX----",
    "------o-XXXX----",
    "------XXXXXX----",
    "XXXXXXXXXXXXXXXX",
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
    "-------V--o---V-----o-",
    "----------------------",
    "XXXXXXXXXXXXXXXXXXXXXX",
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
    "XXXXXXXXXXXXXXXXXXXXXX",
  ],
  "3-a": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "-----------o----------",
    "----------------------",
    "---------XXXXX--------",
    "-----------o----------",
    "----------------------",
    "-------X-H-----X------",
    "---XX--XXXXXXXXX--XX--",
    "----------------------",
    "-------V---o---V----o-",
    "----------------------",
    "XXXXXXXXXXXXXXXXXXXXXX",
  ],
  "3-b": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------o-----------",
    "----------------------",
    "--------XXXXX---------",
    "--------V---V---------",
    "----------o-----------",
    "----------------------",
    "------XXXXXXXXX-------",
    "----------------------",
    "----------o---------o-",
    "-----X---H-----X------",
    "XXXXXXXXXXXXXXXXXXXXXX",
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
    "----------------XXX---",
    "-----------------V----",
    "-------X---XX-----V---",
    "------XX------o-V---o-",
    "-----XXX--------------",
    "XXXXXXXX---XXXXXXXXXXX",
  ],
  "4-b": [
    "--------------------XX",
    "--------------------XX",
    "--------------------XX",
    "--------------------XX",
    "--------------------XX",
    "-----------X-H---o--XX",
    "-----------------o--XX",
    "---------o----------XX",
    "-----------XXXXXXX--XX",
    "--------------------XX",
    "-------X------------XX",
    "------XXX-----------XX",
    "-----XXXXX-----------o",
    "----XXXXXXX-----------",
    "XXXXXXXXXXXXXXXX--XXXX",
  ],
  "5-a": [
    "--------XXXXXXXXXXXXXX--------",
    "-------------------ooX--------",
    "---------------------X--------",
    "---------------------X--------",
    "------------------XXXX--------",
    "------------------X-----------",
    "-----------o--XXXXX-----------",
    "------------------------------",
    "---------XX-----------------o-",
    "------------------------------",
    "--------------XX---XXX----XXXX",
    "------------------------------",
    "----------XX------------------",
    "------------------------------",
    "XXXXXXXX----------------------",
  ],
  "5-b": [
    "------------------------------",
    "-o----------------------------",
    "------------------------------",
    "XXX---------------------------",
    "------------------------------",
    "-----XXX----------------------",
    "------------------------------",
    "-----------XXX----------------",
    "-o--------------------------o-",
    "------XXX---------------------",
    "XXX-----------------------XXXX",
    "------------XXX-------XX------",
    "------------------XX----------",
    "------------------------------",
    "XXXXXXXX---XXXXX--------------",
  ],
  "5-c": [
    "o-----------------------------",
    "------------------------------",
    "X---XX------------------------",
    "------------------------------",
    "------------------------------",
    "XX----------------------------",
    "--------XXXXX-----------------",
    "--------Xoo-------------------",
    "XXX-----Xoo----o------------o-",
    "--------X---------------------",
    "--------XXX---XX----XX----XXXX",
    "XXXX--------------------------",
    "------------------------------",
    "------------------------------",
    "XXXXXXXX----------------------",
  ],
  "6-a": [
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "-------oo---XXXXXXXX----------",
    "-o----------XXXXXXXX----------",
    "------XXXX--XXXXXXXX----------",
    "--------------o---------------",
    "XXXX--------------------------",
    "-------------XXXX-----------o-",
    "---------------------XX-------",
    "XXXXXXXX-----------------XXXXX",
  ],
  "7-a": [
    "-------------------V---------------",
    "-----------------o---o-------------",
    "------------X-H------------H--XXX--",
    "-----V------XXXXXXXXXXXXXXXXXXXXX--",
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
    "XXXX--------------------------XXXXX",
  ],
  end: [
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
    "XXXXXXXXXXXXXXXXXXXXXX",
  ],
  "6-b": [
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX--o-------",
    "-o--------XXXXXXXXXX----------",
    "----------XXXXXXXXXX--X-------",
    "----------XXXXXXXXXX----------",
    "XXX-------XXXXXXXXXXX---------",
    "------XX-----oooo-----------o-",
    "------------------------------",
    "XXXX--------XXXXXX---XX---XXXX",
  ],
  "1-b": [
    "---------XXX----",
    "----------T-----",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "----X-----X-----",
    "-------oo------C",
    "----------------",
    "-------XX-------",
    "----o-XXXX-o----",
    "-----XXXXXX-----",
    "---XXXXXXXXXX---",
    "XXXXXXXXXXXXXXXX",
  ],
};
