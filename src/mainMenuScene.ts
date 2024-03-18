import { Scene } from "./scene";
import { KEY_GAME } from "./sceneKeys";

export class MainMenuScene extends Scene {
  constructor() {
    super();
  }

  onEnter(): void {

  }

  update(dt: number): void {
    this.changeScene = KEY_GAME;
  }

  render(): void {
    // pass for now
  }

  protected _onExit(): void {
  }
}
