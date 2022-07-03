// Require dependencies
const express = require('express');
const path = require('path');
const logger = require("morgan");

// const cors = require('cors');
const { Console } = require('console');
// console.log(typeof webScraper.webScraper())

// Configure the app port
const port = process.env.PORT || 3001;

// Create an Express application
const app = express();

app.set('port', port);


// const corsOption = {
//     origin: ['http://localhost:3001'],
// };


// Load middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

app.use('/api', require('./proxy-api.js'));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));
//this is for tailwind.
// app.use(express.static(path.join(__dirname, 'dist')));


// Stop browser from sending requests to get the icon
app.get('../build/favicon.ico', (req, res) => res.status(204).end());

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}.`));


