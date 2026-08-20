import { create } from "zustand";

interface PortfolioEditorState {
  /** Currently selected category in the admin project editor form */
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const usePortfolioEditorStore = create<PortfolioEditorState>((set) => ({
  selectedCategory: "web_dev",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
