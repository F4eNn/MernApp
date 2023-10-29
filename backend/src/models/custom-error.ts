export class CustomError {
	message!: string;
	status!: number;
	additionalInfo!: any;

	constructor(message: string, status: number, additonalInfo: any = {}) {
		this.message = message;
		this.status = status;
		this.additionalInfo = additonalInfo;
	}
}
