import DataCountComponent from './_components/DataCountComponent.tsx';
import DayPicker from './_components/DayPicker.tsx';

export default function Page() {
	// test
	const test = new Date();
	const MONTH_OFF_SET = 1;
	const month = test.getMonth(); // - MONTH_OFF_SET;

	// console.log(current.toLocaleDateString('us-US', { weekday: 'long' }));

	return (
		<div className="p-2">
			<DataCountComponent />

			<DayPicker
				year={test.getFullYear()}
				month={month}
				sportDayAs={[Number(test.toLocaleDateString('en-US', { day: 'numeric' }))]}
			/>
		</div>
	);
}
