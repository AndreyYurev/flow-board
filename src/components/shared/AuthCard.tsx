interface AuthCardProps {
  title: string
  subtitle: string
  footerText: string
  footerLinkText: string
  footerLinkHref: string
  children: React.ReactNode
}

export function AuthCard({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 border border-border rounded-2xl bg-card shadow-lg">
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>
        {children}
        <p className="text-center text-sm text-muted-foreground mt-4">
          {footerText}{' '}
          <a href={footerLinkHref} className="text-primary hover:underline">
            {footerLinkText}
          </a>
        </p>
      </div>
    </div>
  )
}
