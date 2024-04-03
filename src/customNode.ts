import { Node } from "./GDM-TS/src/Graph/node";

export class CustomNode extends Node {
  public visitedCount: number;
  public sumPercentCompleted: number;
  public depth: number;

  private designerReward: number;
  private playerReward: number;

  constructor(name: string, reward: number, utility: number, isTerminal: boolean, neighbors: string[], depth: number) {
    super(name, reward, utility, isTerminal, neighbors);

    this.designerReward = reward;
    this.playerReward = 0; // currently not using this, but may in the future
    this.depth = depth;

    this.visitedCount = 1;
    this.sumPercentCompleted = 1;
  }

  public updateReward(): void {
    this.reward = this.designerReward * this.visitedCount;
  }
}
