import { UserButton } from '@clerk/nextjs'

import { ServicesBreadcumbs } from './_components/services-breadcumbs'
import { ServicesProvider } from './_contexts/services.context'
import { ServicesTable } from './_components/services-table'
import { LocaleSelect } from '@/components/locale-select'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

import { getServices } from './_actions/service-action'

export default async function Page() {
	const services = await getServices()
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
				<ServicesTable services={services || []} />
			</main>
		</ServicesProvider>
	)
}
