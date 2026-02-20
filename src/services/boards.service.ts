import { createClient } from '@/lib/supabase/client'
import { Tables, TablesInsert, TablesUpdate } from '@/types/database.types'

export async function getBoards(): Promise<Tables<'boards'>[]> {
  const supabaseClient = createClient()

  const { data, error } = await supabaseClient
    .from('boards') // из какой таблицы
    .select('*') // выбрать все поля

  if (error) throw new Error(error.message)
  return data
}

export async function createBoard(data: TablesInsert<'boards'>): Promise<Tables<'boards'>> {
  const supabaseClient = createClient()

  const { data: board, error } = await supabaseClient
    .from('boards') // из какой таблицы
    .insert(data)
    .select()
    .single() // возвращаем одну запись

  if (error) throw new Error(error.message)
  return board
}

export async function updateBoard(
  id: string,
  data: TablesUpdate<'boards'>
): Promise<Tables<'boards'>> {
  const supabaseClient = createClient()

  const { data: board, error } = await supabaseClient
    .from('boards') // из какой таблицы
    .update(data)
    .eq('id', id)
    .select()
    .single() // обновляем одну запись, где id равен id (метод .eq)

  if (error) throw new Error(error.message)
  return board
}

export async function deleteBoard(id: string): Promise<void> {
  const supabaseClient = createClient()

  const { error } = await supabaseClient
    .from('boards') // из какой таблицы
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}
