'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { signInSchema, type SignInFields } from '../_schemas/sign-in.schema'

export function SignInForm() {
	const form = useForm<SignInFields>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(console.log)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={field.name}>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									id={field.name}
									placeholder="email@domain.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={field.name}>Senha</FormLabel>
							<FormControl>
								<Input type="password" id={field.name} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Entrar
				</Button>
			</form>
		</Form>
	)
}
