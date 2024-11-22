import { Suspense } from 'react'
import { UserButton } from '@clerk/nextjs'

import { ServicesBreadcumbs } from './_components/services-breadcumbs'
import { ServicesProvider } from './_contexts/services.context'
import { ListingService } from './_components/listing-service'
import { ListingSkeleton } from '@/components/ui/skeleton'
import { LocaleSelect } from '@/components/locale-select'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export default function Page() {
	return (
		<ServicesProvider>
			<header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<ServicesBreadcumbs />
				</div>
				<div className="flex items-center gap-2">
					<UserButton />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<LocaleSelect />
				</div>
			</header>
			<main className="px-4">
				<Suspense fallback={<ListingSkeleton />}>
					<ListingService />
				</Suspense>
			</main>
		</ServicesProvider>
	)
}
