import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	CardDescription,
} from '@/components/ui/card'
import { SignInForm } from './_components/sign-in-form'

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
				<CardContent>
					<SignInForm />
				</CardContent>
			</Card>
		</div>
	)
}
