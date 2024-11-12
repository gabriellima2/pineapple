'use client'
import { forwardRef, useState } from 'react'
import { Eye, EyeOff, type LucideProps } from 'lucide-react'

import { Default } from './default'
import { cn } from '@/lib/utils'

type PasswordProps = Omit<Parameters<typeof Default>[0], 'type'>

const ICON_DEFAULT_STYLES: LucideProps = {
	size: 18,
	color: '#04303B',
}

export const Password = forwardRef<HTMLInputElement, PasswordProps>(
	(props, ref) => {
		const { className, ...rest } = props
		const [isVisible, setIsVisible] = useState(false)

		function handleToggleVisibility() {
			setIsVisible((prevState) => !prevState)
		}

		const visibilityStateMessage = isVisible ? 'Esconder senha' : 'Ver senha'

		return (
			<div className="relative">
				<Default
					type={isVisible ? 'text' : 'password'}
					ref={ref}
					autoCorrect="false"
					autoComplete="off"
					className={cn('pr-10', className)}
					{...rest}
				/>
				<button
					type="button"
					aria-pressed={isVisible}
					onClick={handleToggleVisibility}
					title={visibilityStateMessage}
					aria-label={visibilityStateMessage}
					className="absolute bottom-1/2 right-3 translate-y-1/2 pl-3"
				>
					{isVisible ? (
						<EyeOff {...ICON_DEFAULT_STYLES} />
					) : (
						<Eye {...ICON_DEFAULT_STYLES} />
					)}
				</button>
			</div>
		)
	}
)

Password.displayName = 'Inputs.Password'
