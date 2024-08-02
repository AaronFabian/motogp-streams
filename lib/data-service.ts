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
	// get any date from server country
	// current server country will be depend on the instance
	// but for now will be Asia/Japan/Tokyo
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

export async function getSchedulePerMonth(month: number) {
	try {
	} catch (error) {
		console.error('FATAL_ERROR getSchedulePerMonth', error);
		return null;
	}
}

export async function getAllMotoGPMonth() {
	try {
		const query =
			'SELECT month, calendars.order FROM calendars WHERE calendars.year = 2024 GROUP BY month, calendars.order;';
		const result = await connQuery(query, []);

		return result;
	} catch (error) {
		console.error('FATAL_ERROR getAllMotoGPMonth', error);
		return null;
	}
}

export async function getSchedulesInMonth(year: number, month: number, order: number) {
	try {
		const query = 'CALL get_schedules_in_month(?, ?, ?)';
		const result = await connQuery(query, [year, month, order]);

		return result;
	} catch (error) {
		return null;
	}
}

export async function getSchedulesPerDay(year: number, month: number, day: number, order: number, userId: number) {
	try {
		const query = 'CALL get_schedules_per_day(?, ?, ?, ?, ?)';
		const result = await connQuery(query, [year, month, day, order, userId]);

		return result;
	} catch (error) {
		return null;
	}
}

export interface DataCount {
	schedules: number;
	calendars: number;
	circuits: number;
}

export async function getDataCount(): Promise<DataCount | null> {
	try {
		const query = 'SELECT * FROM v_data_count';
		const result = (await connQuery(query, [])) as any[];

		const iData: DataCount = {
			calendars: 0,
			circuits: 0,
			schedules: 0,
		};

		return result.reduce((prev: any, curr: any) => ({ ...prev, [curr.table_name]: curr.total }), iData);
	} catch (error) {
		return null;
	}
}
