import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TypeOfUser } from "../types/userTypes";

interface userInterface {
  id?: number;
  names: string;
  lastNames: string;
  email: string;
}

interface SessionState {
  session: "Logged" | "NotLogged" | "Checking";
  token: string | undefined;
  perfiles: TypeOfUser[] | undefined;
  currentUser: userInterface | undefined;
  onChecking: () => void;
  onSessionStart: (token: string) => void;
  onLoadProfiles: (newPerfiles: TypeOfUser[]) => void;
  onUserInfoLoad: (user: userInterface) => void;
  onLogout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: undefined,
      session: "NotLogged",
      currentUser: undefined,
      perfiles: undefined,
      onChecking: () => set(() => ({ session: "Checking", token: undefined })),
      // Iniciando sesión
      onSessionStart: (token) =>
        set(() => ({ session: "Logged", token: token })),
      // Cargando perfil
      onLoadProfiles: (newPerfiles) => set(() => ({ perfiles: newPerfiles })),
      // Esto es solo para cargar info del usuario
      onUserInfoLoad: (user) =>
        set(() => ({
          currentUser: user,
        })),
      onLogout: () =>
        set(() => ({
          session: "NotLogged",
          token: undefined,
          currentUser: undefined,
          perfiles: undefined,
        })),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
