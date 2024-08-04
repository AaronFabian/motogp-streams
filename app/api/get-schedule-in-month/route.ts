import { getSchedulesInMonth } from '@/lib/data-service.ts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const [year, month, order] = [searchParams.get('year'), searchParams.get('month'), searchParams.get('order')];
		if (!year || !month || !order) throw new Error('Please provide the qualifies URL params');

		const data = await getSchedulesInMonth(Number(year), Number(month), Number(order));

		// sqlPacket: data[1]
		return NextResponse.json({ status: 'success', data: data[0] }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ status: 'fail', message: (error as Error).message }, { status: 400 });
	}
}
