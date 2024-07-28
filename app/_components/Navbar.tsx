'use client';

import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import { ArrowLeftEndOnRectangleIcon, BellIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { User } from 'next-auth';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import TopNavIconFrame from './TopNavIconFrame.tsx';

const navLinks = [
	{
		name: 'Logout',
		href: '/api/auth/signout',
		protected: true,
		icon: <ArrowRightOnRectangleIcon className="m-2" />,
	},
	{
		name: 'Login',
		href: '/login',
		protected: false,
		icon: <ArrowLeftEndOnRectangleIcon className="m-2" />,
	},
	{
		name: 'Notification',
		href: '/notification',
		protected: true,
		icon: <BellIcon className="m-2" />,
	},
	{
		name: 'Account',
		href: '/account',
		protected: true,
		icon: (
			<Image
				className="m-2"
				src="/icons/avatar-dummy.png"
				quality={100}
				width={18}
				height={18}
				alt={`profile of ${'avatar dummy'}`}
			/>
		),
	},
];

export default function Navbar({ user }: { user: User | null }) {
	const pathName: string = usePathname();

	return (
		<div className="h-[42px] bg-primary-gray-800 w-full py-1 px-2 flex justify-between items-center">
			<div className="w-24 h-full bg-primary-gold-500 opacity-55">
				<p>logo</p>
			</div>

			{/* FIX: not a bug but not a appropriate html structure */}
			<ul className={`app-icons w-28 h-8 flex ${user ? 'justify-between' : 'justify-end'}`}>
				{navLinks.map(link => {
					if (!user && !link.protected) {
						return (
							<TopNavIconFrame href={link.href} key={link.name} active={pathName === link.href}>
								{link.icon}
							</TopNavIconFrame>
						);
					}

					if (user && link.protected) {
						if (link.name === 'Account') {
							link.icon = <img src={user.image} alt={`${user.name} icon`} className="m-2 size-4" />;
						}

						return (
							<TopNavIconFrame href={link.href} key={link.name} active={pathName === link.href}>
								{link.icon}
							</TopNavIconFrame>
						);
					}
				})}
			</ul>
		</div>
	);
}
