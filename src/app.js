const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const {httpLogin, httpsProtected} = require('./controllers/auth.controller');

const {httpRegisterUser, httpGetUsers} = require('./controllers/user.controller');

const app = express();


// middlewares

app.use(express.json());

app.use(cookieParser());

app.use(cors());


// home route

app.get('/home', (req, res) => {

    res.status(200).json({ message: "Welcome home!" })

});


// protected route

app.get('/protected', httpsProtected);


// get all users route

app.get('/users', httpGetUsers);



// login route

app.post('/login', httpLogin);


// user registration route

app.post('/register', httpRegisterUser)



// when a route does not exist to handle a request

app.use('/*', (req, res) => {

    res.status(400).json({message:"Route Not Found!"});
});



module.exports = app;