import { z } from 'zod'

const envSchema = z.object({
	SUPABASE_URL: z.string().url(),
	SUPABASE_KEY: z.string(),
	CLERK_PUBLISHABLE_KEY: z.string(),
})

export const env = envSchema.parse({
	SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
	CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
})
