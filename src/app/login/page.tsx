'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthCard } from '@/components/shared/AuthCard'

const loginSchema = z.object({
  email: z.email('Введите корректный email'),
  password: z.string().min(8, 'Пароль минимум 8 символов'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setError('root', { message: 'Ошибка входа. Попробуйте снова.' })
      return
    }

    router.push('/dashboard')
  }

  return (
    <AuthCard
      title="Добро пожаловать"
      subtitle="Войдите в свой аккаунт FlowBoard"
      footerText="Нет аккаунта?"
      footerLinkText="Зарегистрироваться"
      footerLinkHref="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Input placeholder="Email" type="email" {...register('email')} />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Input placeholder="Пароль" type="password" {...register('password')} />
          {errors.password && (
            <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {errors.root && (
          <p className="text-destructive text-sm text-center">{errors.root.message}</p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
      </form>
    </AuthCard>
  )
}
