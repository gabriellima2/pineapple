'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { BriefcaseBusiness, History, User2 } from 'lucide-react'

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
} from '@/components/ui/sidebar'

import { ROUTES } from '@/constants/routes'

export function Navigation() {
	const t = useTranslations()
	const pathname = usePathname()
	return (
		<SidebarGroup>
			<SidebarMenu>
				<SidebarMenuButton asChild active={pathname === routes.services}>
					<Link href={routes.services}>
						<BriefcaseBusiness />
						<span>{t('dashboard.sidebar.services')}</span>
					</Link>
				</SidebarMenuButton>
				<SidebarMenuButton asChild active={pathname === routes.customers}>
					<Link href={routes.customers}>
						<User2 />
						<span>{t('dashboard.sidebar.customers')}</span>
					</Link>
				</SidebarMenuButton>
				<SidebarMenuButton asChild active={pathname === routes.serviceHistory}>
					<Link href={routes.serviceHistory}>
						<History />
						<span>{t('dashboard.sidebar.service-history')}</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenu>
		</SidebarGroup>
	)
}

const routes = {
	services: ROUTES.DASHBOARD.SERVICES(),
	customers: ROUTES.DASHBOARD.CUSTOMERS(),
	serviceHistory: ROUTES.DASHBOARD.SERVICE_HISTORY(),
}
