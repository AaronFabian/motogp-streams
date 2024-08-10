'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { socket } from '../socket';

import Image from 'next/image';

export default function CommentsStreamPanel() {
	const [isPanelOpened, setPanel] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const [transport, setTransport] = useState('N/A');

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

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
		};
	}, []);

	function handlePanel() {
		setPanel(op => !op);
	}

	return (
		<div className="p-2">
			<div
				className={`w-full px-2 pt-4 max-h-48 bg-primary-gray-500 rounded-2xl relative ${
					isPanelOpened ? 'min-h-44 pb-2' : 'overflow-hidden h-0 rounded-3xl'
				}`}
				onClick={handlePanel}
			>
				<div className="grid grid-cols-[2.5rem_1fr] px-5 p-2 grid-rows-[1.5rem_1.5rem_1fr] items-center rounded-xl bg-primary-black-500 gap-x-2.5">
					<Image
						src={'/icons/dummy-avatar-32-32.png'}
						className="row-span-2 self-center justify-self-center"
						width={32}
						height={32}
						alt="avatar of dummy avatar icon"
					/>
					<p className="text-xs self-end">Aaron Fabian</p>
					<p className="text-[8px] self-start">At, Thursday, 13 Nov 2024</p>
					<p className="text-xs col-span-2 font-light">
						Lorem ipsum dolor sit amet consectetur adipisicin g elit. Nulla excepturi eaque a, perferendis obcaecati
						blanditiis. Sapiente ipsum quaerat adipisci eum!
					</p>
				</div>
				<ChevronDownIcon className="w-3 absolute top-0.5 left-1/2 -translate-x-1/2" />
			</div>

			<p className="text-xs">Status: {isConnected ? 'connected' : 'disconnected'}</p>
			<p className="text-xs">Transport: {transport}</p>
		</div>
	);
}
