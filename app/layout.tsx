import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from './_components/Navbar.tsx';
import SideNav from './_components/SideNav.tsx';

import '@/app/_styles/globals.css';
import { UserProvider } from './_providers/UserContext.tsx';
import { Toaster } from 'react-hot-toast';
import { auth } from '@/lib/auth.js';
import Footer from './_components/Footer.tsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: '%s | MotoGP Streams',
		default: 'Welcome | MotoGP Streams',
	},
	description:
		'Never miss a moment of your favorite MotoGP races! With MotoGP Streams, you can watch live streams of all MotoGP events for free. Experience the thrill of the race from the comfort of your home.',
	icons: { icon: 'avatar-dummy.png' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();

	return (
		<html lang="en" className="dark transition-all duration-150">
			<body className={`${inter.className} dark:bg-primary-black-500 dark:text-primary-white-500`}>
				<Navbar user={session?.user ?? null} />
				<SideNav />
				<UserProvider userData={session?.user ?? null}>{children}</UserProvider>
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
