'use client';

import { MotoGPTodayStream } from '@/lib/data-service';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { toZonedTime } from 'date-fns-tz';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { convertTimeToLocale } from '../_lib/utils.ts';

function padZero(num: number) {
	return num.toString().padStart(2, '0');
}

export default function PanelInformation({ todayStreams }: { todayStreams: MotoGPTodayStream[] }) {
	const [clientLang, setClientLang] = useState<string | null>(null);
	const [clientTimeZone, setClientTimeZone] = useState<string | null>(null);

	useEffect(() => {
		setClientLang(navigator.language || 'ja-JP');
		setClientTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Tokyo');
	}, []);

	if (todayStreams.length === 0) return null;

	const curDate = new Date();

	const liveSchedule: MotoGPTodayStream | undefined = todayStreams.reduce(
		(acc: MotoGPTodayStream | undefined, stream: MotoGPTodayStream) => {
			const year = stream.year;
			const month = stream.month < 10 ? `0${stream.month}` : stream.month.toString();
			const day = stream.day < 10 ? `0${stream.day}` : stream.day.toString();
			const [hour, minute] = stream.time.split('-')[0].split(':'); // ex data: '09:40-09:50'

			const japanTime = `${stream.year}-${month}-${day}T${hour}:${minute}:00+09:00`; // +09:00 for JST
			const scheduleTime = new Date(japanTime);
			// const formattedTime = convertTimeToLocale(scheduleTime);

			if (curDate > scheduleTime) return stream; // Update the accumulator with the current stream

			return acc; // Otherwise, return the previous accumulated value
		},
		undefined
	);

	if (liveSchedule === undefined)
		return (
			<div className="p-2">
				<p className="p-4 text-xs font-medium">No live airing schedule</p>
			</div>
		);

	const year = liveSchedule.year;
	const month = liveSchedule.month < 10 ? `0${liveSchedule.month}` : liveSchedule.month.toString();
	const day = liveSchedule.day < 10 ? `0${liveSchedule.day}` : liveSchedule.day.toString();
	const time = liveSchedule.time.split('-')[0]; // ex data: '09:40-09:50'

	// const formattedDate = toZonedTime(`${year}-${month}-${day}T${time}:00`, clientTimeZone!);
	// const formattedTime = format(formattedDate, 'ccc, yyyy-MMM-dd H:m');
	// const formattedTime = new Intl.DateTimeFormat('en-US', {
	// 	timeZone: clientTimeZone!,
	// 	hourCycle: 'h24',
	// 	hour: '2-digit',
	// 	minute: '2-digit',
	// }).format(formattedDate);

	// console.log(liveSchedule);
	// console.log(`${year}-${month}-${day}T${time}:00`, clientTimeZone);

	return (
		<div className="p-2">
			<h2 className="text-xs font-medium pb-4">{liveSchedule.title}</h2>
			<div className="grid grid-cols-[3.5rem_2fr_1fr] grid-rows-[1rem_1rem_1.5rem] gap-1.5">
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
						{/* TODO: fix to dynamic schedule base on user */}
						{year}-{month}-{day} {time} JST
						{/* {liveSchedule.dayName.slice(0, 3)}, {liveSchedule.year} - {liveSchedule.month} - {liveSchedule.day} */}
					</p>
				</div>
				{/* <div className="flex items-center gap-2">
					<ClockIcon className="w-5" />
					<p className="text-xs font-medium">{formattedTime}</p>
				</div> */}
			</div>
		</div>
	);
}

function CountryFlag({ src, alt }: { src: string; alt: string }) {
	return <Image className="row-span-2" width={54} height={39} src={src} alt={alt} />;
}
