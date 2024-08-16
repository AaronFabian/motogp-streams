'use client';

import { MotoGPTodayStream } from '@/lib/data-service';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function PanelInformation({ todayStreams }: { todayStreams: MotoGPTodayStream[] }) {
	if (todayStreams.length === 0) return null;

	const curDate = Date.now();

	const liveSchedule: MotoGPTodayStream | undefined = todayStreams
		.filter(stream => {
			const year = stream.year;
			const month = stream.month < 10 ? `0${stream.month}` : stream.month.toString();
			const day = stream.day < 10 ? `0${stream.day}` : stream.day.toString();
			const time = stream.time.split('-')[0]; // ex data: '09:40-09:50'
			const scheduleTime = new Date(`${year}-${month}-${day}T${time}:00`);

			return curDate > scheduleTime.getTime();
		})
		.at(-1);

	if (liveSchedule === undefined)
		return (
			<div className="p-2">
				<p className="p-4 text-xs font-medium">No Live Schedule</p>
			</div>
		);

	const formattedTime = new Intl.DateTimeFormat(navigator.language, {
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		hourCycle: 'h24',
		hour: '2-digit',
		minute: '2-digit',
	}).format(
		new Date(`${liveSchedule.year}-${liveSchedule.month}-${liveSchedule.day}T${liveSchedule.time.split('-')[0]}:00`)
	);

	return (
		<div className="p-2">
			<h2 className="text-xs font-medium pb-4">{liveSchedule.title}</h2>
			<div className="grid grid-cols-[3.5rem_1fr_1fr] grid-rows-[1rem_1rem_1.5rem] gap-1.5">
				<CountryFlag src={liveSchedule.flagSrc} alt={liveSchedule.circuitName} />
				<div className="col-span-2 text-xs font-medium">
					<span>
						{liveSchedule.category} &nbsp; {liveSchedule.categoryName}
					</span>
				</div>
				<div className="col-span-2 text-xs font-medium">
					<p>{liveSchedule.circuitName}</p>
				</div>
				<div></div>
				<div className="flex items-center gap-2">
					<CalendarDaysIcon className="w-5" />
					<p className="text-xs font-medium">
						{liveSchedule.dayName.slice(0, 3)}, {liveSchedule.year} - {liveSchedule.month} - {liveSchedule.day}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<ClockIcon className="w-5" />
					<p className="text-xs font-medium">{formattedTime}</p>
				</div>
			</div>
		</div>
	);
}

function CountryFlag({ src, alt }: { src: string; alt: string }) {
	return <Image className="row-span-2" width={54} height={39} src={src} alt={alt} />;
}
