import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

import { env } from '@/env'

export async function createClerkSupabaseClientSsr() {
	const { getToken } = await auth()
	return createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
		global: {
			// Get the custom Supabase token from Clerk
			fetch: async (url, options = {}) => {
				const clerkToken = await getToken({
					template: 'supabase',
				})

				// Insert the Clerk Supabase token into the headers
				const headers = new Headers(options?.headers)
				headers.set('Authorization', `Bearer ${clerkToken}`)

				// Now call the default fetch
				return fetch(url, {
					...options,
					headers,
				})
			},
		},
	})
}
