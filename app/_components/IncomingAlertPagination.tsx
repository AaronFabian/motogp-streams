'use client';

import { IncomingAlert } from '@/lib/data-service.ts';
import { BellAlertIcon, ChevronLeftIcon, ChevronRightIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useState } from 'react';
import { Calendar } from './AccountIncomingAlertList.tsx';
import toast from 'react-hot-toast';

export default function IncomingAlertPagination({ incomingAlertList }: { incomingAlertList: IncomingAlert[] }) {
	const totalAlerts = incomingAlertList.length;
	const totalPage = Math.ceil(totalAlerts / 3);
	const [page, setPage] = useState(1);

	function handleNextPage() {
		if (page + 1 > totalPage) return;

		setPage(page + 1);
	}

	function handlePrevPage() {
		if (page - 1 < 1) return;

		setPage(page - 1);
	}

	return (
		<>
			<div className="flex flex-col gap-2 max-h-[410px] overflow-auto">
				{incomingAlertList.slice((page - 1) * 3, page * 3).map((alert, i) => (
					<Card
						alertMeAt={'1-day'}
						key={alert.id}
						title={alert.title}
						circuitName={alert.circuitName}
						calendar={alert.calendar}
						category={alert.category}
						categoryName={alert.categoryName}
						time={alert.time}
					/>
				))}
			</div>
			<div className="h-12 flex justify-between items-center px-2">
				<ChevronLeftIcon
					width={22}
					height={22}
					onClick={handlePrevPage}
					className={page === 1 ? 'stroke-primary-gray-800' : 'stroke-primary-white-500'}
				/>
				<p>
					<span className="text-primary-gold-500 underline">{page}</span> - {totalPage}
				</p>
				<ChevronRightIcon
					width={22}
					height={22}
					className={page === totalPage ? 'stroke-primary-gray-800' : 'stroke-primary-white-500'}
					onClick={handleNextPage}
				/>
			</div>
		</>
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

	function handleOnChange(e: ChangeEvent<HTMLSelectElement>) {
		toast('Sorry this feature work in development... 🥲');
	}

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
					onChange={handleOnChange}
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
