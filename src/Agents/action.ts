import { Point } from "../DataStructures/point";

export class Action {
  moveRight: boolean;
  moveLeft: boolean;
  jump: boolean;

  constructor(moveRight: boolean, moveLeft: boolean, jump: boolean) {
    this.moveRight = moveRight;
    this.moveLeft = moveLeft;
    this.jump = jump;
  }
}

export const ACTIONS: Action[] = [
  // new Action(false, false, false),
  new Action(true, false, false),
  new Action(false, true, false),
  new Action(false, false, true),
  new Action(true, false, true),
  new Action(false, true, true),
];

export const NUM_ACTIONS = ACTIONS.length;
