import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
export async function GET(request: NextRequest) {
	// 01 check from the user if the cookie is available from user device
	const authHeader = request.headers.get('Authorization') ?? 'Bearer invalid';
	const token = authHeader.split(' ')[1];
	const secretKey = process.env.SECRET_KEY as string;

	// const object = cookies().get('token') ?? { value: '' };
	// token = object.value;
	// const secretKey = process.env.SECRET_KEY as string;

	try {
		// 02 from cookie take the value then begin the cookie validation
		const user = jwt.verify(token, secretKey);

		// 03 if there is no problem from verify token the user data will be available. In the other words user is logged in
		return NextResponse.json(
			{
				status: 'success',
				data: {
					user,
					token,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		// 04 when there is an error while verify; catch here and than send error message
		return NextResponse.json(
			{
				status: 'fail',
				data: {
					message: `user data not available. ${(error as Error).message}`,
				},
			},
			{ status: 401 }
		);
	}
}
