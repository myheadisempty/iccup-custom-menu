"use client";

import { ConfigProvider, theme } from "antd";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ConfigProvider>
  );
};
