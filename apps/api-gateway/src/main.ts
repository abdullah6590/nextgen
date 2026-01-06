import express from 'express';
import proxy from 'express-http-proxy';

const app = express();

app.use('/auth', proxy('http://localhost:3001'));
app.use('/products', proxy('http://localhost:3002'));
app.use('/orders', proxy('http://localhost:3003'));

app.get('/', (req, res) => {
  res.send({ message: 'API Gateway is running' });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
server.on('error', console.error);
