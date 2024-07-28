import Link from 'next/link';

export default function TopNavIconFrame({
	children,
	href,
	active,
}: {
	children: React.ReactNode;
	href: string;
	active: boolean;
}) {
	return (
		<li className={`app-icon w-8 h-8 rounded-lg ${active ? 'bg-dim-gold' : 'bg-primary-gray-500'}`}>
			<Link className="" href={href}>
				{children}
			</Link>
		</li>
	);
}
