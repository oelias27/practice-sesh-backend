const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const request = require('superagent');

const port = process.env.PORT || 3000;
const app = express();

const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes.js');

const dbAddress = process.env.DB;

app.use(bodyParser());
app.use(morgan('dev'));
app.use(cors())

mongoose.connect(dbAddress);

let db = mongoose.connection;

app.use('/users', userRoutes);
app.use('/session', sessionRoutes);

app.listen(port, () => { console.log('Listening on port', port) });
