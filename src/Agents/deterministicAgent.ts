import { randomBool } from "../core/util";
import { Action } from "./action";
import { Agent } from "./agent";

export class DeterministicAgent extends Agent {
  time: number = 0;
  actions: Action[];

  constructor(actions: Action[]) {
    super();
    this.actions = actions;
  }

  name(): string {
    return "deterministic";
  }

  update(dt: number) {
    this.time += dt;
    if (this.time > 0.2) {
      this.time = 0;

      if (this.actions.length > 0) {
        const a = this.actions.pop()!;
        this.movingRight = a.moveRight;
        this.movingLeft = a.moveLeft;
        this.jumping = a.jump;
      } else {
        console.error("Actions array empty...");
        this.movingRight = randomBool();
        this.movingLeft = randomBool();
        this.jumping = randomBool();
      }
    }
  }
}
