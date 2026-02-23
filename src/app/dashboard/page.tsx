'use client'

import { useGetBoards } from '@/features/boards/hooks/useBoards'
import BoardCard from '@/features/boards/components/board-card'

export default function DashboardPage() {
  const { data: boards, isLoading, error } = useGetBoards()

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка, попробуйте снова</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Мои доски</h1>
      <div className="grid grid-cols-4 gap-4">
        {boards?.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  )
}
