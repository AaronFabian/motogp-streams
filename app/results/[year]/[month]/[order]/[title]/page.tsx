import DropDownCategorySection from '@/app/_components/DropDownCategorySection.tsx';
import { getRaceResult } from '@/lib/data-service.ts';

export interface ResultsPageParams {
	year: string;
	month: string;
	order: string;
	title: string;
}

export default async function page({ params }: { params: ResultsPageParams }) {
	const results = await getRaceResult(params);
	const categoryAndSession = results.reduce((prev, cur) => {
		if (!prev[cur.category]) {
			return { ...prev, [cur.category]: [cur.session] };
		}

		if (!prev[cur.category].includes(cur.session)) {
			return { ...prev, [cur.category]: [...prev[cur.category], cur.session] };
		}

		return prev;
	}, {});

	return (
		<>
			<DropDownCategorySection categoryAndSection={categoryAndSession} title={decodeURIComponent(params.title)} />
		</>
	);
}
