import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	CardDescription,
} from '@/components/ui/card'
import { SignInForm } from './_components/sign-in-form'
import Link from 'next/link'

export default function Page() {
	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader>
					<CardTitle>Entrar</CardTitle>
					<CardDescription>
						Digite as suas credenciais abaixo para entrar
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<SignInForm />
					<p className="text-center">
						Não possui uma conta?{' '}
						<Link href="/sign-up" className="underline">
							Criar agora
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
