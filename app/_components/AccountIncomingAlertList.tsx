import { auth } from '@/lib/auth.js';
import { getIncomingAlerts } from '@/lib/data-service.ts';
import {
	ArrowRightEndOnRectangleIcon,
	BellAlertIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';

export interface Calendar {
	year: number;
	month: number;
	day: number;
}

export default async function AccountIncomingAlertList() {
	const session = await auth();
	const incomingAlertList = await getIncomingAlerts(Number(session!.user!.id));
	// timeDifferent(new Date('2024-07-19T07:15:00'), new Date('2024-07-16 10:00:00'));

	return (
		<div className="p-2 w-full bg-primary-gray-500 rounded-2xl mt-4">
			{incomingAlertList.length !== 0 ? (
				<div className="flex flex-col gap-2 max-h-[460px]">
					{incomingAlertList.map((alert, i) => (
						<Card
							alertMeAt={'1-day'}
							key={i}
							title={alert.title}
							circuitName={alert.circuitName}
							calendar={alert.calendar}
							category={alert.category}
							categoryName={alert.categoryName}
							time={alert.time}
						/>
					))}

					<div className="h-12 flex justify-between items-center px-2">
						<ChevronLeftIcon width={22} height={22} className="stroke-primary-white-500" />
						<ChevronRightIcon width={22} height={22} className="stroke-primary-white-500" />
					</div>
				</div>
			) : (
				<>
					<p className="text-center">No alerts for now</p>
					<Link
						href="/schedules"
						className="w-max group px-4 mt-2 mx-auto text-sm text-center block rounded-full bg-primary-gray-800 pb-0.5 transition-all hover:px-5 hover:py-1 hover:text-primary-gold-500 hover:bg-dim-white"
					>
						Go to schedules page &nbsp;
						<span className="inline-block translate-y-1">
							<ArrowRightEndOnRectangleIcon className="w-4 group-hover:stroke-primary-gold-500" />
						</span>
					</Link>
				</>
			)}
		</div>
	);
}

function Card({
	category,
	categoryName,
	calendar,
	time,
	circuitName,
	title,
	alertMeAt,
}: {
	category: string;
	categoryName: string;
	calendar: Calendar;
	time: string;
	circuitName: string;
	title: string;
	alertMeAt: string;
}) {
	// const prevMonthDateEnd = new Date(year, month - 1 + 1, 0).toLocaleDateString('en-US', { day: 'numeric' });
	const date = new Date(calendar.year, calendar.month - 1, calendar.day);

	return (
		<div className="w-full h-[130px] px-6 py-3 bg-primary-black-500 rounded-xl grid grid-cols-5 grid-rows-3 gap-y-2">
			<p className="text-sm col-span-4 truncate">{title}</p>
			<div className="flex gap-4 justify-end">
				<BellAlertIcon width={20} height={20} className="self-center justify-self-end hover:cursor-pointer" />
				<XCircleIcon width={20} height={20} className="self-center justify-self-end stroke-alert" />
			</div>
			<p className="text-sm col-span-3 truncate">
				{category} {categoryName}
			</p>
			<p className="text-sm col-span-3">
				{date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' })}
			</p>
			<p className="text-sm col-span-2 justify-self-end">{time}</p>
			<label htmlFor="alert_option" className="text-sm col-span-2">
				Alert me at
			</label>
			<div className="relative col-span-3 self-center w-full overflow-y-visible">
				<select
					defaultValue={alertMeAt}
					id="alert_option"
					className="bg-transparent text-xs rounded-xl border border-primary-white-500 px-10 text-center"
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
		</div>
	);
}

{
	/* <option className="bg-primary-gray-500" value="5-min">
						5 min before
					</option>
					<option className="bg-primary-gray-500" value="10-min">
						10 min before
					</option>
					<option className="bg-primary-gray-500" value="30-min">
						30 min before
					</option>
					<option className="bg-primary-gray-500" value="1-hour">
						1 hour before
					</option>
					<option className="bg-primary-gray-500" value="6-hour">
						6 hours before
					</option>
					<option className="bg-primary-gray-500" value="12-hour">
						12 hours before
					</option> */
}
