import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
	// Response.json();
	return NextResponse.json({
		status: 'success',
		data: {
			message: 'Server Ok',
			requestHeaders: request.headers,
		},
	});
}
