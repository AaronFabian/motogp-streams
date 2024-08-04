export async function POST(request: Request) {
	const { year, month, day, dayName } = await request.json();
}
