export class InternalServerErrorException extends Error {
	constructor() {
		super('An internal server error occurred')
		this.name = 'InternalServerErrorException'
	}
}
