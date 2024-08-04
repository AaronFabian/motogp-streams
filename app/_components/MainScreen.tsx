import fs from 'fs';
import CustomIframe from './CustomIframe.tsx';

export default function MainScreen() {
	const file = fs.readFileSync('iframe-data.json', 'utf-8');
	const iframeData = JSON.parse(file);

	return (
		<div className="p-2">
			<CustomIframe iframeData={iframeData} />
			{/* <iframe
				src="https://embedstreams.me/fim-moto-gp/motogp-dutch-gp-moto3-fp1-stream-1"
				width="100%"
				height="100%"
				scrolling="no"
				frameBorder="0"
				allowFullScreen
				allowTransparency
				referrerPolicy="unsafe-url"
			></iframe> */}
			{/* <iframe
				className="aspect-video"
				src="https://embedstreams.me/mlb/mlb-network-stream-1"
				width="100%"
				height="100%"
				scrolling="no"
				frameBorder="0"
				allowFullScreen
				allowTransparency
				referrerPolicy="unsafe-url"
			></iframe> */}
		</div>
	);
}
