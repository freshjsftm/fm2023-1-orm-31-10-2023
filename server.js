const http = require('http');
const app = require('./app.js');

const port = process.env.PORT || 3000; //http 80   https 443

const server = http.createServer(app);

server.listen(port, () => {
  console.log('server started at port = ', port);
});
