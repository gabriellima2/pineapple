import { ServiceHistoryTable } from './components/service-history-table'
import { getAllServiceHistory } from '../../_actions/service-history-action'

export async function ListingService() {
	const serviceHistory = await getAllServiceHistory()
	console.log(serviceHistory)
	return <ServiceHistoryTable serviceHistory={serviceHistory || []} />
}
