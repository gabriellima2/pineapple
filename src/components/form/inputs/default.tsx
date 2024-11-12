import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'

type DefaultProps = Parameters<typeof Input>[0]

export const Default = forwardRef<HTMLInputElement, DefaultProps>(
	(props, ref) => {
		const { type = 'text', ...rest } = props
		return <Input type={type} ref={ref} {...rest} />
	}
)

Default.displayName = 'Inputs.Default'
