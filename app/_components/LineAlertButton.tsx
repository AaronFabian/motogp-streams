'use client';

import { ChangeEvent } from 'react';

export default function LineAlertButton({
	alertId,
	alertMeBefore,
	alertMessage,
	handleSetAlert,
	disabled,
	status,
}: {
	alertId: number;
	alertMeBefore: string;
	alertMessage: string;
	disabled: boolean;
	status: string;
	handleSetAlert: (e: string) => void;
}) {
	function onChange(e: ChangeEvent<HTMLSelectElement>) {
		handleSetAlert(e.target.value);
	}

	const lockInput = disabled || status === 'finished';
	const alreadyFinished = status === 'finished';

	return (
		<>
			<label htmlFor="alert_option" className="text-sm col-span-2">
				{disabled ? 'sending...' : 'Alert me at'}
			</label>
			<div className="relative col-span-3 me-auto self-center w-full overflow-y-visible">
				<select
					disabled={lockInput}
					defaultValue={alertMeBefore}
					id="alert_option"
					className="bg-transparent text-xs rounded-xl w-full border border-primary-white-500 px-10 text-center"
					onChange={onChange}
				>
					{!alreadyFinished && <SetInput />}
					{alreadyFinished && <ForbidInput />}
				</select>
			</div>
		</>
	);
}

function ForbidInput() {
	return (
		<>
			<option value="null" className="bg-primary-gray-500">
				--
			</option>
		</>
	);
}

function SetInput() {
	return (
		<>
			<option className="bg-primary-gray-500" value="null">
				Unset
			</option>
			<option className="bg-primary-gray-500" value="1-day">
				1 day before
			</option>
			<option className="bg-primary-gray-500" value="2-day">
				2 day before
			</option>
			<option className="bg-primary-gray-500" value="3-day">
				3 day before
			</option>
			<option className="bg-primary-gray-500" value="7-day">
				1 week before
			</option>
		</>
	);
}
