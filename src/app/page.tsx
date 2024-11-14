import { redirect } from 'next/navigation'
import { SignedIn, SignedOut } from '@clerk/nextjs'

import { ROUTES } from '@/constants/routes'

export default function Home() {
	return (
		<>
			<SignedIn>{redirect(ROUTES.DASHBOARD.SERVICES())}</SignedIn>
			<SignedOut>{redirect(ROUTES.AUTH.SIGN_IN())}</SignedOut>
		</>
	)
}
