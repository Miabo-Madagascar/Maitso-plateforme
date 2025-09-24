const http = require('http');

const port = process.env.PORT || 8080;

const requestHandler = (req, res) => {
  res.end('Hello from Elastic Beanstalk!');
};

const server = http.createServer(requestHandler);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
