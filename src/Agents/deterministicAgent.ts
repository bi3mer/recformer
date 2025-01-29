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

    if (this.actions.length > 0) {
      const a = this.actions.pop()!;
      this.movingRight = a.moveRight;
      this.movingLeft = a.moveLeft;
      this.jumping = a.jump;
    } else {
      console.error("Ran out of actions :/");
      // this.movingLeft = true;
      // this.jumping = true;
    }
  }
}
