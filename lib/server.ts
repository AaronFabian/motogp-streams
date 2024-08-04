/*
	NOTE: 09-07-2024
		The purpose of this server.js is to connect the mysql connection
		but only create the connection once.
		IF we create the connection in the route. they will be re execute
		ref: https://nextjs.org/docs/pages/building-your-application/configuring/custom-server
*/
require('dotenv').config();

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.NEXT_PUBLIC_HOST || 'localhost';
const port = process.env.PORT || 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer(async function (req, res) {
		try {
			// Be sure to pass `true` as the second argument to `url.parse`.
			// This tells it to parse the query portion of the URL.
			const parsedUrl = parse(req.url, true);

			await handle(req, res, parsedUrl);
		} catch (err) {
			console.error('Error occurred handling', req.url, err);
			res.statusCode = 500;
			res.end('internal server error');
		}
	})
		.once('error', err => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			// execute once for the
			// db.connection.connect();

			console.log(`> Ready on http://${hostname}:${port}`);
		});
});
