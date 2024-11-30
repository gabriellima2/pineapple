import { Suspense } from 'react'
import { UserButton } from '@clerk/nextjs'

import { CustomersBreadcumbs } from './_components/customers-breadcumbs'
import { CustomersProvider } from './_contexts/customers.context'
import { ListingCustomer } from './_components/listing-customer'
import { ListingSkeleton } from '@/components/ui/skeleton'
import { LocaleSelect } from '@/components/locale-select'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export default function Page() {
	return (
		<CustomersProvider>
			<header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<CustomersBreadcumbs />
				</div>
				<div className="flex items-center gap-2">
					<UserButton />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<LocaleSelect />
				</div>
			</header>
			<main className="px-4">
				<Suspense fallback={<ListingSkeleton />}>
					<ListingCustomer />
				</Suspense>
			</main>
		</CustomersProvider>
	)
}
