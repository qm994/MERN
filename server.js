const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// connect to db 
connectDB();

app.get('/', (req, res) => {
    res.send('This the test root url!')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))