const express = require("express");
const cors = require("cors");

//const session = require('express-session');
const authRoutes = require("./components/_auth");

const app = express();
const PORT = process.env.PORT || 5000; 

//require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

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

app.listen(PORT, () => console.log(`Server running at ${PORT}`));