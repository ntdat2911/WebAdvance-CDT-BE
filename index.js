const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//const session = require('express-session');
const authRoutes = require("./components/_auth");

const app = express();
const PORT = process.env.PORT || 5000; 

//require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded());
app.use(express.json({ strict: false }))
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello')
});

// app.use(session({
//     secret: 'very secret keyboard cat',
//     resave: false,
//     saveUninitialized: false,
// }));

//app.use(passport.authenticate('session'));

app.use('/auth', authRoutes);
app.post('/api/stuff', (req, res, next) => {
    console.log('test');
    console.log(req.body); // after parsing req.body will be json , from front end we need not to stringify and do other stuff
    res.status(201).json({
        message: 'Objet créé !'
    });
});
app.listen(PORT, () => console.log(`Server running at ${PORT}`));

module.exports = app;