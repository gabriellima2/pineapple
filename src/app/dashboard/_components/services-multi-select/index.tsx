import { Selects } from '@/components/form/selects'
import { useGetOptions } from './hooks/queries/use-get-options'

type ServicesMultiSelectProps = Omit<
	Parameters<typeof Selects.Searchable>[0],
	'defaultOptions' | 'options'
>

export function ServicesMultiSelect(props: ServicesMultiSelectProps) {
	const { options } = useGetOptions()
	return <Selects.Multi {...props} options={options} />
}
