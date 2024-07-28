import { Metadata } from 'next';
import { auth } from '@/lib/auth.js';

export const metadata: Metadata = {
	title: 'Schedules Page',
};

export default async function page() {
	const session = await auth();
	// jwt.verify(cookies().get('token')!.value, process.env.SECRET_KEY as string);

	return <h1 className="text-blue-500 dark:text-green-500">Settings page for {session?.user?.name}</h1>;
}
