'use client'

import * as React from 'react'
import {
	BadgeCheck,
	Bell,
	BookOpen,
	Bot,
	CreditCard,
	LogOut,
	Settings2,
	Sparkles,
	SquareTerminal,
} from 'lucide-react'

import {
	Sidebar as BaseSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar'
import { Navigation } from './components/navigation'
import { Brand } from '@/components/ui/brand'
import { User } from './components/user'

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
			<SidebarFooter>
				<User user={data.user} actions={data.actions} />
			</SidebarFooter>
			<SidebarRail />
		</BaseSidebar>
	)
}

const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	actions: [
		[
			{
				title: 'Upgrade to Pro',
				icon: Sparkles,
				onClick: () => console.log('Sair'),
			},
		],
		[
			{
				title: 'Account',
				icon: BadgeCheck,
				onClick: () => console.log('Sair'),
			},
			{
				title: 'Billing',
				icon: CreditCard,
				onClick: () => console.log('Sair'),
			},
			{
				title: 'Notifications',
				icon: Bell,
				onClick: () => console.log('Sair'),
			},
		],
		[
			{
				title: 'Sair',
				icon: LogOut,
				onClick: () => console.log('Sair'),
			},
		],
	],
	navMain: [
		{
			title: 'Navegar',
			items: [
				{
					title: 'Playground',
					url: '#',
					icon: SquareTerminal,
					isActive: true,
					items: [
						{
							title: 'History',
							url: '#',
						},
						{
							title: 'Starred',
							url: '#',
						},
						{
							title: 'Settings',
							url: '#',
						},
					],
				},
				{
					title: 'Models',
					url: '#',
					icon: Bot,
					items: [
						{
							title: 'Genesis',
							url: '#',
						},
						{
							title: 'Explorer',
							url: '#',
						},
						{
							title: 'Quantum',
							url: '#',
						},
					],
				},
				{
					title: 'Documentation',
					url: '#',
					icon: BookOpen,
					items: [
						{
							title: 'Introduction',
							url: '#',
						},
						{
							title: 'Get Started',
							url: '#',
						},
						{
							title: 'Tutorials',
							url: '#',
						},
						{
							title: 'Changelog',
							url: '#',
						},
					],
				},
				{
					title: 'Settings',
					url: '#',
					icon: Settings2,
					items: [
						{
							title: 'General',
							url: '#',
						},
						{
							title: 'Team',
							url: '#',
						},
						{
							title: 'Billing',
							url: '#',
						},
						{
							title: 'Limits',
							url: '#',
						},
					],
				},
			],
		},
	],
}
