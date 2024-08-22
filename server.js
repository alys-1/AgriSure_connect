const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2'); // Use mysql2
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sakshi@2004', // Update this with your MySQL root password
    database: 'agrisure_connect'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connected...');
});

// Serve index.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve chat and contract pages
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

app.get('/contract', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contract.html'));
});

// Farmer and Buyer registration routes
app.post('/add_farmer', (req, res) => {
    const { name, produce, quantity } = req.body;
    const sql = 'INSERT INTO farmers (name, produce, quantity) VALUES (?, ?, ?)';
    db.query(sql, [name, produce, quantity], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding farmer');
        } else {
            res.send('Farmer registered successfully');
        }
    });
});

app.post('/add_buyer', (req, res) => {
    const { name, requirement, required_quantity } = req.body;
    const sql = 'INSERT INTO buyers (name, requirement, required_quantity) VALUES (?, ?, ?)';
    db.query(sql, [name, requirement, required_quantity], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding buyer');
        } else {
            res.send('Buyer registered successfully');
        }
    });
});

// Handle chat messages with Socket.io
io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast chat message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Handle contract form submission
app.post('/form_contract', (req, res) => {
    const { farmer_id, buyer_id, product, quantity, price, delivery_date } = req.body;
    const sql = 'INSERT INTO contracts (farmer_id, buyer_id, product, quantity, price, delivery_date) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [farmer_id, buyer_id, product, quantity, price, delivery_date], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error forming contract');
        } else {
            res.send('Contract formed successfully');
        }
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
