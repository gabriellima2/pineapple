export function convertToNumber(value: string): number {
	const cleanedValue = value.replace(/\./g, '').replace(',', '.')
	const floatValue = parseFloat(cleanedValue)
	if (isNaN(floatValue)) {
		return 0
	} else {
		return floatValue
	}
}
