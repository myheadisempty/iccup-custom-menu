"use client";

import { TournamentResultsContext } from "@/utils/context/TournamentResultsContext";
import { TournamentResults } from "@/utils/types";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [tournamentResults, setTournamentResults] =
    useState<TournamentResults>();
  const [isResultsUpdated, setIsResultsUpdated] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <ThemeProvider attribute="class">
        <TournamentResultsContext.Provider
          value={{
            tournamentResults,
            updateTournamentResults: setTournamentResults,
            isResultsUpdated,
            updateIsResultsUpdated: setIsResultsUpdated,
          }}
        >
          {children}
        </TournamentResultsContext.Provider>
      </ThemeProvider>
    </ConfigProvider>
  );
};
