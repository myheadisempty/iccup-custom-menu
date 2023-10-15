import { createContext } from "react";
import { TournamentResults } from "../types";

interface ITournamentResultsContext {
  tournamentResults: TournamentResults | undefined;
  updateTournamentResults: (tournamentResults: TournamentResults) => void;
  isResultsUpdated: boolean;
  updateIsResultsUpdated: (state: boolean) => void;
}

export const TournamentResultsContext =
  createContext<ITournamentResultsContext>({
    tournamentResults: undefined,
    updateTournamentResults: () => {},
    isResultsUpdated: false,
    updateIsResultsUpdated: () => {},
  });
