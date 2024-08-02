'use client';

import { signInAction } from '@/lib/action';
import Image from 'next/image';
import { useState } from 'react';
import MotoGPStreamsIcon from './MotoGPStreamsIcon.tsx';

export default function LoginForm() {
	const [disableBtn, setDisableBtn] = useState(false);

	return (
		<form
			className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
			action={signInAction}
		>
			<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-primary-white-500">
				<MotoGPStreamsIcon className="w-8 h-8 mr-2 fill-primary-white-500" />
				MotoGP Streams
			</a>
			<div className="w-full bg-white scale-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-gray-800 dark:border-gray-700  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-primary-white-500">
						Sign in to your account
					</h1>
					<div className="space-y-4 md:space-y-6">
						{/* 
						<div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-primary-white-500"
							>
								Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-primary-white-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="name@example.com"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-primary-white-500"
							>
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-primary-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-primary-white-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required
							/>
						</div>
						{/* <div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											required
										/>
									</div>
									<div className="ml-3 text-sm">
										<label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
											Remember me
										</label>
									</div>
								</div>
								<a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
									Forgot password?
								</a>
							</div> */}
						<button
							type="submit"
							disabled={disableBtn}
							className="w-full text-primary-white-500 bg-primary-gray-500 hover:bg-primary-gray-500 focus:ring-4 focus:outline-none hover: focus:ring-dim-gold font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 focus:bg-dim-white"
						>
							{disableBtn ? 'Signing in...' : 'Sign in with Google'}
							<span>
								<Image
									src={'https://authjs.dev/img/providers/google.svg'}
									width={16}
									height={16}
									alt="Google Icon"
									className="inline-block ml-5"
								/>
							</span>
						</button>
						{/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
							Don’t have an account yet?{' '}
							<a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
								Sign up
							</a>
						</p> */}
					</div>
				</div>
			</div>
		</form>
	);
}
