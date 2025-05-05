import { CONDITION_NOT_FOUND } from "./core/constants";
import { Logger } from "./logger";

export class Server {
  public static getCondition(callback: (condition: string) => void) {
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
    // @NOTE: This is bad if and only if the character limit exceeds 120k. We would
    //        crash and that would suck
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
