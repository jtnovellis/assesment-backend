const request = require('supertest');
const { connect, disconnected, cleanup } = require('./database');
const app = require('./app');

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

  it('Should to respond a string FAVS API REST', async () => {
    const res = await request(app).get('/');
    expect(res.text).toMatch(/FAVS API REST/);
  });
});
