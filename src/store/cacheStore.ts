import { create } from "zustand";
import { TournamentData } from "@/utils/types";

type CacheBody = {
  expiry: Date;
  data: TournamentData;
};

type CacheStore = {
  getCache: (key: string) => TournamentData | null;
  setCache: (key: string, value: TournamentData, ttl?: number) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useCacheStore = create<CacheStore>((set, get) => {
  const map = new Map<string, CacheBody>();

  return {
    getCache: (key: string) => {
      const cacheValue = map.get(key);
      if (!cacheValue) return null;

      if (new Date().getTime() > cacheValue.expiry.getTime()) {
        map.delete(key);
        return null;
      }

      return cacheValue.data;
    },

    setCache: (key: string, value: TournamentData, ttl = 10) => {
      const expiry = new Date();
      expiry.setSeconds(expiry.getSeconds() + ttl);

      map.set(key, {
        expiry,
        data: value,
      });
    },
  };
});

export const useCache = () => {
  const getCache = useCacheStore((state) => state.getCache);
  const setCache = useCacheStore((state) => state.setCache);
  return { getCache, setCache };
};

export default useCacheStore;
