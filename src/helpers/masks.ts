export function cnpjMask(cnpj: string) {
	if (!cnpj) return ''
	cnpj = cnpj.replace(/\D/g, '')
	cnpj = cnpj.slice(0, 14)
	cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2')
	cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
	cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2')
	cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2')
	return cnpj
}

export function cpfMask(cpf: string) {
	if (!cpf) return ''
	cpf = cpf.replace(/\D/g, '')
	cpf = cpf.slice(0, 11)
	cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
	cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
	cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
	return cpf
}

export function zipCodeMask(zipCode: string): string {
	if (!zipCode) return ''
	zipCode = zipCode.replace(/[^\d]/g, '')
	zipCode = zipCode.slice(0, 8)
	zipCode = zipCode.replace(/^(\d{5})(\d)/g, '$1-$2')
	return zipCode
}

export function phoneMask(phone: string): string {
	if (!phone) return ''
	phone = phone.replace(/\D/g, '')
	phone = phone.slice(0, 10)
	phone = phone.replace(/^(\d{2})(\d)/, '($1) $2')
	phone = phone.replace(/(\d{4})(\d)/, '$1-$2')
	return phone
}

export function cellPhoneMask(cellPhone: string): string {
	if (!cellPhone) return ''
	cellPhone = cellPhone.replace(/\D/g, '')
	cellPhone = cellPhone.slice(0, 11)
	cellPhone = cellPhone.replace(/^(\d{2})(\d)/, '($1) $2')
	cellPhone = cellPhone.replace(/(\d{5})(\d)/, '$1-$2')
	return cellPhone
}

export function numbersMask(v: string): string {
	if (!v) return ''
	v = v.replace(/\D/g, '')
	return v
}

export function currencyMask(
	value: string | number,
	settings?: Intl.NumberFormatOptions
): string {
	const number = parseFloat(value as string)
	if (isNaN(number)) return ''

	let newValue = value
	if (typeof newValue === 'string') {
		newValue = newValue?.replace('.', '').replace(',', '').replace(/\D/g, '')
	}

	const options = { minimumFractionDigits: 2, ...settings }
	const result = new Intl.NumberFormat('pt-BR', options).format(
		typeof newValue === 'string' ? parseFloat(newValue) / 100 : newValue
	)

	return result
}
