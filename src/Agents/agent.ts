import { Action } from "./action";

export abstract class Agent {
  movingRight: boolean = false;
  movingLeft: boolean = false;
  jumping: boolean = false;

  abstract name(): string;
  abstract update(dt: number): void;

  set(a: Action) {
    this.movingRight = a.moveRight;
    this.movingLeft = a.moveLeft;
    this.jumping = a.jump;
  }
}
