import { createContext, useContext, ReactNode } from "react";
import { TournamentData } from "../types";

type ContextType = {
  getCache: (key: string) => TournamentData | null;
  setCache: (key: string, value: TournamentData, ttl?: number) => void;
};

type cacheBody = {
  expiry: Date;
  data: TournamentData;
};

const CacheContext = createContext<ContextType | null>(null);

export const useCache = () => useContext(CacheContext) as ContextType;

const CacheProvider = ({ children }: { children: ReactNode }) => {
  const map = new Map<string, cacheBody>();

  const getCache = (key: string) => {
    const cacheValue = map.get(key);
    if (!cacheValue) return null;

    if (new Date().getTime() > cacheValue.expiry.getTime()) {
      map.delete(key);
      return null;
    }

    return cacheValue.data;
  };

  const setCache = (key: string, value: TournamentData, ttl = 10) => {
    const t = new Date();
    t.setSeconds(t.getSeconds() + ttl);

    map.set(key, {
      expiry: t,
      data: value,
    });
  };

  const contextValue = {
    getCache,
    setCache,
  };

  return <CacheContext value={contextValue}>{children}</CacheContext>;
};

export default CacheProvider;
