import { Card } from '@/components/ui/card'
import { Tables } from '@/types/database.types'

type BoardCardProps = {
  board: Tables<'boards'>
}

export default function BoardCard({ board }: BoardCardProps) {
  return (
    <Card
      className="p-4 flex flex-col gap-2 cursor-pointer hover:opacity-90"
      style={{ borderTop: `3px solid ${board.color ?? '#6366f1'}` }}
    >
      <div className="font-bold text-white">{board.title}</div>
      <div className="text-sm text-muted-foreground">{board.description}</div>
      <div className="flex justify-between text-xs text-muted-foreground mt-auto">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3" style={{ backgroundColor: board.color ?? '#6366f1' }} />0 задач
        </div>
        <div>2 дня назад</div>
      </div>
    </Card>
  )
}
