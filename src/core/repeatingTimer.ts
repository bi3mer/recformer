export class RepeatingTimer {
  private startTime: number;

  constructor(
    private runTime: number,
    private callback: () => void,
  ) {
    this.startTime = 0;
  }

  public update(dt: number) {
    this.startTime += dt;
    if (this.runTime <= this.startTime) {
      this.startTime = 0;
      this.callback();
    }
  }
}
