"use client";

import CacheProvider from "@/utils/context/CacheContext";
import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <CacheProvider>{children}</CacheProvider>
    </ConfigProvider>
  );
};
