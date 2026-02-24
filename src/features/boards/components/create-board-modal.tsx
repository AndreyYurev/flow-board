'use client'

import { useUIStore } from '@/store/ui.store'
import * as z from 'zod'
import { BOARD_COLORS } from '../constants'

export const BoardSchema = z.object({
  title: z.string().min(1, 'Введите название доски'),
  description: z.string().optional(),
  color: z.enum(BOARD_COLORS).default(BOARD_COLORS[0]),
})

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
