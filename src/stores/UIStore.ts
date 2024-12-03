import { create } from "zustand";

interface UIState {
  loading: boolean;
  onUpdateLoading: (newValue: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  loading: true,
  onUpdateLoading: (newValue) => set(() => ({ loading: newValue })),
}));
