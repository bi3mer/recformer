export class RepeatingTimer {
  private startTime: number;

  constructor(
    private runTime: number,
    private callback: () => void,
  ) {
    this.startTime = performance.now();
  }

  public update() {
    const curTime = performance.now();
    if (this.runTime <= curTime - this.startTime) {
      this.startTime = curTime;
      this.callback();
    }
  }
}
