'use client';

import { convertTimeToLocale } from '@/app/_lib/utils.ts';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import SetAlarmButton from './SetAlarmButton.tsx';

export default function ScheduleCard({
	category,
	categoryName,
	isFinished,
	serverTime,
}: {
	category: string;
	categoryName: string;
	isFinished: boolean;
	serverTime: Date;
}) {
	const [localTime, setLocalTime] = useState('');

	// useEffect(() => {
	// convert dynamically from user PC
	// const formattedTime = convertTimeToLocale(serverTime);
	// setLocalTime(formattedTime.split(' ')[0]); // example data 7:40:00 AM Western Indonesia Time
	// }, [serverTime]);

	console.log(serverTime);
	return (
		<div
			className={`w-full h-[50px] bg-primary-black-500 rounded-lg relative px-5 py-2 last:${
				isFinished && 'text-dim-white'
			}`}
		>
			<p className="text-xs pb-0.5">
				{category} &nbsp;{categoryName}
			</p>
			<p className="text-xs">
				<span>
					<ClockIcon className="w-4 inline-block mr-4" />
				</span>
				{serverTime.getHours()}:{serverTime.getMinutes()}
			</p>

			{/* icon */}
			<SetAlarmButton time={localTime} />
		</div>
	);
}
