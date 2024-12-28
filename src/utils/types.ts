export interface TournamentData {
  id: string;
  title: string;
  tourType: string;
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

export interface TournamentResults extends TournamentData {
  participantStats: TournamentData["participantStats"] & {
    technicalLosses: number;
  };
  winners: TournamentData["winners"] & {
    thirdPlace: string[];
  };
  awards: number[];
}

export type TournamentList = Pick<TournamentData, "id" | "title">[];
