import { Point } from "./DataStructures/point";

export class Logger {
  static playerID: string;
  static version: string;
  static condition: string;
  static result: string;
  static coinsCollected: number;
  static coinsInLevel: number;
  static timePlayed: number;
  static levels: string[];
  static order: number;
  static pathX: number[];
  static pathY: number[];
  static velX: number[];
  static velY: number[];

  static init() {
    // set player id
    if (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1" ||
      location.hostname === ""
    ) {
      Logger.playerID = "local-dev";
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("id")) {
        Logger.playerID = crypto.randomUUID();
      } else {
        Logger.playerID = "browser-dev";
      }
    }

    console.log(Logger.playerID);

    Logger.version = "0.0.0";
    Logger.result = "RESULT NOT ASSIGNED";
    Logger.coinsCollected = 0;
    Logger.timePlayed = 0;
    Logger.order = -1;
    Logger.pathX = [];
    Logger.pathY = [];
    Logger.velX = [];
    Logger.velY = [];

    // @TODO: not used in upcoming study
    // Logger.condition = "CONDITION NOT ASSIGNED";
    // Logger.levels = [];
  }

  static pushPlayerPositionAndVelocity(position: Point, velocity: Point): void {
    this.pathX.push(position.x);
    this.pathY.push(position.y);
    this.velX.push(velocity.x);
    this.velY.push(velocity.y);
  }

  static getLog(): { [key: string]: any } {
    return {
      id: Logger.playerID,
      version: Logger.version,
      // condition: Logger.condition,
      // levels: Logger.levels,
      result: Logger.result,
      coinsCollected: Logger.coinsCollected,
      coinsInLevel: Logger.coinsInLevel,
      timePlayed: Logger.timePlayed,
      order: Logger.order,
      pathX: Logger.pathX,
      pathY: Logger.pathY,
      velX: Logger.velX,
      velY: Logger.velY,
    };
  }

  // Logger.order is incremented by this function
  static resetLog(): void {
    ++Logger.order;

    Logger.levels = [];
    Logger.result = "RESULT NOT ASSIGNED";
    Logger.coinsCollected = 0;
    Logger.timePlayed = 0;
    Logger.levels = [];
    Logger.pathX = [];
    Logger.pathY = [];
    Logger.velX = [];
    Logger.velY = [];
  }
}
