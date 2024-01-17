import express from 'express'
import mysql from 'mysql2'


const app = express();
const port = 3000;



const connection = mysql.createConnection({
host: 'localhost',
user: 'anaxir',
password: 'maco',
database: 'job_board',
});



connection.connect((err) => {
if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
}

console.log('Connected to MySQL database as id ' + connection.threadId);
});



app.use(express.urlencoded({ extended: false }));




//Post action to get the information

app.post('/submit', (req, res) => {

    const data = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.place,
    };

    const sql = 'INSERT INTO companies (name, mail, place) VALUES (?, ?, ?)';

    connection.query(sql, [data.name, data.mail, data.place], (error, results) => {
        if (error) {
        console.error('Error inserting data: ' + error.message);
        } else {
        console.log('Data inserted successfully.');
        }

    });
});



//Get request

//Put request


//Delete request





