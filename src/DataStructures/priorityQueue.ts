/**
 * This implementation indicates high priority with low values since it is built for A*.
 * So the highest priority for only positive positive values is 0.
 */
export class PriorityQueue<T> {
  queue: [number, T][] = [];

  insert(priority: number, object: T) {
    if (this.queue.length == 0) {
      this.queue.push([priority, object]);
      return;
    }

    let low = 0;
    let high = this.queue.length;
    let mid: number;

    while (low < high) {
      mid = Math.floor((low + high) / 2);
      if (priority >= this.queue[mid][0]) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    this.queue.splice(low, 0, [priority, object]);
  }

  pop(): T {
    return this.queue.pop()![1];
  }

  length(): number {
    return this.queue.length;
  }
}
