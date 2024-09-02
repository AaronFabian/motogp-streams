import {
	ArrowLeftEndOnRectangleIcon,
	ClipboardDocumentListIcon,
	FlagIcon,
	LightBulbIcon,
} from '@heroicons/react/24/outline';
import DataCountComponent from './_components/DataCountComponent.tsx';
import DayPicker from './_components/DayPicker.tsx';

export default function Page() {
	// test
	const test = new Date();
	const MONTH_OFF_SET = 1;
	const month = test.getMonth(); // - MONTH_OFF_SET;

	// console.log(current.toLocaleDateString('us-US', { weekday: 'long' }));

	return (
		<div className="p-2">
			<h1 className="text-center text-4xl font-bold py-4">MotoGP Streams</h1>
			<p className="text-center py-4 text-lg">
				<span className="text-primary-gold-500 font-semibold">Welcome!</span> We&apos;re here to ensure that every
				MotoGP <span className="font-medium">fan worldwide</span>. Our&nbsp;
				<span className="font-medium">simple yet effective design</span> makes it easy for you to catch your favorite
				races !
			</p>
			<DataCountComponent />
			<small className="text-center block">* Data for {test.getFullYear()} *</small>
			<h2 className="text-xl font-medium pt-4 pb-2 flex items-center justify-center">
				<LightBulbIcon className="w-6 mr-2 hover:stroke-primary-gold-500 transition-all duration-150" />
				Let&apos;s get started with using this website
			</h2>
			<p className="text-xs -mt-1 italic text-center">
				&nbsp; * Follow the steps below to fully understand how to use this website.&nbsp;
			</p>
			<h3 className="pt-4 pb-2 mt-4">1. Create an Account</h3>&nbsp;
			<p className="pl-4">
				Click the small icon at the top right of the navbar&nbsp;&nbsp;
				<ArrowLeftEndOnRectangleIcon className="w-6 inline -translate-y-1 hover:stroke-primary-gold-500 transition-all duration-150" />
				&nbsp; &nbsp;to go to the <span className="font-medium">Login page</span>.&nbsp;
			</p>
			&nbsp;
			<h3 className="pt-4 pb-2">2. Sign in Quickly with Your Google Account</h3>&nbsp;
			<p className="pl-4">
				On the Login page, click &quot;Sign in with Google&quot; in the middle of the page. Follow Google&apos; steps to
				automatically register with our application.&nbsp;
			</p>
			&nbsp;
			<h3 className="pt-4 pb-2">3. Get Notifications via Line Messenger</h3>&nbsp;
			<p className="pl-4">
				After successfully registering or logging in, register your Line account as instructed on the Login page. Why
				use <span className="text-green-700">Line</span>? With <span className="text-green-700">Line</span>, your
				account is secure, and no sensitive data is leaked to anyone, including us!&nbsp;
			</p>
			&nbsp;
			<h3 className="pt-4 pb-2">4. Find Your Desired Schedule</h3>&nbsp;
			<p className="pl-4">
				Thanks for registering your account and Line account! Now, let&apos; go to the&nbsp;
				<span className="font-medium">Streaming</span> page. Click the navigation bar at the bottom and look for this
				icon&nbsp;&nbsp;
				<ClipboardDocumentListIcon className="w-6 inline -translate-y-0.5 hover:stroke-primary-gold-500 transition-all duration-150" />
				.&nbsp;
			</p>
			&nbsp;
			<h3 className="pt-4 pb-2">5. Find Events!</h3>&nbsp;
			<p className="pl-4"> Events are sorted by month. Click a panel to see which day MotoGP events are scheduled. </p>
			&nbsp;
			<h3 className="pt-4 pb-2">6. Get Notifications! 😉</h3>&nbsp;
			<p className="pl-4">
				Click the day of the event you want us to notify you about. After selecting the day, choose when you want to be
				notified: <span className="border rounded-full px-2">1 day</span>,&nbsp;
				<span className="border rounded-full px-2">2 days</span>, or&nbsp;
				<span className="border rounded-full px-2">7 days</span> before the event.&nbsp;
			</p>
			&nbsp;
			<h3 className="pt-4 pb-2">7. Enjoy the Race ~</h3>&nbsp;
			<p className="pl-4">
				When the day comes, enjoy the race! Click the bottom navbar icon&nbsp;&nbsp;
				<FlagIcon className="w-6 inline hover:stroke-primary-gold-500 transition-all duration-150" /> to go to the&nbsp;
				<span className="font-medium">Streaming</span> page.&nbsp;
			</p>
			&nbsp;
			<h3 className="pt-4 text-center">
				That&apos;s it ! Thank you by using our website your support make us better in the future.
			</h3>
		</div>
	);
}
