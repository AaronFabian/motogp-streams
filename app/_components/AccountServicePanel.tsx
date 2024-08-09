import { User } from 'next-auth';
import LineIcon from './LineIcon.tsx';
import LineServiceRegisterPanel from './LineServiceRegisterPanel.tsx';

export default function AccountServicePanel({ user }: { user: User }) {
	if ((user as any).lineUUID) return null;

	return (
		<div className="p-2 w-full min-h-24 bg-primary-gray-500 rounded-2xl mt-4">
			<h2 className="text-center text-2xl">Service</h2>

			<LineServiceRegisterPanel user={user} />
		</div>
	);
}
