import AccountProfilePanel from '@/app/_components/AccountProfilePanel.tsx';
import AccountIncomingAlertList from '../_components/AccountIncomingAlertList.tsx';
import { Metadata } from 'next';
import { auth } from '@/lib/auth.js';
import { redirect } from 'next/navigation';
import AccountServicePanel from '../_components/AccountServicePanel.tsx';

export const metadata: Metadata = {
	title: 'Account Page',
};

export default async function page() {
	const user = await auth();
	if (!user) {
		redirect('/login');
	}

	return (
		<>
			<AccountProfilePanel user={user.user!} />
			<AccountServicePanel user={user.user!} />
			<AccountIncomingAlertList />
		</>
	);
}
