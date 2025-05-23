import { CONDITION_NOT_FOUND, IS_STUDY } from "./core/constants";
import { Logger } from "./logger";

export class Server {
  public static getCondition(callback: (condition: string) => void) {
    if (!IS_STUDY) {
      callback(CONDITION_NOT_FOUND);
      return;
    }

    fetch("/condition", {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          response.text().then((body) => {
            callback(body);
          });
        } else {
          callback(CONDITION_NOT_FOUND);
        }
      })
      .catch(() => {
        callback(CONDITION_NOT_FOUND);
      });
  }

  public static submitAttempt() {
    console.log(Logger.getLog());
    if (!IS_STUDY) return;

    fetch("/log", {
      method: "POST",
      body: JSON.stringify(Logger.getLog()),
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response.status);
      console.log(response);
    });
  }
}
