import { MotoGPTodayStream } from '@/lib/data-service.ts';
import { FlagIcon } from '@heroicons/react/24/outline';
import ScheduleCard from './ScheduleCard.tsx';

export default function Schedules({ todayStreams }: { todayStreams: MotoGPTodayStream[] }) {
	const curDate = Date.now();
	// const __minusDate = new Date(curDate - 27 * 60 * 60 * 1000); // dev testing purpose

	return (
		<div className="p-2">
			<div className="w-full p-2 min-h-24 max-h-48 bg-primary-gray-500 rounded-2xl">
				<div className="w-full min-h-24 max-h-44 overflow-y-scroll overflow-hidden flex flex-col gap-1.5 relative rounded-xl">
					{todayStreams.length !== 0 && todayStreams.map((stream, i) => <ScheduleCard key={i} stream={stream} />)}
					{todayStreams.length === 0 && (
						<p className="text-xs text-center">
							No schedules for today <FlagIcon className="w-4 inline-block" />
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
