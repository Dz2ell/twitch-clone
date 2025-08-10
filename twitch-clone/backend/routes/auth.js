const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { writeUser, getUser } = require('../controllers/users');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await writeUser({ username, password: hashed });
  res.json({ ok: true, user: { id: user.id, username: user.username } });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (!user) return res.status(401).json({ error: 'no user' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'bad creds' });
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

module.exports = router;
