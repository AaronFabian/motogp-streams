import { EventResult } from '@/lib/data-service.ts';
import Image from 'next/image';

export default function RaiderResults({ data }: { data: EventResult[] }) {
	const categorizedResults = data.reduce((prev, curr) => {
		if (!prev.has(curr.section)) {
			prev.set(curr.section, [curr]);
			return prev;
		}

		prev.set(curr.section, [...prev.get(curr.section)!, curr]);
		return prev;
	}, new Map<string, EventResult[]>());

	const tbodyData = [];
	for (const key of categorizedResults.keys()) {
		tbodyData.push(<RowSeparator key={key} section={key} />);

		categorizedResults.get(key)?.forEach(res => tbodyData.push(<RiderCard key={res.id} eventResult={res} />));
	}

	const finishedRiders = categorizedResults.get('finished')?.length;

	return (
		<table className="w-full relative pb-8">
			<caption className="text-xs">
				Total Rider finished : {finishedRiders} from {data.length}
			</caption>
			<thead>
				<tr className="text-xs text-left">
					{/* 01 gap padding left */}
					<th className="w-2"></th>

					{/* 02 */}
					<th>
						<span className="text-primary-white-500 inline">Pos</span>&nbsp;
						<span className="text-primary-white-800">Pts</span>
					</th>

					{/* 03 image */}
					<th></th>

					{/* 04 */}
					<th>
						<span className="text-primary-white-500">Rider</span> <span className="text-primary-white-800">Team</span>
					</th>

					{/* 05 country flag */}
					<th></th>

					{/* 06 */}
					<th>Time</th>

					{/* 07 gap padding right */}
					<th className="w-2"></th>
				</tr>
			</thead>
			<tbody>{tbodyData}</tbody>
		</table>
	);
}

function RowSeparator({ section }: { section: string }) {
	return (
		<tr>
			<td colSpan={7} className="pl-2 text-xs bg-primary-black-500">
				{section[0].toUpperCase() + section.slice(1)}
			</td>
		</tr>
	);
}

function RiderCard({ eventResult }: { eventResult: EventResult }) {
	return (
		<tr className="bg-primary-gray-800 text-xs relative z-10 rider odd:bg-primary-gray-500">
			{/* 01 */}
			<td></td>

			{/* 02 */}
			<td className="text-center">
				<span className="block text-primary-white-500 text-base pos rounded-full">
					{eventResult.pos !== 999 ? eventResult.pos : '-'}
				</span>
				<span className="text-primary-white-800 text-base">
					{eventResult.points ? '+' : ''}
					{eventResult.points}
				</span>
			</td>

			{/* 03 */}
			<td className="w-14">
				<div className="h-[4rem] overflow-hidden">
					<Image
						src={eventResult.raider_image}
						alt={eventResult.raider_name}
						height={400}
						width={300}
						className="scale-[3] translate-y-20 translate-x-1"
					/>
				</div>
			</td>

			{/* 04 */}
			<td>
				<span className="block text-primary-white-500 text-xs">
					{eventResult.raider_name} {eventResult.raider_number}
				</span>
				<span className="text-primary-white-800 text-xs">{eventResult.team}</span>
			</td>

			{/* 05 */}
			<td>
				<Image
					src={eventResult.raider_country_flag_image}
					alt={eventResult.raider_name + " country's flag"}
					width={64}
					height={64}
					className="absolute left-0 top-0 h-full w-auto -z-10 opacity-25"
					quality={10}
				/>
			</td>

			{/* 06 */}
			<td>{eventResult.time}</td>

			{/* 07 */}
			<td></td>
		</tr>
	);
}
