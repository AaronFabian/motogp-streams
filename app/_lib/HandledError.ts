export enum HandledErrorType {
	SUBMIT_ERROR = 'submit_error',
}

export class HandledError extends Error {
	type: HandledErrorType;
	constructor(type: HandledErrorType, message: string) {
		super(message);
		this.type = type;
	}
}
