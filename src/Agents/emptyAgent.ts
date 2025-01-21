import { Agent } from "./agent";

export class EmptyAgent extends Agent {
  name(): string {
    return "empty";
  }

  update(dt: number) {}
}
