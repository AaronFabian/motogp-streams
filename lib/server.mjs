import next from 'next';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
	const httpsServer = createServer(handler);

	const io = new Server(httpsServer);

	io.on('connection', socket => {
		// console.log(socket);
		// const clientId = socket.client.id;

		socket.on('personal_warning', data => {
			socket.join(data.id);
			console.log(`[SOCKET.IO] User with ID ${data.id} connected`);
		});

		socket.on('comment', async data => {
			try {
				io.emit('announce', { ...data });
			} catch (error) {
				io.to(data.id).emit('announce_personal_warning', { message: 'Something gone wrong 404' });
			}
		});
	});

	httpsServer
		.once('error', err => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
});
