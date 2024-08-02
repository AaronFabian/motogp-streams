import { getSchedulesPerDay } from '@/lib/data-service.ts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const [year, month, day, order, userId] = [
			searchParams.get('year'),
			searchParams.get('month'),
			searchParams.get('day'),
			searchParams.get('order'),
			searchParams.get('user-id'),
		];
		if (!year || !month || !day || !order) throw new Error('Please provide the qualifies URL params');

		const cleanedUserId = userId !== 'null' ? Number(userId) : 0;
		const data = await getSchedulesPerDay(Number(year), Number(month), Number(day), Number(order), cleanedUserId);

		return NextResponse.json({ status: 'success', data: data[0] }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ status: 'fail', message: (error as Error).message }, { status: 400 });
	}
}
