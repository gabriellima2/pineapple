'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type NavigationProps = {
	links: {
		title?: string
		items: {
			title: string
			url: string
			icon?: LucideIcon
			isActive?: boolean
			items?: {
				title: string
				url: string
			}[]
		}[]
	}[]
}

export function Navigation(props: NavigationProps) {
	const { links } = props
	const pathname = usePathname()
	return (
		<>
			{links.map((link, i) => (
				<SidebarGroup key={i}>
					{link.title && <SidebarGroupLabel>{link.title}</SidebarGroupLabel>}
					<SidebarMenu>
						{link.items.map((item) => {
							const hasSubMenu = !!item.items?.length
							return (
								<Fragment key={item.title}>
									{hasSubMenu ? (
										<Collapsible asChild className="group/collapsible">
											<SidebarMenuItem>
												<CollapsibleTrigger asChild>
													<SidebarMenuButton tooltip={item.title}>
														{item.icon && <item.icon />}
														<span>{item.title}</span>
														<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
													</SidebarMenuButton>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<SidebarMenuSub>
														{item.items?.map((subItem) => (
															<SidebarMenuSubItem key={subItem.title}>
																<SidebarMenuSubButton asChild>
																	<a href={subItem.url}>
																		<span>{subItem.title}</span>
																	</a>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														))}
													</SidebarMenuSub>
												</CollapsibleContent>
											</SidebarMenuItem>
										</Collapsible>
									) : (
										<SidebarMenuButton
											asChild
											className={cn({
												'pointer-events-none bg-black text-white':
													item.url === pathname,
											})}
										>
											<Link href={item.url}>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									)}
								</Fragment>
							)
						})}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	)
}
