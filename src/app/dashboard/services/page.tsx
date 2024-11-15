import { UserButton } from '@clerk/nextjs'

import { ServicesTable } from './_components/services-table'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcumbs } from '@/components/breadcumbs'

import { getServices } from './_actions/service-action'

export default async function Page() {
	const services = await getServices()
	return (
		<>
			<header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcumbs breadcumbs={breadcumbs} />
				</div>
				<UserButton />
			</header>
			<main className="px-4">
				<ServicesTable services={services || []} />
			</main>
		</>
	)
}

const breadcumbs = [
	{
		title: 'Serviços',
	},
]
