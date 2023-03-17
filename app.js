const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var logger = require('morgan');
var app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const router =  require('./src/routes/routes');

app.get('/', (req,res) => {
    res.json({message: 'hay'})
})

app.use('/api', router);

module.exports = app;
