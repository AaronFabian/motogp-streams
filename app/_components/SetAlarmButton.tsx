'use client';

import { BellAlertIcon } from '@heroicons/react/24/outline';

export default function SetAlarmButton({ time }: { time: string }) {
	function handleSetAlarm() {
		console.log(time);
	}

	return (
		<button onClick={handleSetAlarm}>
			<BellAlertIcon className="w-4 absolute right-4 top-1/2 -translate-y-1/2" />
		</button>
	);
}
