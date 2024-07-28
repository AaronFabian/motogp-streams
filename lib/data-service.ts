import { promisify } from 'util';

import { connection } from '@/lib/db';
import { Calendar } from '@/app/_components/AccountIncomingAlertList.tsx';

declare interface RowDataPacket {}

// wrap the connection.query function with Promise; .bind() make sure that
// internal library 'this' is available otherwise can cause error or ambiguity
// the reason use this utility is to avoid the new Promise pattern instead use await
export const connQuery = promisify(connection.query).bind(connection) as any;

export interface MotoGPTodayStream {
	title: string;
	year: number;
	month: number;
	day: number;
	dayName: string;
	monthName: string;
	time: string;
	circuitName: string;
	status: string;
	type: string;
	category: string;
	categoryName: string;
	flagSrc: string;
}

export interface IncomingAlert {
	id: number;
	message: string;
	sendAt: Date;
	lineToUUID: string;
	calendar: Calendar;
	time: string;
	category: string;
	categoryName: string;
}

export async function getTodayStreams(): Promise<MotoGPTodayStream[]> {
	// get any date from any country
	const currentDate = new Date();

	// convert them into japan date
	// const jpDate = new Date(currentDate.toLocaleDateString('en-US', { timeZone: 'Asia/Tokyo' }));

	const query = 'CALL today_streams(?, ?, ?)';
	const [todayStreams, _] = await connQuery(query, [
		currentDate.getFullYear(),
		10, // currentDate.getMonth() + 1, // month start from 0
		6,
	]);

	const motoGPTodayStreams: MotoGPTodayStream[] = todayStreams.map((stream: any) => ({
		title: stream.title,
		year: stream.year,
		month: stream.month,
		day: stream.day,
		dayName: stream.day_name,
		monthName: stream.month_name,
		time: stream.time,
		circuitName: stream.circuit_name,
		status: stream.status,
		type: stream.type,
		category: stream.category,
		categoryName: stream.category_name,
		flagSrc: stream.flag_src,
	}));

	return motoGPTodayStreams;
}

export async function getIncomingAlerts(userId: number): Promise<IncomingAlert[]> {
	const query = 'CALL user_incoming_alerts(?)';
	const [incomingAlerts, _] = (await connQuery(query, [userId])) as any[];

	const userIncomingAlerts: IncomingAlert[] = incomingAlerts.map((alert: any) => {
		const calendar: Calendar = {
			day: alert.day,
			month: alert.month,
			year: alert.year,
			dayName: alert.day_name,
			monthName: alert.month_name,
		};

		const incomingAlert: IncomingAlert = {
			id: alert.id,
			message: alert.message,
			time: alert.time,
			sendAt: alert.send_at,
			lineToUUID: alert.line_to_uuid,
			category: alert.category,
			categoryName: alert.category_name,
			calendar,
		};

		return incomingAlert;
	});

	return userIncomingAlerts;
}

export async function getUser(email: string, password: string) {
	const query = 'CALL get_user_by_email(?);';
	// await connQuery(query);

	return {
		username: 'Aaron Fabian',
		email: 'aaronfabian78@gmail.com',
		pictureUrl: null,
	};
}

export async function getUserByEmail(email: string) {
	const query = 'CALL get_user_by_email(?)';
	const [users] = await connQuery(query, [email]);
	const user = users[0]; // should be and only want 1 data

	return user;
}

export async function createUserUsingGoogle(email: string, username: string) {
	try {
		const query = 'CALL create_user_using_google(?, ?);';
		await connQuery(query, [email, username]);
	} catch (error) {
		console.error('Fatal Error: Something went wrong when creating user using Google !', error);
		throw new Error('Fatal Error: Something went wrong when creating user using Google !');
	}
}
