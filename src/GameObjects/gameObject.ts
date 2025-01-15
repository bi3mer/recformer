import { Camera } from "../camera";
import { Point } from "../point";

// ALl game objects are rectangles, sue me
export abstract class GameObject {
  public pos: Point;
  public type: number; // gameObjectTypes, I'd use and enum, but enums are bad in TypeSCript for some reason.
  public dead: boolean = false;

  protected velocity: Point = new Point(0, 0);
  protected gravity: Point = new Point(0, 100);

  constructor(position: Point, type: number) {
    this.pos = position;
    this.type = type;
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D, camera: Camera): void;
  abstract handleCollision(other: GameObject): void;
  abstract collision(other: GameObject);

  physicsUpdate(dt: number): void {
    this.velocity.addInPlace(this.gravity.scalarMultiply(dt));
    this.velocity.y = Math.min(this.velocity.y, 30); // any faster and the player can fall through the map
    this.pos.addInPlace(this.velocity.scalarMultiply(dt));
  }
}
