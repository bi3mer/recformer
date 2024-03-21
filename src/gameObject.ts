import { Camera } from "./camera";
import { TYPE_PLAYER } from "./gameObjectTypes";
import { Point } from "./point";
import { rectangleIntersect } from "./util";

// ALl game objects are rectangles, sue me
export abstract class GameObject {
  public pos: Point;
  public size: Point;
  public type: number; // gameObjectTypes, I'd use and enum, but enums are bad in TypeSCript for some reason.
  public dead: boolean = false;

  protected velocity: Point = new Point(0, 0);
  protected gravity: Point = new Point(0, 100);

  constructor(x: number, y: number, w: number, h: number, type: number) {
    this.pos = new Point(x, y);
    this.size = new Point(w, h);
    this.type = type;
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D, camera: Camera): void;

  collision(other: GameObject): void {
    if (rectangleIntersect(this.pos, this.size, other.pos, other.size)) {
      this.handleCollision(other);
      other.handleCollision(this);
    }
  }

  abstract handleCollision(other: GameObject): void;

  physicsUpdate(dt: number): void {
    this.velocity.addInPlace(this.gravity.scalarMultiply(dt));
    this.pos.addInPlace(this.velocity.scalarMultiply(dt));
  }
}
