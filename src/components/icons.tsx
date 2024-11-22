import { Copy, LucideProps, Search, Pen, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ActionIcons = {
	View: ({ className, ...rest }: LucideProps) => (
		<Search className={cn('h-4 min-h-4 w-4 min-w-4', className)} {...rest} />
	),
	Update: ({ className, ...rest }: LucideProps) => (
		<Pen className={cn('h-4 min-h-4 w-4 min-w-4', className)} {...rest} />
	),
	Delete: ({ className, ...rest }: LucideProps) => (
		<Trash2
			className={cn('h-4 min-h-4 w-4 min-w-4 text-destructive', className)}
			{...rest}
		/>
	),
	CopyId: ({ className, ...rest }: LucideProps) => (
		<Copy className={cn('h-4 min-h-4 w-4 min-w-4', className)} {...rest} />
	),
}
