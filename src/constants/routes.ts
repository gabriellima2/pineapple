export const ROUTES = {
	AUTH: {
		SIGN_IN: (locale: string) => `/${locale}/sign-in`,
		SIGN_UP: (locale: string) => `/${locale}/sign-up`,
	},
	DASHBOARD: {
		HOME: (locale: string) => `/${locale}/dashboard`,
		SERVICES: (locale: string) => `/${locale}/services`,
	},
}
