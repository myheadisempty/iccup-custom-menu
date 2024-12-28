import { createContext, ReactNode, useContext, useState } from "react";
import { TournamentData, TournamentResults } from "../types";

type TournamentState = {
  tournamentData: TournamentData | null;
  tournamentResults: TournamentResults | null;
  setTournamentData: (data: TournamentData | null) => void;
  setTournamentResults: (data: TournamentResults | null) => void;
};

const defaultState: TournamentState = {
  tournamentData: null,
  tournamentResults: null,
  setTournamentData: () => {},
  setTournamentResults: () => {},
};

const TournamentContext = createContext(defaultState);

export const useTournamentData = () => useContext(TournamentContext);

const TournamentProvider = ({ children }: { children: ReactNode }) => {
  const [tournamentData, setTournamentData] = useState<TournamentData | null>(
    null
  );
  const [tournamentResults, setTournamentResults] =
    useState<TournamentResults | null>(null);

  return (
    <TournamentContext
      value={{
        tournamentData,
        tournamentResults,
        setTournamentData,
        setTournamentResults,
      }}
    >
      {children}
    </TournamentContext>
  );
};

export default TournamentProvider;
