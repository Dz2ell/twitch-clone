const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { nanoid } = require('nanoid');
const adapter = new JSONFile('./db/db.json');
const db = new Low(adapter);

async function init() {
  await db.read();
  db.data ||= { users: [], channels: [] };
  await db.write();
}
init();

async function writeUser({ username, password, oauthId, provider }) {
  const id = oauthId || nanoid();
  const user = { id, username, password: password || null, oauthId: oauthId || null, provider: provider || null };
  db.data.users.push(user);
  await db.write();
  return user;
}

async function getUser(username) {
  await db.read();
  return db.data.users.find(u => u.username === username);
}

async function getUserByOAuth(oauthId) {
  await db.read();
  return db.data.users.find(u => u.oauthId === oauthId);
}

module.exports = { writeUser, getUser, getUserByOAuth };
