const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser')

const app = express();


// middlewares

app.use(express.json());

app.use(cookieParser);

app.use(cors());


// Routes

app.post('/', (req, res) => {

    res.status(200).send("Welcome to Santo Domingo!")

});

module.exports = app;