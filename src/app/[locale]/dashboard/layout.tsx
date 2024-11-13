import { PropsWithChildren } from 'react'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Sidebar } from './_components/sidebar'

export default function Layout(props: PropsWithChildren) {
	const { children } = props
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	)
}
