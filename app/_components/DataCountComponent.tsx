import { getDataCount } from '@/lib/data-service.ts';
import { CalendarDaysIcon, ArrowUpCircleIcon, TableCellsIcon } from '@heroicons/react/24/outline';

export default async function DataCountComponent() {
	const counts = await getDataCount();

	if (counts === null)
		return (
			<div className="p-2">
				<h1>Something gone wrong please restart the page</h1>
			</div>
		);

	return (
		<div className="flex justify-between mb-2">
			<p className="bg-dim-red text-sm px-2 pb-0.5">
				{<CalendarDaysIcon className="inline" width={17} />} Calendars : {counts.calendars}
			</p>
			<p className="bg-dim-gold text-sm px-2 pb-0.5">
				{<ArrowUpCircleIcon className="inline" width={17} />} Circuits : {counts.circuits}
			</p>
			<p className="bg-dim-white text-sm px-2 pb-0.5">
				{<TableCellsIcon className="inline" width={17} />} Schedules : {counts.schedules}
			</p>
		</div>
	);
}
