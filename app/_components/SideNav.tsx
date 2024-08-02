'use client';

import { ClipboardDocumentListIcon, FlagIcon, HomeIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SideNav() {
	const pathName: string = usePathname();

	return (
		<div className="w-[50%] max-w-52 px-2 rounded-lg fixed bottom-5 left-1/2 -translate-x-1/2 bg-primary-gray-800 grid grid-cols-3 gap-2 grid-flow-col justify-items-center z-10">
			<IconLink href="/schedules" active={pathName === '/schedules'}>
				<ClipboardDocumentListIcon
					width={28}
					height={28}
					stroke="#C8C8C8"
					className={`${pathName === '/schedules' && 'stroke-primary-gold-500'}`}
				/>
			</IconLink>
			<IconLink href="/streaming" active={pathName === '/streaming'}>
				<FlagIcon
					width={28}
					height={28}
					stroke="#C8C8C8"
					className={`${pathName === '/streaming' && 'stroke-primary-gold-500'}`}
				/>
			</IconLink>
			<IconLink href="/" active={pathName === '/'}>
				<HomeIcon
					width={28}
					height={28}
					stroke="#C8C8C8"
					className={`${pathName === '/' && 'stroke-primary-gold-500'}`}
				/>
			</IconLink>
		</div>
	);
}

function IconLink({ children, active, href }: { children: React.ReactNode; href: string; active: boolean }) {
	return (
		<Link href={href} className={`p-2.5 ${active && 'border-b border-b-1 border-primary-gold-500'}`}>
			{children}
		</Link>
	);
}
