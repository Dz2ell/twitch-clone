const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { nanoid } = require('nanoid');
const adapter = new JSONFile('./db/db.json');
const db = new Low(adapter);

async function init(){ await db.read(); db.data ||= { users: [], channels: [] }; await db.write(); }
init();

async function listChannels(){ await db.read(); return db.data.channels; }
async function createChannel({ title, streamKey }){ const ch = { id: nanoid(), title: title || 'Untitled', streamKey: streamKey || nanoid(8) }; db.data.channels.push(ch); await db.write(); return ch; }

module.exports = { listChannels, createChannel };
