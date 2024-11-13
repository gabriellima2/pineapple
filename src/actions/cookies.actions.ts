'use server'

import { cookies } from 'next/headers'

import { AVAILABLE_LOCALES, LOCALES } from '@/constants/general'
import { COOKIES_KEYS } from '@/constants/keys'

export async function setLocaleCookie(locale: string) {
	const cookiesStore = await cookies()
	cookiesStore.set(COOKIES_KEYS.LOCALE, locale)
}

export async function getLocaleCookie() {
	const cookiesStore = await cookies()
	const locale = cookiesStore.get(COOKIES_KEYS.LOCALE)?.value?.toLowerCase()
	return locale && AVAILABLE_LOCALES.includes(locale) ? locale : LOCALES.pt
}
