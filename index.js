const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("./passport");
//const session = require('express-session');
const authRoutes = require("./components/_auth");
const userRoutes = require("./components/users");
const verifyRoutes = require("./components/verify");
const adminRoutes = require("./components/admin");
const classRoutes = require("./components/class");

const middleware = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_HOST = process.env.CLIENT_HOST || "http://localhost:3000";
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.json({ strict: false }));
app.use(
  cors({
    origin: { CLIENT_HOST },
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello");
});

// app.use(session({
//     secret: 'very secret keyboard cat',
//     resave: false,
//     saveUninitialized: false,
// }));

//app.use(passport.authenticate('session'));

app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/auth", verifyRoutes);
app.use("/admin", middleware.verifyToken, adminRoutes);
app.use("/class", classRoutes);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));

module.exports = app;
