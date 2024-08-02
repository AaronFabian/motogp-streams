import DataCountComponent from './_components/DataCountComponent.tsx';
import DayPicker from './_components/DayPicker.tsx';

export default function Page() {
	// test
	const MONTH_OFF_SET = 1;
	const month = 10 - MONTH_OFF_SET;

	// console.log(current.toLocaleDateString('us-US', { weekday: 'long' }));

	return (
		<div className="p-2">
			<DataCountComponent />

			<DayPicker
				year={2024}
				month={month}
				sportDayAs={[Number(new Date().toLocaleDateString('en-US', { day: 'numeric' }))]}
			/>
		</div>
	);
}
