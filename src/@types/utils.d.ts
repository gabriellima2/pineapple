type CustomMutationOptions = {
	onSuccess?: () => void | Promise<void>
	onError?: (error: Error) => void
}

type RowAction = {
	label: string
	onClick?: () => unknown
	href?: string
	separator?: boolean
	className?: string
	icon?: JSX.Element
}
