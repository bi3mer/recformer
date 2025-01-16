export abstract class Scene {
  public changeScene: undefined | string;

  abstract onEnter(): void
  abstract update(dt: number): void;
  abstract render(): void;
  protected abstract _onExit(): void;

  public onExit(): void {
    this.changeScene = undefined;
    this._onExit();
  }
}
