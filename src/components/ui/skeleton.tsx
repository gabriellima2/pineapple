import { cn } from '@/lib/utils'

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-muted', className)}
			{...props}
		/>
	)
}

function InputSkeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <Skeleton className={cn('h-[40px] w-full', className)} {...props} />
}

function LabelSkeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <Skeleton className={cn('h-[18px] w-[80px]', className)} {...props} />
}

export { Skeleton, InputSkeleton, LabelSkeleton }
