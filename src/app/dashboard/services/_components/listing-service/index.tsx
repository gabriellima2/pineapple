import { ServicesTable } from './components/services-table'
import { getServices } from '../../_actions/service-action'

export async function ListingService() {
	const services = await getServices()
	return <ServicesTable services={services || []} />
}
