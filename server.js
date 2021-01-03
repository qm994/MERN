const express = require('express');
const connectDB = require('./config/db');
const user = require('./routes/api/user');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');


// Connect to DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// use the routes
app.use('/api/users', user);
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

//Serve static asset in prod
if(process.env.NODE_ENV == 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
};


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))