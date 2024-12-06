import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface userInterface {
  id?: number;
  token: string;
  names: string;
  lastNames: string;
  email: string;
}

interface SessionState {
  session: "Logged" | "NotLogged" | "Checking";
  currentUser: userInterface | undefined;
  onChecking: () => void;
  onLogin: (user: userInterface) => void;
  onLogout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: "NotLogged",
      currentUser: undefined,
      onChecking: () => set(() => ({ session: "Checking", token: undefined })),
      onLogin: (user) => set(() => ({ session: "Logged", currentUser: user })),
      onLogout: () => set(() => ({ session: "NotLogged", token: undefined })),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
