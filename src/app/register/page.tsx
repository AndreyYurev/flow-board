'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const registerSchema = z
  .object({
    displayName: z.string().min(2, 'Имя минимум 2 символа'),
    email: z.email('Введите корректный email'),
    password: z.string().min(8, 'Пароль минимум 8 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { display_name: data.displayName },
      },
    })

    if (error) {
      setError('root', { message: 'Ошибка регистрации. Попробуйте снова.' })
      return
    }

    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 border border-border rounded-2xl bg-card shadow-lg">
        <h1 className="text-2xl font-bold mb-1">Создать аккаунт</h1>
        <p className="text-muted-foreground text-sm mb-6">Зарегистрируйтесь в FlowBoard</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input placeholder="Ваше имя" {...register('displayName')} />
            {errors.displayName && (
              <p className="text-destructive text-xs mt-1">{errors.displayName.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Email" type="email" {...register('email')} />
            {errors.email && (
              <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Пароль" type="password" {...register('password')} />
            {errors.password && (
              <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Подтвердите пароль"
              type="password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-destructive text-sm text-center">{errors.root.message}</p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Уже есть аккаунт?{' '}
          <a href="/login" className="text-primary hover:underline">
            Войти
          </a>
        </p>
      </div>
    </div>
  )
}
