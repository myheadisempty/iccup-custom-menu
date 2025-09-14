import { TourType } from "../types";

type AwardItem = { runes: number; pts?: number };
type AwardRange = {
  [key: string]: AwardItem[];
};
type AwardRules = {
  [key: string]: AwardRange;
};
type AwardsConfig = {
  [key: string]: AwardRules | AwardRange;
};

export function calculateAwards(
  awardsConfig: AwardsConfig,
  tourType: TourType,
  players: number,
  title: string,
  numOfRounds: number
) {
  if (title.includes("Custom Challenge")) {
    const rules = awardsConfig["Custom Challenge"] as AwardRange;
    if (rules) {
      return findAward(rules, numOfRounds);
    }
  }

  if (title.includes("Captain Mode")) {
    const modeRules = awardsConfig["Captain Mode"] as AwardRules;
    const formatRules = modeRules[tourType];
    if (formatRules) {
      return findAward(formatRules, players);
    }
  }

  const rules = awardsConfig[tourType] as AwardRange;
  if (rules) {
    return findAward(rules, players);
  }

  return [];
}

function findAward(rules: AwardRange, value: number) {
  for (const range in rules) {
    if (range.includes("+") && value >= parseInt(range)) {
      return rules[range];
    } else if (range.includes("-")) {
      const [min, max] = range.split("-").map(Number);
      if (value >= min && value <= max) {
        return rules[range];
      }
    } else if (value === parseInt(range)) {
      return rules[range];
    }
  }
  return [];
}
