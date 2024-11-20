import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ListProps = HTMLAttributes<HTMLUListElement>

function List(props: ListProps) {
	const { className, ...rest } = props
	return <ul className={cn('grid grid-cols-4 gap-8', className)} {...rest} />
}

type ListItemProps = {
	label: string
	value: string | number | null | undefined
	placeholder?: string
	className?: string
}

function ListItem(props: ListItemProps) {
	const { label, value, placeholder = 'N/A', className } = props
	return (
		<li className={cn('col-span-full flex flex-col gap-1', className)}>
			<span className="font-medium">{label}:</span>
			{value?.toString() || placeholder}
		</li>
	)
}

export const Details = {
	List,
	ListItem,
}