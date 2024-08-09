import { auth } from '@/lib/auth.js';
import { getIncomingAlerts } from '@/lib/data-service.ts';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
import IncomingAlertPagination from './IncomingAlertPagination.tsx';

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
				<>
					<IncomingAlertPagination incomingAlertList={incomingAlertList} />
				</>
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
