'use client';

import { ChangeEvent } from 'react';

export default function LineAlertButton({
	alertId,
	alertMeBefore,
	alertMessage,
	handleSetAlert,
}: {
	alertId: number;
	alertMeBefore: string;
	alertMessage: string;
	handleSetAlert: () => void;
}) {
	function handleSetAlarm(e: ChangeEvent<HTMLSelectElement>) {
		console.log(e.target.value);
	}

	return (
		<>
			<label htmlFor="alert_option" className="text-sm col-span-2">
				Alert me at
			</label>
			<div className="relative col-span-3 me-auto self-center w-full overflow-y-visible">
				<select
					defaultValue={alertMeBefore}
					id="alert_option"
					className="bg-transparent text-xs rounded-xl w-full border border-primary-white-500 px-10 text-center"
					onChange={handleSetAlarm}
				>
					<option className="bg-primary-gray-500" value="null">
						Unset
					</option>
					<option className="bg-primary-gray-500" value="1-day">
						1 day before
					</option>
					<option className="bg-primary-gray-500" value="2-day">
						2 day before
					</option>
					<option className="bg-primary-gray-500" value="1-week">
						1 week before
					</option>
				</select>
			</div>
		</>
	);
}
