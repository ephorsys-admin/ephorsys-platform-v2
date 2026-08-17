import { create } from "zustand";

interface AdminUiState {
  // Modals
  isModalOpen: boolean;
  modalType: string | null;
  modalData: Record<string, unknown> | null;

  // Active tabs per page
  activeTab: Record<string, string>;

  // Actions
  openModal: (type: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  setActiveTab: (page: string, tab: string) => void;
}

export const useAdminUiStore = create<AdminUiState>((set) => ({
  isModalOpen: false,
  modalType: null,
  modalData: null,
  activeTab: {},

  openModal: (type, data = {}) =>
    set({ isModalOpen: true, modalType: type, modalData: data }),

  closeModal: () =>
    set({ isModalOpen: false, modalType: null, modalData: null }),

  setActiveTab: (page, tab) =>
    set((s) => ({ activeTab: { ...s.activeTab, [page]: tab } })),
}));
