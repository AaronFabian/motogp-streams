import { Metadata } from 'next';
import SchedulesAccordion from '../_components/SchedulesAccordion.tsx';
import { getAllMotoGPMonth } from '@/lib/data-service.ts';

export const metadata: Metadata = {
	title: 'Schedules Page',
};

export const revalidate = 60 * 60 * 24 * 7;

export default async function page() {
	const motoGPCalendars = (await getAllMotoGPMonth()) as any;

	if (!motoGPCalendars) return <p>Something gone wrong or no data at the current</p>;

	return motoGPCalendars.map((calendar: any, i: number) => (
		<SchedulesAccordion
			key={i}
			classList=""
			accordionTitle={`${2024} - ${calendar.month}`}
			year={2024}
			month={Number(calendar.month)}
			order={Number(calendar.order)}
			// /* <SchedulesAccordion classList="ms-auto mr-3 w-[94%] border-none" accordionTitle=""> */
		/>
	));
}
