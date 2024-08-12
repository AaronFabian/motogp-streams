import { Socket } from 'socket.io-client';
import { EmitEvent } from './EmitEvent.ts';
import { handleInsertingComment } from '@/lib/action.ts';

class ClientEmitter {
	userId: number;
	sender: string;
	date: Date;

	constructor(builder: ClientEmitterBuilder) {
		this.sender = builder.sender;
		this.date = builder.date;
		this.userId = builder.userId;
	}
}

class ClientEmitterBuilder {
	userId: number;
	sender: string;
	date: Date;

	constructor() {
		this.userId = 0;
		this.sender = '';
		this.date = new Date();
	}

	setSender(sender: string) {
		this.sender = sender;
		return this;
	}

	setDate(date: Date) {
		this.date = date;
		return this;
	}

	setUserId(id: number) {
		this.userId = id;
		return this;
	}

	build() {
		return new ClientEmitter(this);
	}
}

export class ClientCommentEmitter extends ClientEmitter {
	clientLang: string;
	convertedDate: string;
	message: string;

	constructor(builder: ClientCommentEmitterBuilder) {
		super(builder);
		this.clientLang = builder.clientLang;
		this.convertedDate = builder.convertedDate;
		this.message = builder.message;
	}

	async emit(socket: Socket) {
		const newComment = await handleInsertingComment({ ...this });
		if (newComment !== null) {
			socket.emit(EmitEvent.COMMENT, { ...this, id: newComment.id });
			return;
		}

		throw new Error('Unhandled error at ClientEmitter.ts @76');
	}
}

export class ClientCommentEmitterBuilder extends ClientEmitterBuilder {
	clientLang: string;
	convertedDate: string;
	message: string;

	constructor() {
		super();

		this.clientLang = 'ja-JP';
		this.convertedDate = '';
		this.message = '';
	}

	setClientLang(clientLang: string) {
		this.clientLang = clientLang;
		return this;
	}

	setConvertedDate(convertedDate: string) {
		this.convertedDate = convertedDate;
		return this;
	}

	setMessage(message: string) {
		this.message = message;
		return this;
	}

	build(): ClientCommentEmitter {
		return new ClientCommentEmitter(this);
	}
}
