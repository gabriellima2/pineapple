type CustomMutationOptions = {
	onSuccess?: () => void | Promise<void>
	onError?: (error: Error) => void
}

type RowAction = {
	label: string
	href?: string
	separator?: boolean
	className?: string
	icon?: JSX.Element
	onClick?: () => unknown
}

type Option = {
	value: string
	label: string
}
