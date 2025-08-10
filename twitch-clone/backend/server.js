require('dotenv').config();
const express = require('express');
const http = require('http');
const NodeMediaServer = require('node-media-server');
const nmsConfig = require('./config/nmsConfig');
const socketio = require('socket.io');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const oauthRoutes = require('./routes/oauth');
const channelsRoutes = require('./routes/channels');

const app = express();
app.use(express.json());
app.use(cors());

// session for passport (OAuth)
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-session-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passport-setup')(passport);

app.use('/api/auth', authRoutes);
app.use('/api/oauth', oauthRoutes);
app.use('/api/channels', channelsRoutes);

// serve frontend static
app.use('/', express.static(__dirname + '/../frontend'));

const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

// Simple chat rooms
io.on('connection', socket => {
  socket.on('join', ({ channel }) => {
    socket.join(channel);
  });
  socket.on('msg', ({ channel, user, text }) => {
    io.to(channel).emit('msg', { user, text, ts: Date.now() });
  });
});

// Start NodeMediaServer
const nms = new NodeMediaServer(nmsConfig);
nms.run();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Export app for tests
module.exports = app;
