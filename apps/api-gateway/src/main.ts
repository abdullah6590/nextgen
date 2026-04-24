import express from 'express';
import proxy from 'express-http-proxy';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

const app = express();

// Enable CORS for allowed frontend origins
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001,http://localhost:4200,http://localhost:4201').split(',');
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Request logging
app.use(morgan('combined'));

app.use('/auth', proxy('http://127.0.0.1:3001', { limit: '50mb' }));
app.use('/products', proxy('http://127.0.0.1:3002', { limit: '50mb' }));
app.use('/orders', proxy('http://127.0.0.1:3003', { limit: '50mb' }));
app.use('/visual-search', proxy('http://127.0.0.1:3004', { limit: '50mb', proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
  // Ensure we don't accidentally time out on large ML uploads
  proxyReqOpts.timeout = 10000;
  return proxyReqOpts;
} }));
app.use('/recommendations', proxy('http://127.0.0.1:3005', { limit: '50mb' }));

app.get('/', (req, res) => {
  res.send({ message: 'API Gateway is running' });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
server.on('error', console.error);
