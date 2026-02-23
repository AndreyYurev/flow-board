'use client'

import { useUIStore } from '@/store/ui.store'

export default function CreateBoardModal() {
  const isOpen = useUIStore((state) => state.isCreateBoardModalOpen)
  const openModal = useUIStore((state) => state.openCreateBoardModal)
  const closeModal = useUIStore((state) => state.closeCreateBoardModal)

  return (
    <div>
      <span>Modal is open: {isOpen}</span>
      <button onClick={openModal}>Open modal</button>
      <button onClick={closeModal}>Close modal</button>
    </div>
  )
}
