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

type ButtonSkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: 'default' | 'sm'
}

function ButtonSkeleton({
	size = 'default',
	className,
	...props
}: ButtonSkeletonProps) {
	return (
		<Skeleton
			className={cn(
				'h-[40px] w-auto',
				{ 'h-[36px]': size === 'sm' },
				className
			)}
			{...props}
		/>
	)
}

function LabelSkeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <Skeleton className={cn('h-[18px] w-[80px]', className)} {...props} />
}

function TableSkeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<Skeleton
			className={cn('aspect-video h-96 w-full', className)}
			{...props}
		/>
	)
}

export { Skeleton, InputSkeleton, LabelSkeleton, TableSkeleton, ButtonSkeleton }
