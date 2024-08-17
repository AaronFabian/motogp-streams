'use client';

import { ClockIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import SetAlarmButton from './SetAlarmButton.tsx';
import { MotoGPTodayStream } from '@/lib/data-service.ts';
import { convertTimeToLocale } from '../_lib/utils.ts';

export default function ScheduleCard({ stream }: { stream: MotoGPTodayStream }) {
	const [localTime, setLocalTime] = useState('');

	const month = stream.month < 10 ? `0${stream.month}` : stream.month.toString();
	const day = stream.day < 10 ? `0${stream.day}` : stream.day.toString();
	const [hour, minute] = stream.time.split('-')[0].split(':');

	// Construct the Japan date and time string
	const japanTime = `${stream.year}-${month}-${day}T${hour}:${minute}:00+09:00`; // +09:00 for JST

	useEffect(() => {
		// Convert to user's local time, the time from database is from JST
		const scheduleTime = new Date(japanTime);
		const formattedTime = convertTimeToLocale(scheduleTime);

		setLocalTime(formattedTime);
	}, [japanTime]);

	const isFinished = new Date() > new Date(japanTime);

	return (
		<div
			className={`w-full h-[50px] bg-primary-black-500 rounded-lg relative px-5 py-2 ${isFinished && 'text-dim-white'}`}
		>
			<p className="text-xs pb-0.5">
				{stream.category} &nbsp;{stream.categoryName}
			</p>
			<p className="text-xs">
				<span>
					<ClockIcon className="w-4 inline-block mr-4" />
				</span>

				{localTime}
			</p>

			{/* icon */}
			<SetAlarmButton time={localTime} />
		</div>
	);
}
