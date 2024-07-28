'use server';

import { signIn } from '@/lib/auth';

// export async function loginUser(formData: FormData) {
// 	// 00 retrieve data from the user
// 	const email = formData.get('email') as string;
// 	const password = formData.get('password') as string;

// 	try {
// 		// 01 form validation
// 		if (email.length < 6 || !email.includes('@')) {
// 			throw new Error('Please input the valid email format');
// 		}

// 		if (password.length < 6) {
// 			throw new Error('Please input the valid password format');
// 		}

// 		// 02 send request to backend to validate the credential
// 		const response = await fetch('http://localhost:3000/api/auth/login', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ email, password }),
// 		});

// 		const data = await response.json();

// 		if (!response.ok) throw new Error(data.message);

// 		// 03 set the token and set to user cookie
// 		cookies().set('token', data.data.token);

// 		revalidatePath('/');

// 		return data;
// 	} catch (error) {
// 		console.error('AT action.ts, ', error);
// 		return { status: 'fail', message: (error as Error).message };
// 	}
// }

export async function signInAction() {
	await signIn('google', { redirectTo: '/account' });
}
