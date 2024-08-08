'use client';

import { useState } from 'react';
import { useUser } from '@/app/_providers/UserContext.tsx';
import { registerAlert, unregisterAlert, updateAlert } from '@/lib/action.ts';
import { BellAlertIcon, ChevronDownIcon, ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import DayPicker from '@/app/_components/DayPicker.tsx';
import LineAlertButton from '@/app/_components/LineAlertButton.tsx';
import toast from 'react-hot-toast';
import { getSchedulesInMonth as service_getScheduleInMonth } from '@/lib/action.ts';

export default function SchedulesAccordion({
	classList = '',
	accordionTitle,
	year,
	month,
	order,
}: {
	classList: string;
	accordionTitle: string;
	year: number;
	month: number;
	order: number;
}) {
	// TODO: refactoring into useReducer();
	const [state, setState] = useState(false);
	const [loading, setLoading] = useState(false);
	const [firstTimeOpen, setFirstTimeOpen] = useState(true);
	const [scheduleData, setScheduleData] = useState([]);

	const [currentDaySchedules, setCurrentDaySchedules] = useState<any[] | null>(null);
	const [currentDaySchedulesLoading, setCurrentDaySchedulesLoading] = useState(false);

	const { user } = useUser();

	async function handleGetSchedulesPerDay(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();

		setState(v => !v);

		try {
			// 00 If the user already click this accordion then no need to request to the server again
			if (!firstTimeOpen) return;

			// 01 If the user first time open the accordion then request to the server
			setFirstTimeOpen(false);
			setLoading(true);

			// 02 Get the data from request to server and check if there is no error
			// const response = await fetch(`/api/get-schedule-in-month?year=${year}&month=${month}&order=${order}`) // prettier-ignore
			// const { data } = await response.json();
			const data = await service_getScheduleInMonth(year, month, order);

			// 03 End of loading and assign the data
			setScheduleData(data);
			setLoading(false);
		} catch (error) {
			console.error('FATAL_ERROR_WHILE_REQUEST schedulePerDay', error);
			toast.error((error as Error).message);
		}
	}

	async function handleDayPicker(year: number, offsetMonth: number, day: number) {
		if (currentDaySchedulesLoading) {
			toast.error('Please wait and try again later !');
			return;
		}

		setCurrentDaySchedulesLoading(true);

		try {
			const userId = user?.id ?? null;

			// 01 the data get from child will be offset by 1
			const month = offsetMonth + 1;

			// 02 order from the SchedulesAccordion parameter
			const response = await fetch(`/api/get-schedules-per-day?year=${year}&month=${month}&day=${day}&order=${order}&user-id=${userId}`); // prettier-ignore
			const { data } = await response.json();

			// console.log(year, month, day, order);
			// console.log(data);

			// 03
			setCurrentDaySchedules(data);
		} catch (error) {
			toast.error((error as Error).message);
			console.error('ERROR_WHILE_INVOKE handleDayPicker ', error);
		} finally {
			setCurrentDaySchedulesLoading(false);
		}
	}

	return (
		<div className={`relative mb-3 border border-primary-white-500 rounded-md ${classList}`}>
			<h6 className="mb-0">
				<button
					onClick={handleGetSchedulesPerDay}
					className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in cursor-pointer  rounded-t-1 group text-dark-500 focus:outline-none  duration-150"
					data-collapse-target="collapse-1"
				>
					<InformationCircleIcon className={`${state ? 'stroke-primary-gold-500' : ''} h-6 inline-block`} />
					<span className="text-primary-white-500 pl-2">{accordionTitle}</span>
					<ChevronDownIcon
						// group-open ?
						className={`${
							state && '-rotate-180'
						} absolute right-2.5 pt-1 text-base transition-transform stroke-primary-white-500 h-6 duration-300`}
					></ChevronDownIcon>
				</button>
			</h6>

			<div
				data-collapse="collapse-1"
				className={`${state ? 'h-auto' : 'h-0'} overflow-hidden transition-all duration-300 ease-in-out`}
			>
				{/* calendars UI */}
				{!loading && <DayPicker year={2024} month={month - 1} sportDayAs={scheduleData} onClick={handleDayPicker} />}
				{loading && (
					<p className="text-center text-xs py-2">
						Loading calendars... <ClockIcon height={12} className="pl-1 inline-block" />
					</p>
				)}

				{/* Schedules */}
				{currentDaySchedulesLoading && (
					<p className="text-center text-xs py-2">
						Loading schedules... <ClockIcon height={12} className="pl-1 inline-block" />
					</p>
				)}
				{!currentDaySchedulesLoading && currentDaySchedules && currentDaySchedules?.length > 0 && (
					<div className="p-2 flex flex-col gap-y-1.5">
						{currentDaySchedules!.map((schedule: any) => (
							<Card key={schedule.id} schedule={schedule} />
						))}
					</div>
				)}
				{currentDaySchedules?.length === 0 && (
					<p className="m-auto text-sm w-fit px-4 py-1 bg-dim-red rounded-sm mb-2">No schedule at this day !</p>
				)}
			</div>
		</div>
	);
}

function Card({ schedule }: { schedule: any }) {
	const category: string = schedule.title;
	const categoryName: string = schedule.category_name;
	const year: number = schedule.year;
	const month: number = schedule.month;
	const day: number = schedule.day;
	const time: string = schedule.time;
	const status: string = schedule.status;
	const dayName: string = schedule.day_name;
	const title: string = schedule.title;
	const circuitName: string = schedule.circuit_name;
	const flagSrc: string = schedule.flag_src;
	const alertMeBefore: string = schedule.alert_me_before;
	const alertMessage: string = schedule.alert_message;

	const alertId: number = schedule.alert_id; // alerts_id
	const circuitId: number = schedule.circuits_id;
	const scheduleId: number = schedule.schedules_id;
	const calendarId: number = schedule.calendars_id;
	const eventId: number = schedule.events_id;

	const { user } = useUser();
	const [incomingMessageId, setIncomingMessageId] = useState<number | null>(alertId);
	const [loading, setLoading] = useState(false);

	async function handleSetAlert(alertEnum: string) {
		// Do not proceed if user not defined
		if (!user) return toast('Please login to use this feature !');

		// Do not proceed if user not yet resister
		if (user.lineUUID === null) return toast('Oops! please register your Line account');

		// Do not proceed if this card is sending/loading
		if (loading) return toast.error('Please wait and try again');
		setLoading(true);

		// 01 Collect all the data, because this card already unique we don't need some data
		const ids = { incomingMessageId, circuitId, scheduleId, calendarId, eventId };

		// 02 split the selected interval/enum
		const minusDay = alertEnum.split('-')[0]; // ex data '1-day'

		// 03 if user choose to unset the alarm
		if (minusDay === 'null') {
			// 03.5 IF user unregister the alert then they should be an incoming_message.ID;
			const status = await unregisterAlert(incomingMessageId!);
			if (!status) return toast.error('Something gone wrong while deleting alert !');

			setLoading(false);
			setIncomingMessageId(null);
			toast.success('Unset alert success !');
			return;
		}

		const eventDate = new Date(year, month - 1, day + 1);

		// 04 If the user update the alert
		// this code belows mean updating
		if (incomingMessageId !== null) {
			const status = await updateAlert(incomingMessageId!, alertEnum);
			if (!status) {
				toast.error('Something went wrong please try again !');
				setLoading(false);
				return;
			}

			setLoading(false);
			toast.success('Success updating alert!');
			return;
		}

		// 05 If the user add new alert
		// const dateTime = new Date(year, month - 1, day);
		const alertDate = new Date(year, month - 1, day - Number(minusDay) + 1);
		const [result, insertedId] = await registerAlert(ids, alertDate, eventDate, alertEnum, schedule.title);

		if (result === 'ERROR') {
			setLoading(false);
			toast.error('Failed to add new alert !');
			return;
		}

		if (result === 'ERROR_WHILE_REGISTER_MESSAGE') {
			setLoading(false);
			toast.error('Failed while adding alert');
			return;
		}

		if (result === 'LINE_REQUIRED') {
			setLoading(false);
			toast.error('Oops! please register your Line account');
			return;
		}

		setLoading(false);
		setIncomingMessageId(insertedId as number);
		toast.success(`Success add new alert !`);
	}

	return (
		<div className="w-full h-[96px] px-6 py-3 bg-primary-gray-800 rounded-xl grid grid-cols-5 grid-rows-3 gap-y-2">
			{/* 01 */}
			<p className="text-sm col-span-4 truncate" title={title} onClick={() => alert(title)}>
				{title}
			</p>
			<div className="flex gap-4 justify-end">
				<BellAlertIcon
					width={20}
					height={20}
					className={`self-center justify-self-end hover:cursor-pointer ${
						incomingMessageId && 'text-primary-gold-500'
					}`}
				/>
			</div>

			{/* 02 */}
			<p
				className="text-sm col-span-3 truncate"
				title={`${category} ${categoryName}`}
				onClick={() => alert(`${category} ${categoryName}`)}
			>
				{category} {categoryName}
			</p>
			<p className="text-sm col-span-2 text-right">{time}</p>

			{/* 03 */}
			{/* <div className="text-sm col-span-1">
				<Image className="ms-auto" src={flagSrc} alt={title} width={24} height={18} />
			</div> */}
			<LineAlertButton
				alertId={alertId}
				alertMeBefore={alertMeBefore}
				alertMessage={alertMessage}
				handleSetAlert={handleSetAlert}
				disabled={loading}
			/>
		</div>
	);
}

/*
<div className="relative mb-3">
<h6 className="mb-0">
<button
className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
data-collapse-target="collapse-3"
>
<span>What can I do with Material Tailwind?</span>
<i className="absolute right-0 pt-1 text-xs fa fa-plus group-open:opacity-0"></i>
<i className="absolute right-0 pt-1 text-xs opacity-0 fa fa-minus group-open:opacity-100"></i>
</button>
</h6>
<div data-collapse="collapse-3" className="h-0 overflow-hidden transition-all duration-300 ease-in-out">
<div className="p-4 text-sm leading-normal text-blue-gray-500/80">
We&apos;re not always in the position that we want to be at. We&apos;re constantly growing. We&apos;re
constantly making mistakes. We&apos;re constantly trying to express ourselves and actualize our dreams.
</div>
</div>
</div>
*/

// scheduleData.map((schedule: any) => {
// 	return (
// 		<div key={schedule.day} className={`ms-auto mr-2.5 w-[94%] border-none`}>
// 			<h6 className="mb-0">
// 				<button
// 					className="relative flex text-primary-white-500 items-center w-full p-4 font-semibold text-left transition-all ease-in cursor-pointer  rounded-t-1 group text-dark-500 focus:outline-none  "
// 					data-collapse-target="collapse-1"
// 				>
// 					{<CalendarDaysIcon className="h-6 inline-block" />} &nbsp;{' '}
// 					<span className="pt-0.5">{schedule.day}</span>
// 					<ChevronDownIcon
// 						// group-open ?
// 						className={`absolute right-2.5 pt-1 text-base transition-transform h-6 duration-300 ${
// 							state ? '-rotate-180' : ''
// 						}`}
// 					></ChevronDownIcon>
// 				</button>
// 			</h6>
// 		</div>
