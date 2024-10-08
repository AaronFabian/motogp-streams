'use client';

export default function CustomIframe({ iframeData }: { iframeData: any }) {
	const today = new Date();
	const year = today.toLocaleDateString('en-US', { year: 'numeric' });
	const month = today.toLocaleDateString('en-US', { month: '2-digit' });
	const date = today.toLocaleDateString('en-US', { day: '2-digit' });
	// const hour = today.toLocaleTimeString('en-US', { hour: '2-digit' });
	// const minute = today.toLocaleDateString('en-US', { hour: '2-digit' });

	const getIframe = iframeData[`${year}-${month}-${date}`]?.reduce((_: any, cur: any) => {
		// Example UTC date string in ISO 8601 format
		const utcDateString = cur.eventTimeInUTC + ':00.000Z';

		// Create a new Date object treating it as UTC
		const eventDateIntUTC = new Date(utcDateString);

		// Convert UTC date to Asia/Tokyo timezone
		// const tokyoTimeZone = 'Asia/Tokyo';
		// const tokyoDate = toZonedTime(eventDateIntUTC, tokyoTimeZone);

		// Format the date for output
		// const tokyoDateString = format(tokyoDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: tokyoTimeZone });

		// console.log('UTC Date:', eventDateIntUTC);
		// console.log('Tokyo Date:', tokyoDateString);

		if (Date.now() > eventDateIntUTC.getTime()) {
			return cur;
		}
	}, undefined);

	return (
		<>
			{getIframe === undefined && (
				<div className="h-10 w-full bg-primary-gray-500 flex justify-center items-center">
					<p className="text-center text-xs">The page will automatically restart when the schedule start</p>
				</div>
			)}

			{getIframe && <div className="aspect-video" dangerouslySetInnerHTML={{ __html: getIframe.iframe }}></div>}
		</>
	);
}
