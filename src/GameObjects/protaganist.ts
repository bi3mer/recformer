import { Agent } from "../Agents/agent";
import {
  Point,
  pointAdd,
  pointClone,
  pointMultiplyScalar,
  pointSubtract,
} from "../DataStructures/point";
import { COLOR_LIGHT_PURPLE } from "../colorPalette";
import { Camera } from "../core/camera";
import {
  DEATH_HEIGHT,
  PLAYER_SCREEN_HEIGHT,
  PLAYER_SCREEN_WIDTH,
  PLAYER_SIZE,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { RectangleGameObject } from "../core/rectangleGameObject";
import {
  TYPE_BLOCK,
  TYPE_BULLET,
  TYPE_COIN,
  TYPE_ENEMY,
  TYPE_JUMP_RESET,
  TYPE_PLAYER,
} from "./gameObjectTypes";

const MOVE = 6;
const MAX_MOVE_MOD = 8;
const MAX_JUMP_TIME = 0.4;

export class Protaganist extends RectangleGameObject {
  movingRight: boolean; // @TODO: remove
  movingLeft: boolean; // @TODO: remove
  moveMod: number;

  jumpTime: number;
  squash: number;
  stretch: number;

  coinsCollected: number;
  maxColumn: number;

  agent: Agent;

  constructor(
    pos: Point,
    velocity: Point,
    agent: Agent,
    movingRight: boolean = false,
    movingLeft: boolean = false,
    moveMod: number = 0,
    jumpTime: number = 0,
    squash: number = 1,
    stretch: number = 1,
    coinsCollected: number = 0,
    maxColumn: number = 0,
  ) {
    super(pos, PLAYER_SIZE, TYPE_PLAYER);
    this.velocity.x = velocity.x;
    this.velocity.y = velocity.y;

    this.agent = agent;
    this.movingRight = movingRight;
    this.movingLeft = movingLeft;
    this.moveMod = moveMod;
    this.jumpTime = jumpTime;
    this.squash = squash;
    this.stretch = stretch;
    this.coinsCollected = coinsCollected;
    this.maxColumn = maxColumn;
  }

  clone(): GameObject {
    return new Protaganist(
      pointClone(this.pos),
      pointClone(this.velocity),
      this.agent,
      this.movingRight,
      this.movingLeft,
      this.moveMod,
      this.jumpTime,
      this.squash,
      this.stretch,
      this.coinsCollected,
      this.maxColumn,
    );
  }

  update(dt: number): void {
    // check if the player has died from falling through the map
    if (this.pos.y > DEATH_HEIGHT) {
      this.dead = true;
      return;
    }

    this.velocity.x = 0;

    // Handle agent input
    this.agent.update(dt);
    if (this.agent.movingRight) {
      this.movingRight = true;
      this.velocity.x = MOVE;
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + dt);
    }

    if (this.agent.movingLeft) {
      if (this.movingRight) {
        this.movingRight = false;
        this.velocity.x = 0;
      } else {
        this.movingLeft = true;
        this.velocity.x = -MOVE;
        this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + dt);
      }
    }

    if (this.jumpTime < MAX_JUMP_TIME && this.agent.jumping) {
      if (this.jumpTime === 0) {
        this.velocity.y = -15;
      } else if (this.jumpTime < 0.2) {
        this.velocity.y -= 2;
      }

      this.velocity.y = Math.max(-20, this.velocity.y);

      this.squash = Math.min(1.03, this.squash + 0.01);
      this.stretch = Math.max(0.97, this.stretch - 0.01);
      this.jumpTime += dt;
    } else if (this.squash != this.stretch) {
      this.squash += 0.01;
      this.stretch -= 0.01;
    }

    this.maxColumn = Math.max(this.pos.x, this.maxColumn);
  }

  handleCollision(other: GameObject): void {
    switch (other.type) {
      case TYPE_BLOCK: {
        const block = other as RectangleGameObject;
        const d = pointSubtract(
          pointAdd(this.pos, pointMultiplyScalar(this.size, 0.5)),
          pointAdd(block.pos, pointMultiplyScalar(block.size, 0.5)),
        );

        const averageSize = pointAdd(this.size, block.size);
        pointMultiplyScalar(averageSize, 0.5);

        // This is trying to handle corners. So if the angle is close to 45
        // degrees between the two rectangles, that is a corner. I have it as
        // less than 55 and more than 40.
        const theta = Math.abs(Math.atan(d.y / d.x));
        const isCorner = theta < 0.96 && theta > 0.698; // radians, comment above is in degrees

        if (
          !isCorner &&
          Math.abs(d.x / this.size.x) > Math.abs(d.y / this.size.y)
        ) {
          if (d.x < 0) {
            this.pos.x = block.pos.x - this.size.x;
          } else {
            this.pos.x = block.pos.x + block.size.x;
          }
        } else {
          if (d.y > 0) {
            this.pos.y = block.pos.y + block.size.y;
          } else {
            this.pos.y = block.pos.y - this.size.y;
            this.velocity.y = 0;
            this.jumpTime = 0;

            this.stretch = 1.01;
            this.squash = 0.99;
          }
        }

        break;
      }
      case TYPE_COIN: {
        ++this.coinsCollected;
        break;
      }
      case TYPE_BULLET:
      case TYPE_ENEMY: {
        this.dead = true;
        break;
      }
      case TYPE_JUMP_RESET: {
        this.jumpTime = 0;
        this.velocity.y = Math.min(this.velocity.y, 0);
        break;
      }
      default: {
        console.warn(`Player unhandled collision type: ${other.type}.`);
        break;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = COLOR_LIGHT_PURPLE;

    const x = camera.columnToScreen(this.pos.x);
    const y = camera.rowToScreen(this.pos.y);

    const H = PLAYER_SCREEN_HEIGHT * this.squash;
    const W = PLAYER_SCREEN_WIDTH * this.stretch;

    if (this.movingRight) {
      let region = new Path2D();
      region.moveTo(x, y);
      region.lineTo(x - this.moveMod, y + H);
      region.lineTo(x + W - this.moveMod, y + H);
      region.lineTo(x + W, y);
      region.closePath();

      ctx.fill(region, "evenodd");

      this.movingRight = false;
    } else if (this.movingLeft) {
      let region = new Path2D();
      region.moveTo(x, y);
      region.lineTo(x + this.moveMod, y + H);
      region.lineTo(x + W + this.moveMod, y + H);
      region.lineTo(x + W, y);
      region.closePath();

      ctx.fill(region, "evenodd");
      this.movingLeft = false;
    } else {
      ctx.fillRect(x, y, W, H);
    }
  }
}
