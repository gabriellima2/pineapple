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
	disable?: boolean
	/** fixed option that can't be removed. */
	fixed?: boolean
	/** Group the options by providing key. */
	[key: string]: string | boolean | undefined
}
