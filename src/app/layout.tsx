import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Providers } from "./providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Генератор отчётов",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-main`}>
        <AntdRegistry>
          <ThemeProvider attribute="class">
            <Providers>{children}</Providers>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
