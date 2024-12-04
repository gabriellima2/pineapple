import type { HTMLAttributes } from 'react'

import { EMPTY_SYMBOL } from '@/constants/general'
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
	const { label, value, placeholder = EMPTY_SYMBOL, className } = props
	return (
		<li
			className={cn(
				'col-span-full flex flex-col gap-1 overflow-x-auto',
				className
			)}
		>
			<span className="font-medium">{label}:</span>
			{value?.toString() || placeholder}
		</li>
	)
}

export const Details = {
	List,
	ListItem,
}
