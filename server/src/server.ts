import express, { Application } from 'express';
import * as http from 'http';
import { Socket, Server as SocketIOServer } from 'socket.io';
import cors from 'cors';


const PORT = process.env.PORT || 3001;
const app: Application = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const server = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
});

io.on('connection', (socket: Socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg: string) => {
    console.log(msg);
    io.emit('chat message', msg);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
