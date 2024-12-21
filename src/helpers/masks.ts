export function cellPhoneBRMask(cellPhone: string): string {
	if (!cellPhone) return ''
	cellPhone = cellPhone.replace(/\D/g, '')
	cellPhone = cellPhone.slice(0, 11)
	cellPhone = cellPhone.replace(/^(\d{2})(\d)/, '($1) $2')
	cellPhone = cellPhone.replace(/(\d{5})(\d)/, '$1-$2')
	return cellPhone
}

export function cellPhoneUSMask(cellPhone: string): string {
	if (!cellPhone) return ''
	cellPhone = cellPhone.replace(/\D/g, '')
	cellPhone = cellPhone.slice(0, 10)
	cellPhone = cellPhone.replace(/^(\d{3})(\d)/, '($1) $2')
	cellPhone = cellPhone.replace(/(\d{3})(\d{4})$/, '$1-$2')
	return cellPhone
}

export function numbersMask(v: string): string {
	if (!v) return ''
	v = v.replace(/\D/g, '')
	return v
}

export function currencyBRLMask(value: string | number): string {
	const number = parseFloat(value as string)
	if (isNaN(number)) return ''

	let newValue = value
	if (typeof newValue === 'string') {
		newValue = newValue?.replace('.', '').replace(',', '').replace(/\D/g, '')
	}

	const options: Intl.NumberFormatOptions = { minimumFractionDigits: 2 }
	const result = new Intl.NumberFormat('pt-BR', options).format(
		typeof newValue === 'string' ? parseFloat(newValue) / 100 : newValue
	)

	return result
}

export function currencyUSDMask(value: string | number): string {
	const number = parseFloat(value as string)
	if (isNaN(number)) return ''

	let newValue = value
	if (typeof newValue === 'string') {
		newValue = newValue?.replace('.', '').replace(',', '').replace(/\D/g, '')
	}

	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: 2,
	}

	const result = new Intl.NumberFormat('en-US', options).format(
		typeof newValue === 'string' ? parseFloat(newValue) / 100 : newValue
	)

	return result
}
