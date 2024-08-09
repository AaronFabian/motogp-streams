'use client';

import { MouseEvent, MouseEventHandler, useState } from 'react';
import LineIcon from './LineIcon.tsx';
import Image from 'next/image';
import { User } from 'next-auth';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import toast from 'react-hot-toast';
import LineAddOfficialAccountButton from './LineAddOfficialAccountButton.tsx';

export default function LineServiceRegisterPanel({ user }: { user: User }) {
	const [showQR, setShowQR] = useState(false);

	async function copyToClipboard(e: MouseEvent<HTMLSpanElement>) {
		const span = e.target as HTMLSpanElement;
		const text = span.textContent;

		await navigator.clipboard.writeText(text!);
		toast.success('Command copied to clipboard');
	}

	if ((user as any).lineUUID) {
		return (
			<div className="relative flex items-center mt-2">
				<LineIcon className="w-16 scale-125" />

				<p>Line Registered !</p>
			</div>
		);
	}

	return (
		<>
			<div className="relative flex items-center mt-2">
				<LineIcon className="w-16 scale-125" />

				<button className="px-4 py-2 bg-dim-white w-full rounded-lg" onClick={() => setShowQR(e => !e)}>
					{showQR ? 'Close' : 'Show'} Channel QR code
				</button>
			</div>

			{showQR && (
				<>
					<p className="text-[12px]">1. Scan the QR code with your phone</p>
					<p className="text-[12px]">2. Add MotoGP streams official Line channel account</p>
					<p className="text-[12px]">
						3. At the enter message, copy paste this command below <br />
						<span className="text-primary-gold-500 pl-3" onClick={copyToClipboard}>
							register me/{user.email}
						</span>
						<span className="pl-1 text-alert" onClick={copyToClipboard}>
							* click to copy
						</span>
					</p>
					<p className="text-[12px]">4. Once finished then refresh the website</p>
					<Image
						className="m-auto py-2"
						alt="MotoGP Streams Line Icon"
						src={'/icons/LineQRCode/S_gainfriends_2dbarcodes_GW.png'}
						width={200}
						height={200}
					/>

					<LineAddOfficialAccountButton />
				</>
			)}
		</>
	);
}
