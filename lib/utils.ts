import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export function timeDifferent(time1: Date, time2: Date): number {
	const difference = time1.getTime() - time2.getTime();
	const minutesDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

	return minutesDifference;
}

export async function hashingPassword(password: string) {
	const saltRounds = 10;

	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch (error) {
		throw new Error('Error hashing password: ' + (error as Error).message);
	}
}

export async function verifyPassword(password: string, hashedPassword: string) {
	try {
		const match = await bcrypt.compare(password, hashedPassword);
		return match;
	} catch (error) {
		throw new Error('Error verifying password: ' + (error as Error).message);
	}
}

interface JWTPayload {
	isValid: boolean;
	errorObj: jwt.TokenExpiredError | jwt.VerifyErrors | jwt.JsonWebTokenError | Error | null;
}
export function checkUserJWT(): JWTPayload {
	const token = cookies().get('token')?.value;
	if (token === undefined) return { isValid: false, errorObj: new Error('token not found !') };

	try {
		jwt.verify(token, process.env.SECRET_KEY as string);

		// const data = jwt.decode(token, { json: true });
		// console.log(data);

		return { isValid: true, errorObj: null };
	} catch (error) {
		return { isValid: false, errorObj: error as any };
	}
}
