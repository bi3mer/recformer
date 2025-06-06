import { ILevelDirector } from "./iLevelDirector";

export class SingleLevelDirector implements ILevelDirector {
  private playerWonLastRound: boolean = false;

  constructor() {}

  getKeys(): string[] {
    return ["NA"];
  }

  playerBeatGame(): boolean {
    return true;
  }

  public update(playerWon: boolean, playerColumn: number): void {}

  public get(levelSegments: number): string[] {
    return [
      "----------------------------------------------------------------------------------XXXXXXXX--------",
      "-------------------------C---------------------------------------------------------XXXXXXX--------",
      "-----------------------------------------------------------------------------------XXXXXXX--------",
      "-------------------XXXXXXXXXXXXXXX----XXXXXX---------------------------------------XXXXXXX--------",
      "---------------------------------------V--V----------------------------------------V-V-V-V--------",
      "--------------------------------------------------------------------------------------------------",
      "----------------------------------XXXXXXXXXXXXXX--------------------------------------------------",
      "------------------------------------------V---VX-------------H--------X---------------------------",
      "----------------------------------------------------XXXXXXXXXXXXXXXXXXX---------------------------",
      "----XX--------------------------XX-------------------------------------------XXXXXXXX-------------",
      "-------------------------XXX-----------XXXXXXXXXX----------------------------C------C-------------",
      "--------------------------------------------------------------------------------------------------",
      "-------------------------V-V----------------------------------------------------------------------",
      "--------X---H---X---------V------------X---H----X-----------------------------------------------o-",
      "XXXXXXXXXXXXXXXXXX---XXXXXXXXXXXXXXXXXXXXXX--XXXXX---XXXXX---XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
  }
}
