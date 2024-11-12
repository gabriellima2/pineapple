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
import { Inputs } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'

import { signUpSchema, type SignUpFields } from '../_schemas/sign-up.schema'

export function SignUpForm() {
	const form = useForm<SignUpFields>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	})
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(console.log)} className="space-y-6">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={field.name}>Usuário</FormLabel>
							<FormControl>
								<Inputs.Default
									id={field.name}
									placeholder="Joe Doe"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={field.name}>Email</FormLabel>
							<FormControl>
								<Inputs.Default
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
								<Inputs.Password id={field.name} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Criar
				</Button>
			</form>
		</Form>
	)
}
