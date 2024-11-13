import { Fragment } from 'react'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type BreadcumbsProps = {
	breadcumbs: {
		title: string
		href?: string
	}[]
}

export function Breadcumbs(props: BreadcumbsProps) {
	const { breadcumbs } = props
	const breadcumbsAmount = breadcumbs.length - 1
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcumbs.map((breadcumb, i) => (
					<Fragment key={i}>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href={breadcumb.href}>
								{breadcumb.title}
							</BreadcrumbLink>
						</BreadcrumbItem>
						{i < breadcumbsAmount && (
							<BreadcrumbSeparator className="hidden md:block" />
						)}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
