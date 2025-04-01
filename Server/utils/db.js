import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Check if environment variables are loaded correctly
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

// Create a MySQL connection using the environment variables
const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Connect to the database
connection.connect(function(err) {
    if (err) {
        console.error('Connection error:', err.message);
    } else {
        console.log('Connected successfully to MySQL');
    }
});

// Export the connection for use in other parts of your app
export default connection;

// Optionally, close the connection gracefully on process exit
process.on('SIGINT', () => {
    connection.end(() => {
        console.log('MySQL connection closed gracefully');
        process.exit(0);
    });
});
