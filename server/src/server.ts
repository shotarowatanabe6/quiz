import express, { Application } from 'express';
import * as http from 'http';
import { Socket, Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

export interface QuestionSet {
  Id: string;
  Question: string;
  Choices: string[];
  Answer: {
    ChoiceIndex: number;
    Text: string;
  };
}


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
    io.emit('chat message', msg);
  });

  socket.on('showQuestion', (question: string) => {
    io.emit('showQuestion', question);
  });

  socket.on('showChoices', (chocies: string[]) => {
    io.emit('showChoices', chocies);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
