import { create } from "zustand";
import {
  TournamentData,
  CustomTournamentResults,
  DotaTournamentResults,
} from "../utils/types";

interface TournamentStore {
  tournamentData: TournamentData | null;
  tournamentResults: CustomTournamentResults | DotaTournamentResults | null;
  setTournamentData: (data: TournamentData | null) => void;
  setTournamentResults: (
    data: CustomTournamentResults | DotaTournamentResults | null
  ) => void;
}

const useTournamentStore = create<TournamentStore>((set) => ({
  tournamentData: null,
  tournamentResults: null,
  setTournamentData: (data) => set({ tournamentData: data }),
  setTournamentResults: (data) => set({ tournamentResults: data }),
}));

export default useTournamentStore;
