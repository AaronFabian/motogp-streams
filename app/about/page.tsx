// import { getTodayStreams } from '@/lib/data-service.ts';

export default async function page() {
	// await getTodayStreams();
	const test = await fetch('https://myanimelist.net/').then(res => res.text());
	console.log(test);

	return <h1>hello world</h1>;
}
