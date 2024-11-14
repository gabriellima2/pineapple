import { SignIn } from '@clerk/nextjs'

import { LocaleSelect } from '@/components/locale-select'
import { Logo } from '@/components/ui/logo'

export default function Page() {
	return (
		<main className="flex h-screen w-full flex-col items-center justify-center">
			<header className="flex w-full items-center justify-between gap-4 p-4">
				<Logo />
				<LocaleSelect />
			</header>
			<section className="flex flex-1 items-center justify-center">
				<SignIn />
			</section>
		</main>
	)
}
