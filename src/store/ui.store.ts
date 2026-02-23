import { create } from 'zustand'

type UIStore = {
  // create board modal
  isCreateBoardModalOpen: boolean
  openCreateBoardModal: () => void
  closeCreateBoardModal: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isCreateBoardModalOpen: false,
  openCreateBoardModal: () => set({ isCreateBoardModalOpen: true }),
  closeCreateBoardModal: () => set({ isCreateBoardModalOpen: false }),
}))
