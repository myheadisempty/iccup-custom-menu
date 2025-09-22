import {
  CustomTournamentGenerator,
  DotaTournamentGenerator,
} from "../generators";

export class TournamentReportFactory {
  static createGenerator(type: "custom" | "dota") {
    switch (type) {
      case "custom":
        return new CustomTournamentGenerator();
      case "dota":
        return new DotaTournamentGenerator();
      default:
        throw new Error(`Unknown tournament type: ${type}`);
    }
  }
}
