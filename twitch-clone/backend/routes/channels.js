const express = require('express');
const router = express.Router();
const { listChannels, createChannel } = require('../controllers/channels');

router.get('/', async (req, res) => {
  const data = await listChannels();
  res.json(data);
});
router.post('/', async (req, res) => {
  const ch = await createChannel(req.body);
  res.json(ch);
});
module.exports = router;
