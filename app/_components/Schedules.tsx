import { MotoGPTodayStream } from '@/lib/data-service.ts';
import { BellAlertIcon, ClockIcon, FlagIcon, TvIcon } from '@heroicons/react/24/outline';
import SetAlarmButton from './SetAlarmButton.tsx';
import ScheduleCard from './ScheduleCard.tsx';

export default function Schedules({ todayStreams }: { todayStreams: MotoGPTodayStream[] }) {
	const curDate = Date.now();
	// const __minusDate = new Date(curDate - 27 * 60 * 60 * 1000); // dev testing purpose

	return (
		<div className="p-2">
			<div className="w-full p-2 min-h-24 max-h-48 bg-primary-gray-500 rounded-2xl">
				<div className="w-full min-h-24 max-h-44 overflow-y-scroll overflow-hidden flex flex-col gap-1.5 relative rounded-xl">
					{todayStreams.length !== 0 ? (
						todayStreams.map(stream => {
							const year = stream.year;
							const month = stream.month < 10 ? `0${stream.month}` : stream.month.toString();
							const day = stream.day < 10 ? `0${stream.day}` : stream.day.toString(); // ex data: 7 or 07
							const time = stream.time.split('-')[0]; // ex data: '09:40-09:50'
							const scheduleTime = new Date(`${year}-${month}-${day}T${time}:00`);

							return (
								<ScheduleCard
									key={stream.categoryName + scheduleTime}
									category={stream.category}
									categoryName={stream.categoryName}
									serverTime={scheduleTime}
									isFinished={curDate > scheduleTime.getTime()}
									// isFinished={__minusDate.getTime() > scheduleTime.getTime()}
								/>
							);
						})
					) : (
						<p className="text-xs text-center">
							No schedules for today <FlagIcon className="w-4 inline-block" />
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
