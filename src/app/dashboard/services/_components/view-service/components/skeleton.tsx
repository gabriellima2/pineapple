import { LabelSkeleton } from '@/components/ui/skeleton'

export function Skeleton() {
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
