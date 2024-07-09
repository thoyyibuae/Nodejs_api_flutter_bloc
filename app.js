const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const url = "mongodb://localhost:27017/tvtnodejs";

// 127.0.0.1
// const auth = require("./auth/jwt/authentication_page");
//  'mongodb://localhost/test_nodejs'

const app = express();

app.use(cors());

// mongoose.connect('mongodb://127.0.0.1/blog')
mongoose.set("strictQuery", false);

mongoose.connect(url, {
  useNewUrlParser: true,
});

const con = mongoose.connection;

con.on("open", function () {
  console.log("connected : " + port);
});

app.get("/one/two", function (req, res) {
  var url = req.url + req.hostname;
  let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(fullUrl);
  res.status(200).send({ host: fullUrl });
});

const userRouter = require("./routers/user_router");
const bookRouter = require("./routers/book_router");
const filetestRouter = require("./routers/fileController");
const taskRouter = require("./routers/task_router");



var port = process.env.PORT || 4001;

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/file", filetestRouter);
app.use("/api/task", taskRouter);

app.use(function (req, res, next) {
  console.log(req);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(
  4001,

  function () {
    console.log("Server Started : 3000");
  }
);

// var corsOptions = {
//     origin: "http://localhost:3000"
//   };

//   const corsOptions ={
//     origin: "http://localhost:8081",
//     // origin:'*',
//     credentials:true, //access-control-allow-credentials:true
//      optionSuccessStatus:200,
// }

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//       'Content-Type': 'text/plain'
//     })

//     res.end('Hi!')
//   })

// app.listen(port, () =>
// kill(port, 'tcp')
// .then(console.log)
// .catch(console.log),
// 1000
// //  console.log(server has started at port ${port})
//  );