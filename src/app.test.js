/* eslint-disable no-undef */
const request = require('supertest');
const app = require('./app');
const { connect, disconnected, cleanup } = require('./database');

describe('App', () => {
  beforeAll(async () => {
    await connect();
  });
  beforeEach(async () => {
    await cleanup();
  });
  afterAll(async () => {
    await disconnected();
  });

  it('Should GET / with succes code 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/FAVS API REST/);
  });
});
