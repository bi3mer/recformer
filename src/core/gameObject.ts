import { Camera } from "./camera";
import {
  Point,
  pointAddInPlace,
  pointMultiplyScalar,
} from "../DataStructures/point";
import { GameModel } from "../gameModel";

export abstract class GameObject {
  game: GameModel;

  pos: Point;
  type: number; // gameObjectTypes, I'd use and enum, but enums are bad in TypeSCript for some reason.
  dead: boolean = false;

  velocity: Point = new Point(0, 0);
  gravity: Point = new Point(0, 100);

  constructor(position: Point, type: number) {
    this.pos = position;
    this.type = type;
  }

  abstract clone(): GameObject;

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D, camera: Camera): void;
  abstract handleCollision(other: GameObject): void;
  abstract collision(other: GameObject): void;

  physicsUpdate(dt: number): void {
    pointAddInPlace(this.velocity, pointMultiplyScalar(this.gravity, dt));
    this.velocity.y = Math.min(this.velocity.y, 30); // any faster and the player can fall through the map
    pointAddInPlace(this.pos, pointMultiplyScalar(this.velocity, dt));
  }
}
