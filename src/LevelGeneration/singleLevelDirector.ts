import { ILevelDirector } from "./iLevelDirector";

export class SingleLevelDirector implements ILevelDirector {
  private playerWonLastRound: boolean = false;

  constructor() {}

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
      "---------------------------------------------------------------------------------------T----------",
      "--------------------------------------------------------------------------------------------------",
      "----------------------------------XXXX^XXXX^XXXX--------------------------------------------------",
      "------------------------------------------V---VX-------------H--------X---------------------------",
      "----------------------------------------------------XXXXXXXXXXXXXXXXXXX---------------------------",
      "--------------------------------XX-------------------------------------------XXXXXXXX-------------",
      "-------------------------XXX-----------XXXXXXXXXX----------------------------C------C-------------",
      "--------------------------------------------------------------------------------------------------",
      "-------------------------V-V----------------------------------------------------------------------",
      "--------X---H---X---------V---------------------------------------------------------------------o-",
      "XXXXXXXXXXXXXXXXXX---XXXXXXXXXXXXXXXXXX^XXXXX^XXXX---XXXXX---XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
  }
}
