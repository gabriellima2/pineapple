import { LabelSkeleton, InputSkeleton } from '@/components/ui/skeleton'

export function Skeleton() {
	return (
		<>
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
		</>
	)
}
