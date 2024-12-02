import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SessionState {
  session: "Logged" | "NotLogged" | "Checking";
  token: string | undefined;
  onChecking: () => void;
  onLogin: (newToken: string) => void;
  onLogout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: "Checking",
      token: undefined,
      onChecking: () => set(() => ({ session: "Checking", token: undefined })),
      onLogin: (newToken) =>
        set(() => ({ session: "Logged", token: newToken })),
      onLogout: () => set(() => ({ session: "NotLogged", token: undefined })),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
