const express = require('express');

const app = express();




app.use('/api/posts', (req, res, next) => {
  const posts = [
    {id: "e3232fc3r" ,
     title: "First server side post",
     content: "This is coming from the server"
    },
    {id: "342ji4h23b" ,
     title: "Second server side post",
     content: "This is also coming from the server!"
    }
];
res.status(200).json({
  message: 'Posts fetched successfully!',
  posts: posts
  });
});

  module.exports = app;
