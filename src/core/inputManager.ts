export enum Key {
  LEFT = 0,
  RIGHT,
  DOWN,
  UP,
  A,
  D,
  E,
  G,
  H,
  I,
  Q,
  R,
  S,
  W,
  SPACE,
  ESCAPE,
  ENTER,
  SHIFT,
  INVALID,
}

// static class to handle input
export class InputManager {
  private static _keys: boolean[] = [];

  public static init(): void {
    for (let i = 0; i < Object.keys(Key).length; ++i) {
      InputManager._keys.push(false);
    }

    window.addEventListener("keydown", InputManager.onKeyDown);
    window.addEventListener("keyup", InputManager.onKeyUp);
  }

  public static isKeyDown(...keys: Key[]): boolean {
    const size = keys.length;
    for (let i = 0; i < size; ++i) {
      if (InputManager._keys[keys[i]]) {
        return true;
      }
    }

    return false;
  }

  private static keyStrToKey(key: string): Key {
    switch (key) {
      case "Down":
      case "ArrowDown":
        return Key.DOWN;
      case "Up":
      case "ArrowUp":
        return Key.UP;
      case "Right":
      case "ArrowRight":
        return Key.RIGHT;
      case "Left":
      case "ArrowLeft":
        return Key.LEFT;
      case " ":
      case "Space":
        return Key.SPACE;
      case "Escape":
        return Key.ESCAPE;
      case "a":
      case "A":
        return Key.A;
      case "e":
      case "E":
        return Key.E;
      case "s":
      case "S":
        return Key.S;
      case "d":
      case "D":
        return Key.D;
      case "w":
      case "W":
        return Key.W;
      case "r":
      case "R":
        return Key.R;
      case "q":
      case "Q":
        return Key.Q;
      case "g":
      case "G":
        return Key.G;
      case "h":
      case "H":
        return Key.H;
      case "i":
      case "I":
        return Key.I;
      case "Shift":
        return Key.SHIFT;
      case "Enter":
        return Key.ENTER;
      default:
        console.warn(`Unhandled key: ${key}.`);
        return Key.INVALID;
    }
  }

  private static onKeyDown(event: KeyboardEvent): boolean {
    const k = InputManager.keyStrToKey(event.key);
    InputManager._keys[k] = true;

    if (k == Key.DOWN || k == Key.UP || k == Key.LEFT || k == Key.RIGHT) {
      event.preventDefault();
    }

    return false;
  }

  private static onKeyUp(event: KeyboardEvent): boolean {
    InputManager._keys[InputManager.keyStrToKey(event.key)] = false;

    return false;
  }

  static clear() {
    for (let i = 0; i < InputManager._keys.length; ++i) {
      InputManager._keys[i] = false;
    }
  }
}
