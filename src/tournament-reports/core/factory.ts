import {
  CustomTournamentGenerator,
  DotaTournamentGenerator,
} from "../generators";

interface GeneratorMap {
  custom: CustomTournamentGenerator;
  dota: DotaTournamentGenerator;
}

export class TournamentReportFactory {
  static createGenerator<T extends keyof GeneratorMap>(
    type: T
  ): GeneratorMap[T] {
    switch (type) {
      case "custom":
        return new CustomTournamentGenerator() as GeneratorMap[T];
      case "dota":
        return new DotaTournamentGenerator() as GeneratorMap[T];
      default:
        throw new Error(`Unknown tournament type: ${type}`);
    }
  }
}
