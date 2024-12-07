import { CustomersTable } from './components/customers-table'
import { getAllCustomers } from '../../_actions/customer-action'

export async function ListingCustomer() {
	const customers = await getAllCustomers()
	return <CustomersTable customers={customers || []} />
}
