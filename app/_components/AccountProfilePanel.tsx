'use client';

import { User } from 'next-auth';
import { useState } from 'react';
import Spacer from '@/app/_components/Spacer.tsx';
import Image from 'next/image';

export default function AccountProfilePanel({ user }: { user: User }) {
	const [username, setUsername] = useState((user as any).name);
	const [email, setEmail] = useState((user as any).email);

	return (
		<div className="p-2 w-full min-h-24 bg-primary-gray-500 rounded-2xl mt-4">
			<h2 className="text-center text-2xl">Profile</h2>

			<Spacer className="h-6" />

			<div className="relative w-[90px] h-[90px] m-auto">
				<img sizes="1" className="rounded-full border border-gray-100 shadow-sm" src={user.image!} alt="user image" />

				{/* <div className="absolute top-0 right-0 h-4 w-4 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div> */}
			</div>

			<Spacer className="h-[3.375rem]" />

			<div className="relative mx-1.5">
				<input
					type="text"
					id="username_inp"
					className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border- dark:focus:border-primary-gold-500 focus:outline-none focus:ring-0 focus:border-primary-gold-500 peer"
					placeholder=" "
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<label
					htmlFor="username_inp"
					className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-primary-gold-500 peer-focus:dark:text-primary-gold-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
				>
					Username
				</label>
			</div>

			<Spacer className="h-2.5" />

			<div className="relative mx-1.5">
				<input
					type="text"
					id="email_inp"
					className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border- dark:focus:border-primary-gold-500 focus:outline-none focus:ring-0 focus:border-primary-gold-500 peer"
					placeholder=" "
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<label
					htmlFor="email_inp"
					className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-primary-gold-500 peer-focus:dark:text-primary-gold-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
				>
					Email
				</label>
			</div>

			<Spacer className="h-2.5" />

			{/* <div className="relative mx-1.5">
				<input
					type="password"
					id="reset_password"
					className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border- dark:focus:border-primary-gold-500 focus:outline-none focus:ring-0 focus:border-primary-gold-500 peer"
					placeholder=" "
					value={resetPassword}
					onChange={e => setResetPassword(e.target.value)}
				/>
				<label
					htmlFor="reset_password"
					className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-primary-gold-500 peer-focus:dark:text-primary-gold-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
				>
					Reset Password
				</label>
			</div> */}
		</div>
	);
}
