import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'anaxir',
    password: 'maco',
    database: 'job_board',
});

const connectDB = () => {
    return connection.connect()
}

export default {connectDB,connection}