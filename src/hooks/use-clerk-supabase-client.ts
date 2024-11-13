'use client'

import { createClient } from '@supabase/supabase-js'
import { useSession } from '@clerk/nextjs'

import { env } from '@/env'

export function useClerkSupabaseClient() {
	const { session } = useSession()
	function createClerkSupabaseClient() {
		return createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
			global: {
				// Get the custom Supabase token from Clerk
				fetch: async (url, options = {}) => {
					const clerkToken = await session?.getToken({
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
	return { client: createClerkSupabaseClient() }
}
