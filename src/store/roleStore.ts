import { Role } from "@/utils/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RoleState {
  role: Role;
  toggleRole: () => void;
}

const useRoleStore = create<RoleState>()(
  persist(
    (set, get) => ({
      role: "custom",
      toggleRole: () => {
        const currentRole = get().role;
        set({ role: currentRole === "custom" ? "dota" : "custom" });
      },
    }),
    {
      name: "adminRole",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRoleStore;
