export abstract class Scene {
  public changeScene: undefined | string;

  abstract onEnter(): void
  abstract update(dt: number): void;
  protected abstract _onExit(): void;

  // It would be better if I could disallow this from being overwritten, but
  // oh well.
  public onExit(): void {
    this.changeScene = undefined;
    this._onExit();
  }
}
