import { promisify } from 'util';

import { connection } from '@/lib/db';
import { Calendar } from '@/app/_components/AccountIncomingAlertList.tsx';

// wrap the connection.query function with Promise; .bind() make sure that
// internal library 'this' is available otherwise can cause error or ambiguity
// the reason use this utility is to avoid the new Promise pattern instead use await
// export const connQuery = promisify(connection.query).bind(connection) as any;

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
	title: string;
	calendar: Calendar;
	circuitName: string;
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
	const conn = await connection;
	const [result, _] = (await conn.query(query, [
		currentDate.getFullYear(),
		currentDate.getMonth() + 1, // currentDate.getMonth() + 1, // month start from 0
		currentDate.getDate(),
	])) as any;

	const [todayStreams, resultHeader] = result;
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
	const conn = await connection;
	const [[incomingAlerts, resultHeader], packet] = (await conn.query(query, [userId])) as any;

	const userIncomingAlerts: IncomingAlert[] = incomingAlerts.map((alert: any) => {
		const calendar: Calendar = {
			year: alert.year,
			month: alert.month,
			day: alert.day,
		};

		const incomingAlert: IncomingAlert = {
			id: alert.schedule_id,
			time: alert.time,
			title: alert.title,
			circuitName: alert.circuit_name,
			// sendAt: alert.send_at,
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
	const conn = await connection;
	const [users] = (await conn.query(query, [email])) as any;
	const user = users[0]; // should be and only want 1 data

	return user;
}

export async function createUserUsingGoogle(email: string, username: string) {
	try {
		const query = 'CALL create_user_using_google(?, ?);';
		const conn = await connection;
		await conn.query(query, [email, username]);
	} catch (error) {
		console.error('Fatal Error: Something went wrong when creating user using Google !', error);
		throw new Error('Fatal Error: Something went wrong when creating user using Google !');
	}
}

export async function getAllMotoGPMonth() {
	try {
		const query =
			'SELECT month, calendars.order FROM calendars WHERE calendars.year = 2024 GROUP BY month, calendars.order;';
		const conn = await connection;
		const [result, _] = await conn.query(query, []);

		return result;
	} catch (error) {
		console.error('FATAL_ERROR getAllMotoGPMonth', error);
		return null;
	}
}

export async function getSchedulesInMonth(year: number, month: number, order: number) {
	try {
		const query = 'CALL get_schedules_in_month(?, ?, ?)';
		const conn = await connection;
		const [result, _] = await conn.query(query, [year, month, order]);

		return result;
	} catch (error) {
		return null;
	}
}

export async function getSchedulesPerDay(year: number, month: number, day: number, order: number, userId: number) {
	try {
		const query = 'CALL get_schedules_per_day(?, ?, ?, ?, ?)';
		const conn = await connection;
		const [result, _] = await conn.query(query, [year, month, day, order, userId]);

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
		const conn = await connection;
		const [result, _] = (await conn.query(query, [])) as any[];

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

export async function registerIncomingMessage(
	ids: any,
	alertDate: Date,
	alertEnum: string,
	message: string,
	eventDate: Date
) {
	const conn = await connection;

	try {
		const year = alertDate.getFullYear();
		const month = alertDate.getMonth();
		const day = alertDate.getDate();
		const dateStr = `${year}-${month + 1}-${day} 00:00:00`;

		// line UUID
		// user id,
		// schedule id
		// event id
		// schedule id
		// circuit id
		// console.log(ids);
		conn.beginTransaction();

		const query = 'CALL register_incoming_message(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		await conn.query(query, [
			message,
			alertDate,
			ids.userLineUUID,
			ids.userId,
			ids.scheduleId,
			ids.eventId,
			ids.calendarId,
			ids.circuitId,
			alertEnum,
			eventDate,
		]);

		const getLastInsertedIdStr = 'SELECT LAST_INSERT_ID() AS last_id;';
		const [inserted_id, _] = (await conn.query(getLastInsertedIdStr, [])) as any;

		conn.commit();

		return inserted_id[0].last_id as number;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function unregisterIncomingMessage(userId: number, userLineUUID: string, alertId: number) {
	try {
		const query = 'DELETE FROM incoming_messages WHERE id = ? AND line_to_uuid = ? AND user_id = ?';
		const conn = await connection;
		const [response, _] = (await conn.query(query, [alertId, userLineUUID, userId])) as any;
		if (response.affectedRows === 0) {
			throw new Error('no rows to be deleted !');
		}

		return true;
	} catch (error) {
		console.error('FATAL_ERROR unregisterIncomingMessage ', error);
		return false;
	}
}

export async function updateIncomingMessage(
	userId: number,
	userLineUUID: string,
	incomingMessageId: number,
	alertEnum: string
) {
	const dayMinus = Number(alertEnum.split('-')[0]);

	try {
		const query = `UPDATE incoming_messages 
										SET send_at = (SELECT event_date FROM (SELECT event_date FROM incoming_messages WHERE id = ?) AS subquery) + INTERVAL ? DAY, 
										alert_me_before = ?
									WHERE user_id = ? AND line_to_uuid = ? AND incoming_messages.id = ?;
									`;
		const conn = await connection;
		await conn.query(query, [incomingMessageId, -dayMinus, alertEnum, userId, userLineUUID, incomingMessageId]);

		return true;
	} catch (error) {
		console.error('FATAL_ERROR updateIncomingMessage ', error);
		return false;
	}
}
