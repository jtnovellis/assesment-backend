/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const { connect, disconnected, cleanup } = require('../database');

describe('User', () => {
  beforeAll(async () => {
    await connect();
  });
  beforeEach(async () => {
    await cleanup();
  });
  afterAll(async () => {
    await disconnected();
  });

  it('Should resopond with status code 201', async () => {
    const user = { email: 'jairo.test@test.com', password: 'Fg3432634?s5' };
    const res = await request(app).post('/api/auth/local/signup').send(user);
    expect(res.statusCode).toBe(201);
  });
});
