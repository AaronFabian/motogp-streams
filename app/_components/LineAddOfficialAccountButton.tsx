'use client';

import Script from 'next/script';

export default function LineAddOfficialAccountButton() {
	return (
		<>
			<iframe
				data-lang="en"
				data-type="friend"
				data-env="REAL"
				data-count="true"
				data-home="true"
				data-lineid="@2005829745"
				data-line-it-id="0"
				scrolling="no"
				frameBorder="0"
				allowTransparency
				className="line-it-button"
				src="https://social-plugins.line.me/widget/friend?lineId=%402005829745&amp;count=true&amp;home=true&amp;lang=en&amp;type=friend&amp;id=0&amp;origin=http%3A%2F%2F127.0.0.1%3A5500%2Ftest.html&amp;title=&amp;env=REAL"
				title="Add  as a friend."
				style={{
					width: '78px',
					height: '20px',
					visibility: 'visible',
					position: 'static',
					margin: 'auto',
					opacity: 1,
				}}
			></iframe>
			<Script
				src="https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js"
				async
				defer
				onLoad={() => console.log(`script loaded correctly`)}
			/>
		</>
	);
}
