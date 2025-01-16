import { randomBool } from "../core/util";
import { Agent } from "./agent";

export class RandomAgent extends Agent {
  movingRight: boolean = false;
  movingLeft: boolean = false;
  jumping: boolean = false;
  time: number = 0;

  name(): string {
    return "random";
  }

  update(dt: number) {
    this.time += dt;
    if (this.time > 0.2) {
      this.time = 0;
      this.movingRight = randomBool();
      this.movingLeft = randomBool();
      this.jumping = randomBool();
    }
  }
}
