'use client';

import { handleInsertingComment } from '@/lib/action.ts';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ClientCommentEmitterBuilder } from '../_lib/ClientEmitter.ts';
import { ClientEvent } from '../_lib/ClientEvent.ts';
import { EmitEvent } from '../_lib/EmitEvent.ts';
import { HandledError, HandledErrorType } from '../_lib/HandledError.ts';
import { useUser } from '../_providers/UserContext.tsx';
import { socket } from '../socket';

interface StreamComment {
	id: number;
	message: string;
	convertedDate: string;
	date: Date;
	sender: string;
	senderAvatar: string;
}

export default function CommentsStreamPanel() {
	const { user } = useUser();
	const [isPanelOpened, setPanel] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const [transport, setTransport] = useState('N/A');
	const [clientLang, setClientLang] = useState<string | null>(null);
	const [commentBucket, setCommentBucket] = useState<StreamComment[]>([]);
	const [isSending, setIsSending] = useState(false);
	const messageRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (socket.connected) {
			onConnect();
		}

		function onConnect() {
			setIsConnected(true);
			setTransport(socket.io.engine.transport.name);

			socket.io.engine.on('upgrade', transport => {
				setTransport(transport.name);
			});
		}

		function onDisconnect() {
			setIsConnected(false);
			setTransport('N/A');
		}

		function onAnnounce(data: StreamComment) {
			setCommentBucket(prevComments => [...prevComments, data]);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		socket.on(ClientEvent.ANNOUNCE, onAnnounce);

		if (user) {
			socket.emit(EmitEvent.PERSONAL_WARNING, { id: user.id });
		}
		setClientLang(navigator.language || 'ja-JP');

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off(ClientEvent.ANNOUNCE, onAnnounce);
		};
	}, []);

	function handlePanel() {
		setPanel(op => !op);
	}

	async function handleSubmit(formData: FormData) {
		try {
			setIsSending(true);

			if (!user || !user.id) return toast('Please login to use this feature !');

			const message = String(formData.get('userMessage'));
			if (message === undefined || message === null || message.length < 6)
				throw new HandledError(HandledErrorType.SUBMIT_ERROR, 'Please input the message more than 5 characters !');

			const clientLang = String(formData.get('clientLang'));
			if (clientLang === undefined)
				throw new HandledError(HandledErrorType.SUBMIT_ERROR, 'Something wrong with the HTML structure !');

			// should check all the properties

			const date = new Date();
			const convertedDate = date.toLocaleTimeString(String(clientLang), {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
				weekday: 'short',
			});

			const comment = new ClientCommentEmitterBuilder()
				.setUserId(user.id)
				.setSender(user.name)
				.setMessage(message)
				.setClientLang(clientLang)
				.setDate(date)
				.setConvertedDate(convertedDate)
				.build();

			// if anything fine then emit to socket io
			comment.emit(socket);
		} catch (error) {
			console.error(error);
			toast.error((error as Error).message);
		} finally {
			setIsSending(false);
			formData.set('userMessage', '');
			messageRef.current!.value = '';
		}
	}

	return (
		<div className="p-2">
			<div
				className={`w-full px-2 pt-4 bg-primary-gray-500 rounded-2xl relative ${
					isPanelOpened ? 'min-h-44 pb-2' : 'overflow-hidden h-0 rounded-3xl'
				}`}
			>
				<div className="h-80 flex flex-col gap-y-2 scroll-smooth overflow-scroll rounded-lg">
					{commentBucket.map(c => (
						<CommentCard key={c.id} comment={c} />
					))}
				</div>

				<form action={handleSubmit}>
					<input type="hidden" value={clientLang ?? ''} name="clientLang" />
					<label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white my-2">
						Your message
					</label>
					<textarea
						ref={messageRef}
						id="message"
						rows={4}
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-gold-500 focus:border-primary-gold-500 dark:bg-primary-black-500 dark:border-primary-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Write your thoughts here..."
						name="userMessage"
					></textarea>
					<button
						type="submit"
						className="mt-2 items-center px-5 py-2.5 text-sm font-medium text-center block ml-auto text-white bg-primary-gray-800 rounded-lg focus:ring-4 focus:ring-primary-gold-500 dark:focus:ring-primary-gold-500 hover:bg-dim-gold"
						name="btnSubmit"
						disabled={isSending}
					>
						{isSending ? 'sending...' : 'Publish post'}
					</button>
				</form>

				<ChevronDownIcon className="w-3 absolute top-0.5 left-1/2 -translate-x-1/2" onClick={handlePanel} />
			</div>

			<p className="text-xs">Status: {isConnected ? 'connected' : 'disconnected'}</p>
			<p className="text-xs">Transport: {transport}</p>
		</div>
	);
}

function CommentCard({ comment }: { comment: StreamComment }) {
	return (
		<div className="grid grid-cols-[2.5rem_1fr] w-full px-3 py-2 self-start grid-rows-[1rem_1rem_1fr] items-center rounded-xl bg-primary-black-500 gap-x-2.5 gap-y-1">
			<Image
				// src={comment.senderAvatar}
				src={'/icons/dummy-avatar-32-32.png'}
				className="row-span-2 self-center justify-self-center"
				width={32}
				height={32}
				alt="avatar of dummy avatar icon"
			/>
			<p className="text-xs self-end">{comment.sender}</p>
			<p className="text-[8px] self-start">At, {comment.convertedDate}</p>
			<p className="text-[10px] col-span-2 font-light">{comment.message}</p>
		</div>
	);
}
