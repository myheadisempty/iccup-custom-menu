import { CustomTournamentResults, DotaTournamentResults } from "@/utils/types";
import { TournamentReportFactory } from "./core/factory";

export const generateCustomTourReportText = (data: CustomTournamentResults) => {
  const generator = TournamentReportFactory.createGenerator("custom");
  return generator.generate(data);
};

export const generateDotaTourReportText = (data: DotaTournamentResults) => {
  const generator = TournamentReportFactory.createGenerator("dota");
  return generator.generate(data);
};
