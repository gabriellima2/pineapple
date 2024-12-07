import { ServicesTable } from './components/services-table'
import { getAllServices } from '../../_actions/service-action'

export async function ListingService() {
	const services = await getAllServices()
	return <ServicesTable services={services || []} />
}
