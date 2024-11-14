'use client'

import * as React from 'react'
import { BriefcaseBusiness, LayoutDashboard } from 'lucide-react'

import {
	Sidebar as BaseSidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar'
import { Navigation } from './components/navigation'
import { Brand } from '@/components/ui/brand'
import { ROUTES } from '@/constants/routes'

type SidebarProps = React.ComponentProps<typeof BaseSidebar>

export function Sidebar(props: SidebarProps) {
	return (
		<BaseSidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<div className="flex gap-2">
					<Brand />
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">Pineapple Inc</span>
						<span className="truncate text-xs">Dashboard</span>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<Navigation links={data.navMain} />
			</SidebarContent>
			<SidebarRail />
		</BaseSidebar>
	)
}

const data = {
	navMain: [
		{
			items: [
				{
					title: 'Início',
					url: ROUTES.DASHBOARD.HOME(),
					icon: LayoutDashboard,
				},
				{
					title: 'Serviços',
					url: ROUTES.DASHBOARD.SERVICES(),
					icon: BriefcaseBusiness,
				},
			],
		},
	],
}
