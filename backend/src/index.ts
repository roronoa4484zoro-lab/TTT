import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameSession } from './game/GameSession';
import { GameState, Move } from '../../shared/types';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const sessions = new Map<string, GameSession>();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('joinGame', ({ roomId }: { roomId: string }) => {
    console.log(`User ${socket.id} joining room ${roomId}`);
    socket.join(roomId);

    let session = sessions.get(roomId);
    if (!session) {
      session = new GameSession(roomId);
      sessions.set(roomId, session);
    }

    const player = session.addPlayer(socket.id, `Player ${session.players.length + 1}`);
    socket.emit('playerAssigned', player);

    if (session.players.length === 2) {
      io.to(roomId).emit('gameStarted', session.getState());
    }

    socket.emit('stateUpdate', session.getState());
  });

  socket.on('makeMove', ({ roomId, index }: Move) => {
    const session = sessions.get(roomId);
    if (!session) return;

    if (session.makeMove(socket.id, index)) {
      io.to(roomId).emit('stateUpdate', session.getState());
    } else {
      socket.emit('moveRejected', { message: 'Invalid move' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // Simple cleanup: remove session if room is empty
    for (const [roomId, session] of sessions.entries()) {
      if (session.players.find(p => p.id === socket.id)) {
        session.players = session.players.filter(p => p.id !== socket.id);
        if (session.players.length === 0) {
          sessions.delete(roomId);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
