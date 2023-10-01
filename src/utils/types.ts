export interface Tournament {
  id: string;
  title: string;
}

export interface TournamentResults {
  id: string;
  tourType: string;
  tourStart: string;
  title: string;
  registeredCount: number;
  confirmedCount: number;
  techLossesCount?: number;
  numOfRounds: number;
  top1: string[];
  top2: string[];
  top3?: string | string[];
  top3_1?: string[];
  top3_2?: string[];
  awards?: number[];
}
