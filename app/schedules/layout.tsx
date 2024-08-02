import { getDataCount } from '@/lib/data-service.ts';
import DataCountComponent from '../_components/DataCountComponent.tsx';

export default async function layout({ children }: { children: React.ReactNode }) {
	const counts = await getDataCount();

	if (counts === null)
		return (
			<div className="p-2">
				<h1>Something gone wrong please restart the page</h1>
			</div>
		);

	return (
		<div className="p-2">
			<h1 className="py-2">Calendars</h1>
			<DataCountComponent />
			{children}
		</div>
	);
}
