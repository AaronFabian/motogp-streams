/*
  In order to make the db mysql only run once we create the custom server.js 
  but we can't put mysql configuration in the server.js otherwise it will cause
  an error (TypeError) 'next' is not a function

*/

import mysql from 'mysql';

const connection: mysql.Connection = mysql.createConnection({
	host: '34.146.29.175',
	user: 'root',
	password: "&q7|sc=Q@$+BVf'$",
	database: 'motogp_streams',
});

export { connection };

/*
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		port: 3308,
		password: 'my-secret-pw',
		database: 'motogp_streams',
	});

	connection.connect(err => {
		if (err) {
			console.error('Error connecting to the database:', err.stack);
			return;
		}
		console.log('Connected to the database as id ' + connection.threadId);
	});
*/
