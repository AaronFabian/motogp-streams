import { Metadata } from 'next';

import { getTodayStreams, MotoGPTodayStream } from '@/lib/data-service.ts';
import MainScreen from '@/app/_components/MainScreen.tsx';
import PanelInformation from '@/app/_components/PanelInformation.tsx';
import Schedules from '@/app/_components/Schedules.tsx';
import CommentsStreamPanel from '@/app/_components/CommentsStreamPanel.tsx';

export const metadata: Metadata = {
	title: 'Streaming Page',
};

export default async function Page() {
	const todayStreams: MotoGPTodayStream[] = await getTodayStreams();

	return (
		<>
			<MainScreen />
			<PanelInformation todayStreams={todayStreams} />
			<Schedules todayStreams={todayStreams} />
			<CommentsStreamPanel />
		</>
	);
}
