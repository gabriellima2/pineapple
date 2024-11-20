type CustomMutationOptions = {
	onSuccess?: () => void | Promise<void>
	onError?: (error: Error) => void
}
