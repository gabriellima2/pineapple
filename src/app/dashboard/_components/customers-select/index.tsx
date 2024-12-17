import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useGetOptions } from './hooks/queries/use-get-options'

type CustomersSelectProps = Parameters<typeof Select>[0]

export function CustomersSelect(props: CustomersSelectProps) {
	const { options, isLoadingOptions } = useGetOptions()
	const hasOptions = !!options?.length
	return (
		<Select {...props}>
			<SelectTrigger
				isLoading={isLoadingOptions}
				className="flex flex-row items-center justify-between"
			>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{hasOptions &&
					options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	)
}
