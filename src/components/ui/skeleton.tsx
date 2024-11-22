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
	return <Skeleton className={cn('h-96 w-full', className)} {...props} />
}

function UpdateSkeleton() {
	return (
		<div className="flex-1 space-y-4">
			<div className="space-y-2">
				<LabelSkeleton />
				<InputSkeleton />
			</div>
			<div className="space-y-2">
				<LabelSkeleton />
				<InputSkeleton />
			</div>
			<div className="space-y-2">
				<LabelSkeleton />
				<InputSkeleton />
			</div>
		</div>
	)
}

function ViewSkeleton() {
	return (
		<div className="grid grid-cols-4 gap-8">
			<div className="col-span-full space-y-1">
				<LabelSkeleton className="h-[20px]" />
				<LabelSkeleton className="w-full" />
			</div>
			<div className="col-span-2 space-y-1">
				<LabelSkeleton className="h-[20px]" />
				<LabelSkeleton className="w-full" />
			</div>
			<div className="col-span-2 space-y-1">
				<LabelSkeleton className="h-[20px]" />
				<LabelSkeleton className="w-full" />
			</div>
			<div className="col-span-2 space-y-1">
				<LabelSkeleton className="h-[20px]" />
				<LabelSkeleton className="w-full" />
			</div>
			<div className="col-span-2 space-y-1">
				<LabelSkeleton className="h-[20px]" />
				<LabelSkeleton className="w-full" />
			</div>
		</div>
	)
}

function ListingSkeleton() {
	return (
		<div className="w-full">
			<div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
				<InputSkeleton className="w-full sm:max-w-[380px]" />
				<div className="flex w-full flex-row flex-wrap items-center justify-end gap-4 sm:flex-nowrap">
					<ButtonSkeleton className="flex-1 sm:max-w-[111px]" />
					<ButtonSkeleton className="flex-1 sm:max-w-[117px]" />
				</div>
			</div>
			<TableSkeleton />
			<div className="flex items-center justify-end space-x-2 py-4">
				<ButtonSkeleton size="sm" className="w-[78px]" />
				<ButtonSkeleton size="sm" className="w-[78px]" />
			</div>
		</div>
	)
}

export {
	Skeleton,
	InputSkeleton,
	LabelSkeleton,
	TableSkeleton,
	ButtonSkeleton,
	UpdateSkeleton,
	ViewSkeleton,
	ListingSkeleton,
}
