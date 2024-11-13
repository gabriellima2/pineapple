'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { ChevronsUpDown, LucideIcon } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type UserProps = {
	user: {
		name: string
		email: string
		avatar: string
	}
	actions: {
		title: string
		icon?: LucideIcon
		href?: string
		onClick?: () => void
	}[][]
}

export function User(props: UserProps) {
	const { user, actions } = props
	const { isMobile } = useSidebar()
	const avatarFallback = user.name[0]
	const actionsAmount = actions.length - 1
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg uppercase">
									{avatarFallback}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="rounded-lg">
										{avatarFallback}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{actions.map((action, i) => (
							<DropdownMenuGroup key={i}>
								{action.map((group, j) => (
									<Fragment key={j}>
										{group.href ? (
											<DropdownMenuItem asChild>
												<Link href={group.href}>
													{group.icon && <group.icon />}
													{group.title}
												</Link>
											</DropdownMenuItem>
										) : (
											<DropdownMenuItem onClick={group.onClick}>
												{group.icon && <group.icon />}
												{group.title}
											</DropdownMenuItem>
										)}
									</Fragment>
								))}
								{i !== actionsAmount && <DropdownMenuSeparator />}
							</DropdownMenuGroup>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
