'use client';

import { handleFindResult } from '@/lib/action.ts';
import { EventResult } from '@/lib/data-service.ts';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import RaiderResults from './RaiderResults.tsx';

export default function DropDownCategorySection({
	categoryAndSection,
	title,
}: {
	categoryAndSection: any;
	title: string;
}) {
	const router = useRouter();
	const params = useSearchParams();
	const pcategory = params.get('category');
	const psession = params.get('session');
	const [selectedCategory, setCategory] = useState<string | null>(() => pcategory);
	const [selectedSession, setSession] = useState<string | null>(() => psession);
	const [resultData, setResultData] = useState<EventResult[]>([]);
	const categoryList = Object.keys(categoryAndSection);

	// Separate effect for initializing state
	useEffect(() => {
		// Do not executed any of this if no data
		if (categoryList.length === 0) return;

		// 01 If nothing selected for category then select just the first array -> 0
		if (!selectedCategory) {
			setCategory(categoryList[0]);
		}

		// 02 If nothing selected for session then select just get the first from categoryAndSection[]
		if (!selectedSession) {
			setSession(categoryAndSection[categoryList[0]][0]);
		}
	}, []);

	// Effect for handling URL updates and fetching data
	useEffect(() => {
		if (!selectedCategory || !selectedSession) return; // Exit if still initializing state

		async function _findResult() {
			// Update the URL with query parameters without page reload
			router.push(`?category=${selectedCategory}&session=${selectedSession}`);

			// Fetch the data based on the selected category and session
			const result = await handleFindResult(title, selectedCategory!, selectedSession!);
			setResultData(result);
		}

		_findResult();
	}, [selectedCategory, selectedSession, title, router]);

	if (categoryList.length === 0) return <p>No data at the moment</p>;

	return (
		<>
			<h1 className="text-xl px-2 pt-2 font-semibold">{title}</h1>

			<form className="p-2 w-full grid grid-cols-2 grid-rows-[1rem_2.6rem] grid-flow-col gap-2">
				{/* 01 */}
				<label htmlFor="countries" className="block mb-2 text-sm font-medium text-white">
					Category
				</label>
				<select
					id="countries"
					value={selectedCategory ?? ''}
					onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
					className="border text-sm rounded-lg focus:ring-primary-gold-500 focus:border-primary-gold-500 block w-full p-2.5 bg-primary-gray-800 border-gray-600 placeholder-gray-400 text-white"
				>
					{/* Loop over the keys from props.categoryAndSection */}
					{categoryList.map(session => {
						return (
							<option key={session} value={session}>
								{session}
							</option>
						);
					})}
				</select>

				{/* 02 */}
				<label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Session
				</label>
				<select
					id="countries"
					value={selectedSession ?? ''}
					onChange={(e: ChangeEvent<HTMLSelectElement>) => setSession(e.target.value)}
					className="border text-sm rounded-lg focus:ring-primary-gold-500 focus:border-primary-gold-500 block w-full p-2.5 bg-primary-gray-800 border-gray-600 placeholder-gray-400 text-white"
				>
					{/* Only give the option if the selected category selected */}
					{selectedCategory !== null &&
						categoryAndSection[selectedCategory] !== undefined &&
						categoryAndSection[selectedCategory].map((session: any) => (
							<option key={session} value={session}>
								{session}
							</option>
						))}
				</select>
			</form>

			{resultData.length !== 0 && <RaiderResults data={resultData} />}
		</>
	);
}
