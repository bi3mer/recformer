import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  Firestore,
  getFirestore,
} from "firebase/firestore";
import { T_EnemyPositions, T_PlayerPositions } from "./tracker";

export class Logger {
  static logLevelResults: () => void;
  static logSurvey: () => void;

  constructor(config: { [id: string]: string } | undefined) {
    if (config) {
      const app = initializeApp(config);
      const db = getFirestore(app);

      Logger.logLevelResults = () => {};
      Logger.logSurvey = () => {};
    } else {
      Logger.logLevelResults = () => {
        const results = {
          playerPositions: T_PlayerPositions,
          enemyPositions: T_EnemyPositions,
          result: "won", // won | enemy_name | fell
          coinsCollected: 0,
        };

        console.log(results);

        T_PlayerPositions.length = 0;
        T_EnemyPositions.length = 0;
      };

      Logger.logSurvey = () => {};
    }
  }
}
