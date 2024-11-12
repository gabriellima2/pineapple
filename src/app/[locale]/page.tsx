import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

export default function Home() {
	redirect(ROUTES.AUTH.SIGN_IN('pt'))
}
