const http = require('http');
const app = require('./backend/app');
const port = process.env.PORT || 3000;

app.set('port', port);
const server = http.createServer(app);

server.listen(port, function () {
  console.log("express has started on port 3000");
  });
