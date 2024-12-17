import { Loader2, type LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

export type LoadingIndicatorProps = LucideProps

export function LoadingIndicator(props: LoadingIndicatorProps) {
	const { className, ...rest } = props
	return <Loader2 className={cn('h-6 w-6 animate-spin', className)} {...rest} />
}
