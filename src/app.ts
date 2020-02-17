import express, { Express, Request, Response, NextFunction } from 'express';
import http from 'http';
import socketio from 'socket.io';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import auth from './routes/auth';

const app: Express = express();
const port: number = 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

// Routes
app.use('/auth', auth);

app.use((req: Request, res: Response, next: NextFunction) => {
  let error: any = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const server: http.Server = http.createServer(app);
const io: socketio.Server = socketio(server);

io.on('connection', (socket: any) => {
  console.log('a user connected', socket);
});

// io.listen()

server.listen(port, () => {
  console.log(`ll-learning api is listening on port ${port}!`);
});
