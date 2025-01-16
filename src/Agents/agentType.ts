import { RandomAgent } from "./randomAgent";
import { AStarAgent } from "./astarAgent";
import { Player } from "./player";

import { Agent } from "./agent";
import { GameModel } from "../gameModel";

export const AGENT_RANDOM = 0;
export const AGENT_A_STAR = 1;
export const AGENT_PLAYER = 2;

export function typeToAgent(type: number, model: GameModel): Agent {
  switch (type) {
    case AGENT_RANDOM:
      return new RandomAgent();
    case AGENT_A_STAR:
      return new AStarAgent(model);
    case AGENT_PLAYER:
      return new Player();
    default:
      console.error(
        `Unhandled agent type: ${type}. Defaulted to player agent.`,
      );
      return new Player();
  }
}
