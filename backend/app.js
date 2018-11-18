const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://User:4ihAZKpFUEmCjnkn@cluster0-9thfn.mongodb.net/test?retryWrites=true"
  )
  .then( () => {
    //creating a time stamp for console to know each time local server was restarted and connected to database
   var DEBUG = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        return "[DEBUG TimeStamp " + (new Date).toLocaleTimeString() + "]";
    };
    return {
        log: console.log.bind(console, '%s', timestamp)
    }
  })();
  // calling the debug var for timestamp on console:
  DEBUG.log(" Connected to MongoDB database! ");
  })
  .catch(()=> {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
