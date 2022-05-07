const path = require('path');
const express = require('express');

const globalErrorHandler = require('./controllers/errorController');
const projectRouter = require('./routes/projectRoutes');

const app = express();

// Setting up the templating engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Serving static files
app.use(express.static(path.join(__dirname, '/public')));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up routes
app.use('/projects', projectRouter);

app.get('/', (_, res) => res.redirect('/projects'));

// Catch all and error handling
app.all('*', (req, _, next) => next(`Cannot find '${req.originalUrl}'`));
app.use(globalErrorHandler);

module.exports = app;
