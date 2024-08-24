/*
  In order to make the db mysql only run once we create the custom server.js 
  but we can't put mysql configuration in the server.js otherwise it will cause
  an error (TypeError) 'next' is not a function

*/

// import mysql from 'mysql';

// const connection: mysql.Connection = mysql.createConnection({
// 	host: '35.200.68.183',
// 	user: 'root',
// 	password: 'y;Z_Z?/_8Lm-:=OA',
// 	database: 'motogp_streams',
// });

// export { connection };

// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD as string,
	database: process.env.DB_DATABASE_NAME as string,
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
