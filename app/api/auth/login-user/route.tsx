import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getUser, getUserByEmail } from '@/lib/data-service.ts';
import { verifyPassword } from '@/lib/utils.ts';

export async function POST(request: Request) {
	try {
		// 00 gain any needed data for login
		const { email, password } = await request.json();

		// 01 connect to database and check if user really there or not
		const userData = await getUserByEmail(email);
		const user = { ...userData }; // from SQL we get RowDataPacket but we want plain object, plaint object required for jwt.sign
		if (!user.email) {
			throw new Error('This email is not found with our record !');
		}

		const isPasswordValid = await verifyPassword(password, user.password);
		if (!isPasswordValid) {
			throw new Error('The credential is not match with our record !');
		}

		// 02 save the JWT to cookie
		const secretKey = process.env.SECRET_KEY as string;
		const token = jwt.sign(user, secretKey, {
			expiresIn: 120,
			algorithm: 'HS256',
		});

		cookies().set({
			name: 'token',
			value: token,
			httpOnly: true,
			sameSite: 'strict',
			path: '/',
		});

		return NextResponse.json(
			{
				status: 'success',
				data: { user, token },
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				status: 'fail',
				message: (error as Error).message,
			},
			{ status: 400 }
		);
	}
}
