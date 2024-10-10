const express = require('express');
const specs = require('./swagger-output.json');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use('/api', require('./routes/faculty.js'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});