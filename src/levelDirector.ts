import { policyIteration } from "./GDM-TS";
import { Edge } from "./GDM-TS/src/Graph/edge";
import { KEY_DEATH, KEY_END, KEY_START, NUM_ROWS } from "./constants";
import { CustomNode } from "./customNode";
import { MDP, idToLevel } from "./levels";

export class LevelDirector {
  private keys: string[];
  private columnsPerLevel: number[];
  private lossesInARow: number = 0;
  private playerWonLastRound: boolean = false;

  constructor() {
  }

  public update(playerWon: boolean, playerColumn: number): void {
    // Map out how far the player made it in the level
    const keysLength = this.keys.length;
    const percentCompleted: number[] = [];
    if (playerWon) {
      for (let i = 0; i < keysLength; ++i) {
        percentCompleted.push(1);
      }

      this.lossesInARow = 0;
    } else {
      let col = playerColumn;
      for (let i = 0; i < keysLength; ++i) {
        if (col > this.columnsPerLevel[i]) {
          percentCompleted[i] = 1;
          col -= this.columnsPerLevel[i];
        } else {
          percentCompleted[i] = col / this.columnsPerLevel[i];
          break;
        }
      }

      // THis is the adaptive part of of adaptive policy iteration. See my
      // see my ADP paper (Level Assembly as a Markov Decision Process) for details.
      ++this.lossesInARow;
      for (let i = 0; i < this.lossesInARow; ++i) {
        const neighbors = MDP.getNode(KEY_START).neighbors;
        const neighborsCount = neighbors.length;

        if (neighborsCount === 1) {
          break;
        }

        let hardestNeighbor = "";
        let maxReward = -10000;
        for (let jj = 0; jj < neighborsCount; ++jj) {
          const r = MDP.getNode(neighbors[jj]).reward;
          if (r > maxReward) {
            hardestNeighbor = neighbors[jj];
            maxReward = r;
          }
        }

        console.log('removing edge:', hardestNeighbor);
        MDP.removeEdge(KEY_START, hardestNeighbor);
        console.log(MDP);
      }
    }

    // Update baed on how the player did
    const pcLength = percentCompleted.length;
    for (let i = 0; i < pcLength; ++i) {
      const pc = percentCompleted[i];
      const id = this.keys[i];
      const node = MDP.getNode(id) as CustomNode;

      // add edge if the segemnt was completed by the player
      if (pc === 1) {
        if (!MDP.hasEdge(KEY_START, id)) {
          MDP.addDefaultEdge(KEY_START, id, [[id, 1], [KEY_DEATH, 0.0]]);
        }
      }

      // update reward based on how the player did
      ++node.visitedCount;
      node.sumPercentCompleted += pc;
      node.updateReward();

      // update incoming edges life and death probability
      const probLife = node.sumPercentCompleted / node.visitedCount;
      const probDeath = 1 - probLife;
      MDP.mapEdges((e: Edge) => {
        if (e.tgt === id) {
          // There are always two entries. First is ideal target state and the
          // second is death.
          e.probability[0][1] = probLife;
          e.probability[1][1] = probDeath;
        }
      });
    }

    this.playerWonLastRound = playerWon;
  }

  public get(levelSegments: number): string[] {
    const pi = policyIteration(MDP, 0.95, true, true, 20);
    this.columnsPerLevel = [];

    // If player won, don't start from a level that they have definitely 
    // already played
    if (this.playerWonLastRound) {
      this.keys = [pi[KEY_START]];
    } else {
      this.keys = [KEY_START];
    }

    // USE MDP to create a policy and generate a new level
    for (let i = 0; i < levelSegments; ++i) {
      const k = pi[this.keys[i]];
      this.keys.push(k);

      if (k === KEY_END) {
        break;
      }
    }

    // remove START id from keys since we won't use it after this 
    this.keys.splice(0, 1);

    // Populate the level
    const lvl: string[] = Array(NUM_ROWS).fill("");
    const length = this.keys.length;

    for (let i = 0; i < length; ++i) { // skip the start key
      const stateLVL = idToLevel[this.keys[i]];
      this.columnsPerLevel.push(stateLVL[0].length);

      for (let r = 0; r < NUM_ROWS; ++r) {
        lvl[r] += stateLVL[r];
      }
    }

    return lvl;
  }
}
