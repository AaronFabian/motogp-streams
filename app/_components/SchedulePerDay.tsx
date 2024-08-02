'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SchedulePerDay({ year, month, order }: { year: number; month: number; order: number }) {
	const [state, setState] = useState(false);
	const [loading, setLoading] = useState(false);
	const [firstTimeOpen, setFirstTimeOpen] = useState(true);

	// async function handleGetSchedulesPerDay(e: React.MouseEvent<HTMLButtonElement>) {
	// 	e.preventDefault();

	// 	try {
	// 		// 00 if the user already click this accordion then no need to request to the server again
	// 		if (!firstTimeOpen) return;

	// 		// 01 if the user first time open the accordion then request to the server
	// 		setFirstTimeOpen(false);

	// 		// 02 get the data from request to server and check if there is no error
	// 		const response = await fetch(`localhost:3000/api/get-schedule-per-day?year=${year}&month=${month}&order=${order}`) // prettier-ignore
	// 		// const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-schedule-per-day?year=${year}&month=${month}&order=${order}`) // prettier-ignore
	// 		if (!response.ok) throw new Error((await response.json()).message);

	// 		const { data } = await response.json();
	// 		console.log(data);
	// 	} catch (error) {
	// 		console.error('FATAL_ERROR_WHILE_REQUEST schedulePerDay', error);
	// 		toast.error((error as Error).message);
	// 	}
	// }

	return (
		<div className="ms-auto mr-3 w-[94%] border-none">
			<button
				className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
				data-collapse-target="collapse-3"
				// onClick={handleGetSchedulesPerDay}
			>
				<span className="text-primary-white-500">What can I do with Material Tailwind?</span>
				<i className="absolute right-0 pt-1 text-xs fa fa-plus group-open:opacity-0"></i>
				<i className="absolute right-0 pt-1 text-xs opacity-0 fa fa-minus group-open:opacity-100"></i>
			</button>
			<div data-collapse="collapse-3" className="h-0 overflow-hidden transition-all duration-300 ease-in-out">
				<div className="p-4 text-sm leading-normal text-blue-gray-500/80">
					We&apos;re not always in the position that we want to be at. We&apos;re constantly growing. We&apos;re
					constantly making mistakes. We&apos;re constantly trying to express ourselves and actualize our dreams.
				</div>
			</div>
		</div>
	);
}
