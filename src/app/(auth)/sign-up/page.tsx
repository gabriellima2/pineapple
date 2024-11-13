import Link from 'next/link'

import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	CardDescription,
} from '@/components/ui/card'
import { SignUpForm } from './_components/sign-up-form'

import { ROUTES } from '@/constants/routes'

export default function Page() {
	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader>
					<CardTitle>Criar conta</CardTitle>
					<CardDescription>
						Digite as suas credenciais abaixo para criar uma conta
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<SignUpForm />
					<p className="text-center">
						Já possui uma conta?{' '}
						<Link href={ROUTES.AUTH.SIGN_IN()} className="underline">
							Entrar
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
