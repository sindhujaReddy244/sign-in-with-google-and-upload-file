const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
//const ejs = require('ejs');

const app = express();
const port = 4000;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: 'sindhu244',
	port: 5432,
    
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.post('/addMessage', (req, res) => {
    const { name, message } = req.body;
    pool.query('INSERT INTO messages (name, message) VALUES ($1, $2)', [name, message], (error, results) => {
        if (error) {
           res.status(500).send("An error occurred while adding the message.");
        } else {
            res.send("Message added successfully.");
        }
    });
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});



/*

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();

// Middleware
app.use(bodyParser.json());

// PostgreSQL client
const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'sindhu244',
    port: 5432,
});

// Connect to the PostgreSQL database
client.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

// Get all wishes
app.get('/wishes', (req, res) => {
    client.query('SELECT * FROM wishes', (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal server error');
        } else {
            res.send(result.rows);
        }
    });
});

// Add a new wish
app.post('/wishes', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        res.status(400).send('Name and wish are required');
    } else {
        client.query('INSERT INTO wishes (name, message) VALUES ($1, $2)', [name, message], (err) => {
            if (err) {
                console.error('Error executing query', err.stack);
                res.status(500).send('Internal server error');
            } else {
                res.status(201).send('Wish added successfully');
            }
        });
    }
});



// Start the server
app.listen(4000, () => {
    console.log('Server started on port 4000');
});


*/

