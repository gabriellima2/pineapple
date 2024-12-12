import { Selects } from '@/components/form/selects'
import { useGetOptions } from './hooks/queries/use-get-options'

type ServicesSearchableSelectProps = Omit<
	Parameters<typeof Selects.Searchable>[0],
	'defaultOptions' | 'options'
>

export function ServicesSearchableSelect(props: ServicesSearchableSelectProps) {
	const { options } = useGetOptions()
	return <Selects.Searchable {...props} options={options} />
}
