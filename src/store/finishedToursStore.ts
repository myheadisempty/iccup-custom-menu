import { getFinishedTours } from "@/utils/getFinishedTours";
import { Role, TournamentList } from "@/utils/types";
import { create } from "zustand";

interface FinishedToursStore {
  tournamentList: TournamentList;
  loading: boolean;
  fetchFinishedTours: (role: Role) => Promise<void>;
}

export const useFinishedToursStore = create<FinishedToursStore>((set) => ({
  tournamentList: [],
  loading: false,

  fetchFinishedTours: async (role: Role) => {
    set({ loading: true });
    try {
      const data = await getFinishedTours(role);
      set({ tournamentList: data });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
