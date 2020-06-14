const express = require('express');
const app = express();
// const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const gameRouter = require('./routes/gameRoutes');
const authRouter = require('./routes/authRoutes');
const mainRouter = require('./routes/mainRoutes');


const port = process.env.PORT || 8080;

mongoose
        .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(() => {
                console.log('MongoDB Connected');
        })
        .catch((err) => console.log(`Mongo Error: ${err}`));

//qoutes in console
// app.use(snarky);
//morgan invoke
app.use(morgan('dev'));
//let it work with express.json and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//base path
app.use('/api/v1/games', gameRouter, authRouter, mainRouter); // Parent route

//listen port
app.listen(port, () => {
        console.log(`Listening on port ${port}`);
});
