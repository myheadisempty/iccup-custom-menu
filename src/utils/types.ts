export type TourType = "1x1" | "2x2" | "3x3" | "5x5";

export interface TournamentData {
  id: string;
  title: string;
  tourType: TourType;
  tourStart: string;
  participantStats: {
    registered: number;
    confirmed: number;
  };
  numOfRounds: number;
  winners: {
    firstPlace: string[];
    secondPlace: string[];
    thirdPlaceCandidates: {
      candidate1: string[];
      candidate2: string[];
    };
  };
}

export interface CustomTournamentResults extends TournamentData {
  participantStats: TournamentData["participantStats"] & {
    technicalLosses: number;
  };
  winners: TournamentData["winners"] & {
    thirdPlace: string[];
  };
  awards: Array<{
    runes: number;
  }>;
}

export interface DotaTournamentResults extends TournamentData {
  participantStats: TournamentData["participantStats"] & {
    technicalLosses: number;
  };
  winners: TournamentData["winners"] & {
    thirdPlace: string[];
  };
  awards: Array<{
    runes: number;
    pts: number;
  }>;
}

export type TournamentResultsUnion =
  | CustomTournamentResults
  | DotaTournamentResults;

export type TournamentList = Pick<TournamentData, "id" | "title">[];

export type Role = "custom" | "dota";
