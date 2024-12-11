import { Selects } from '@/components/form/selects'
import { useGetOptions } from './hooks/queries/use-get-options'

type CustomersSearchableSelectProps = Omit<
	Parameters<typeof Selects.Searchable>[0],
	'defaultOptions' | 'options'
>

export function CustomersSearchableSelect(
	props: CustomersSearchableSelectProps
) {
	const { options } = useGetOptions()
	return <Selects.Searchable {...props} options={options} />
}
