import { create } from "zustand";

interface UIState {
  loading: boolean;
  SetLoading: (newValue: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  loading: false,
  SetLoading: (newValue) => set(() => ({ loading: newValue })),
}));
