import { CustomersTable } from './components/customers-table'
import { getCustomers } from '../../_actions/customer-action'

export async function ListingCustomer() {
	const customers = await getCustomers()
	return <CustomersTable customers={customers || []} />
}
