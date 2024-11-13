'use server'

import { cookies } from 'next/headers'

import { COOKIES_KEYS } from '@/constants/keys'
import { LOCALES } from '@/constants/general'

export async function setLocaleCookie(locale: string) {
	const cookiesStore = await cookies()
	cookiesStore.set(COOKIES_KEYS.LOCALE, locale)
}

export async function getLocaleCookie() {
	const cookiesStore = await cookies()
	const locale = cookiesStore.get(COOKIES_KEYS.LOCALE)?.value?.toLowerCase()
	const findedLocale = locale && LOCALES[locale as keyof typeof LOCALES]
	return findedLocale || LOCALES.pt
}
