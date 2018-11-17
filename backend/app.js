const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://User:4ihAZKpFUEmCjnkn@cluster0-9thfn.mongodb.net/node-angular?retryWrites=true")
.then( () => {
 console.log('Connected to database!');
})
.catch(()=> {
  console.log('Connection failed!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
 res.setHeader(
   "Access-Control-Allow-Origin",
   "*");
 res.setHeader(
   "Access-Control-Allow-Headers",
   "*");
   res.setHeader(
    "Access-Control-Max-Age",
    "86400");

   res.setHeader(
    "Access-Control-Expose-Headers",
    "*");
   res.setHeader(
     "Access-Control-Allow-Methods",
     "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
next();
});

app.post("/api/posts", (req, res, next) => {
const post = new Post({
  title: req.body.title,
  content: req.body.content
});
post.save().then( createdPost => {
  res.status(201).json({
    message: 'Posts added successfully!!!!',
    postId: createdPost._id
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post). then(result => {
    console.log(result);
    res.status(200).json({message: 'Update Successful!'});
  })
});

// fetching the posts created in real time
app.get('/api/posts', (req, res, next) => {
  Post.find()
.then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
      });
  });
});

app.get("/api/posts/:id" , (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({message: 'Post not found! '});
    }
  });
});


// deleting the posts functionality
  // req.params is a property by node(express) that gives the
  // access to all encoded parameters coming from the request - here
  // we have only one, i.e. id
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!"});
  });
});

  module.exports = app;
