import { ServiceHistoryTable } from './components/service-history-table'
import { getAllServiceHistoryWithDetails } from '../../_actions/service-history-action'

export async function ListingService() {
	const serviceHistory = await getAllServiceHistoryWithDetails()
	return <ServiceHistoryTable serviceHistory={serviceHistory || []} />
}
