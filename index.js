const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("./passport");
const session = require("express-session");
const authRoutes = require("./components/_auth");
const userRoutes = require("./components/users");
const verifyRoutes = require("./components/verify");
const adminRoutes = require("./components/admin");
const classRoutes = require("./components/class");
const { Server } = require("socket.io");
// const { createAdapter } = require("@socket.io/redis-adapter");
// const { createClient } = require("redis");
const classRepository = require("./components/class/ClassRepository");

const middleware = require("./middleware/auth");
const { createServer } = require("http");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_HOST = process.env.CLIENT_HOST || "http://localhost:3000";
let onlineUsers = [];
require("dotenv").config();

// const pubClient = createClient({ host: "localhost", port: 6379 });
// const subClient = pubClient.duplicate();
console.log(CLIENT_HOST);
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_HOST,
    methods: ["GET", "POST"],
  },
});

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

app.use(
  session({
    secret: "very secret keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (id) => {
  onlineUsers = onlineUsers.filter((user) => user.userId !== id);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

const newNotiList = async (userId) => {
  const result = await classRepository.getNotifications(userId);
  console.log(result, " chuan bi gui");
  return result;
};
let count = 0;
io.on("connection", (socket) => {
  // let myinterval = setInterval(function() {
  //   console.log("New connection ", onlineUsers);
  // }, 3000);
  // myinterval
  count++;
  console.log("connected: ", count);
  socket.on("newUser", (userId) => {
    addNewUser(userId, socket.id);
    console.log("Online users: ", onlineUsers);
  });

  socket.on("sendClassNotification", async ({ data }) => {
    console.log(data, " CLASS NOTI DATA");
    for (const rev of data.receiverId) {
      console.log(rev.userId);
      const receiver = getUser(rev.userId);
      console.log(receiver);
      if (receiver) {
        io.to(receiver.socketId).emit("getNotification", {
          content: await newNotiList(receiver.userId),
        });
      }
    }
  });

  socket.on("sendNotification", ({ senderId, receiverId, type }) => {
    const receiver = getUser(receiverId);
    console.log(type);
    io.to(receiver.socketId).emit("getNotification", {
      content: newNotiList(receiver.socketId),
    });
  });

  socket.on("disconnect", (userId) => {
    console.log("USER disconnect ", onlineUsers);
    removeUser(userId);
  });
});

//app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.use("/", middleware.verifyToken, userRoutes);
app.use("/auth", verifyRoutes);
app.use("/admin", middleware.verifyToken, adminRoutes);
app.use("/class", middleware.verifyToken, classRoutes);
io.listen(3500);
app.listen(PORT, () => console.log(`Server running at ${PORT}`));

module.exports = app;
