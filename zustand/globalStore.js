import { create } from "zustand";

const useGlobalStore = create((set) => ({
  isModalOpen: false,
  isLoading: false,

  openModal: () => set((state) => ({ ...state, isModalOpen: true })),
  setIsLoading: (isLoading) =>
    set((state) => ({ ...state, isLoading: isLoading })),
}));

export default useGlobalStore;
