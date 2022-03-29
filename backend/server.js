const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const http = require("http");
const { MONGO_URI } = require("./config/keys");
const server = http.createServer(app);

//MIDDLEWARE

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes

app.use(require("./Routes/authRoute"));
app.use(require("./Routes/userRoutes"));
app.use("/chat", require("./Routes/chatRoutes"));

//SERVER AND DATABASE

const PORT = process.env.PORT || 5000;
mongoose
  .connect(MONGO_URI)
  .then((result) => {
    console.log("Database connected successfully");

    server.listen(PORT, () => {
      console.log("Server is connected on port:" + PORT);
    });
  })
  .catch((err) => {
    console.log("Error occurred");
  });
