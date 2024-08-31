/*
	Author: Aaron Fabian

	action using use server to handle the next js backend.
*/

'use server';

import { auth, signIn } from '@/lib/auth';
import {
	findRequestedResult,
	registerIncomingMessage,
	unregisterIncomingMessage,
	updateIncomingMessage,
} from './data-service.ts';
import {
	getSchedulesInMonth as __getSchedulesInMonth,
	getSchedulesPerDay,
	insertCommentHistory,
} from '@/lib/data-service.ts';

export async function handleUserRequestSchedules(
	year: number,
	month: number,
	day: number,
	order: number,
	userId: number
) {
	if (!year || !month || !day || !order) throw new Error('Please provide the qualifies URL params');

	const cleanedUserId = userId !== null ? Number(userId) : 0;
	const data = (await getSchedulesPerDay(year, month, day, order, cleanedUserId)) as any;

	return data?.[0];
}

export async function signInAction() {
	await signIn('google', { redirectTo: '/account' });
}

export async function getSchedulesInMonth(year: number, month: number) {
	const [data, _] = (await __getSchedulesInMonth(Number(year), Number(month))) as any;
	return data.map((d: any) => d.day);
}

export async function registerAlert(ids: any, alertDate: Date, eventDate: Date, alertEnum: string, title: string) {
	const session = await auth();
	if (!session?.user) return ['ERROR', null];

	if ((session.user as any).lineUUID === null) return ['LINE_REQUIRED', null];

	ids.userId = session.user.id;
	ids.userLineUUID = (session.user as any).lineUUID;

	// user id,
	// schedule id
	// event id
	// schedule id
	// circuit id
	const registerMsg = `[EVENT ALERT]
Hello ${session.user.name}!
The event that you have been awaiting is incoming in ${alertEnum}. 
Don't forget to watch your favorite race!

-- Title
${title}

-- Event Date
${eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' })}

Visit: ${process.env.NEXT_PUBLIC_URL}
`;
	// console.log(ids);
	const insertedId = await registerIncomingMessage(ids, alertDate, alertEnum, registerMsg, eventDate);
	if (insertedId === null) return ['ERROR_WHILE_REGISTER_MESSAGE', null];

	return ['SUCCESS', insertedId];
}

export async function unregisterAlert(alertId: number): Promise<boolean> {
	const session = await auth();

	// for security we add to parameter user line ID
	const userLineUUID = (session!.user as any).lineUUID;
	const userId = Number(session!.user!.id);

	const result = await unregisterIncomingMessage(userId, userLineUUID, alertId);
	if (!result) return false;

	return true;
}

export async function updateAlert(incomingMessageId: number, alertEnum: string): Promise<boolean> {
	const session = await auth();

	// for security we add to parameter user line ID
	const userLineUUID = (session!.user as any).lineUUID;
	const userId = Number(session!.user!.id);

	return await updateIncomingMessage(userId, userLineUUID, incomingMessageId, alertEnum);
}

export async function handleInsertingComment(params: any) {
	const result = (await insertCommentHistory(params)) as any[];

	return result[0];
}

export async function handleFindResult(title: string, category: string, session: string) {
	try {
		const result = await findRequestedResult(title, category, session);

		return result;
	} catch (error) {
		console.error(error);
		return [];
	}
}

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
