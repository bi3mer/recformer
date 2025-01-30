import { RandomAgent } from "./randomAgent";
import { Player } from "./player";

import { Agent } from "./agent";
import { GameModel } from "../gameModel";
import { EmptyAgent } from "./emptyAgent";

export const AGENT_RANDOM = 0;
export const AGENT_PLAYER = 1;
export const AGENT_EMPTY = 2;

export function typeToAgent(type: number, model: GameModel): Agent {
  switch (type) {
    case AGENT_RANDOM:
      return new RandomAgent();
    case AGENT_PLAYER:
      return new Player();
    case AGENT_EMPTY:
      return new EmptyAgent();
    default:
      console.error(
        `Unhandled agent type: ${type}. Defaulted to player agent.`,
      );
      return new Player();
  }
}
