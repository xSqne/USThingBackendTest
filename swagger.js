const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Endpoint for USThing Backend Test',
    description: 'This is a simple API documentation for USThing Backend Test',
  },
  host: 'localhost:3000',
  basePath: '/',
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);