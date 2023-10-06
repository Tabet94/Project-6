const http = require('http'); // Import the HTTP module
const app = require('./App'); // Import the Express application

// Function to normalize the port number
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000'); // Set the port to either the environment variable PORT or 3000
app.set('port', port); // Set the 'port' property in the Express app with the determined port

// Function to handle errors during server startup
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); // Create an HTTP server using the Express app

server.on('error', errorHandler); // Listen for server errors and handle them using the 'errorHandler' function

server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind); // Once the server is listening, log the information about where it's listening
});

server.listen(port); // Start the server and make it listen on the determined port

