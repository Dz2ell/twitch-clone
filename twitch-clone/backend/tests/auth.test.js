const request = require('supertest');
const app = require('../server');

describe('auth', () => {
  it('register & login flow', async () => {
    const username = 't_' + Date.now();
    const pw = 'qwerty123';
    const reg = await request(app).post('/api/auth/register').send({ username, password: pw });
    expect(reg.statusCode).toBe(200);
    const login = await request(app).post('/api/auth/login').send({ username, password: pw });
    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeTruthy();
  }, 20000);
});
