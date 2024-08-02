'use client';

/*
	The different from util at top folder is, this util is for client side
	notice 'use client' on top
*/

export function convertTimeToLocale(serverTime: Date): string {
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const formattedTime = new Intl.DateTimeFormat(navigator.language, {
		timeZone,
		hourCycle: 'h24',
		hour: '2-digit',
		minute: 'numeric',
	}).format(serverTime);

	return formattedTime;
}
