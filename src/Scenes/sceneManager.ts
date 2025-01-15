import { Scene } from "./scene";

export class SceneManager {
  private scenes: { [Name: string]: Scene } = {}

  registerScene(name: string, scene: Scene): void {
    if (this.scenes[name] === undefined) {
      this.scenes[name] = scene;
    } else {
      console.error(`Key "${name}" for scene already exists! Scene not added to SceneManager.`);
    }
  }

  getScene(name: string): undefined | Scene {
    return this.scenes[name];
  }
}
