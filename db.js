const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	port: '',

	user: 'root',
	password: process.env.DB_PASSWORD,

	database: 'classwork1',
});

module.exports = connection;
