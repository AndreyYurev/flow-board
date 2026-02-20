import { getBoards, createBoard, updateBoard, deleteBoard } from '@/services/boards.service'
import { TablesInsert, TablesUpdate } from '@/types/database.types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// useQuery — для чтения
export function useGetBoards() {
  return useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  })
}

// useMutation — для изменений
export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TablesInsert<'boards'>) => createBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}

export function useUpdateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TablesUpdate<'boards'> }) =>
      updateBoard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}

export function useDeleteBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}
