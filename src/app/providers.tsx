"use client";

import CacheProvider from "@/utils/context/CacheContext";
import TournamentProvider from "@/utils/context/TournamentContext";
import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <CacheProvider>
        <TournamentProvider>{children}</TournamentProvider>
      </CacheProvider>
    </ConfigProvider>
  );
};
