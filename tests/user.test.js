const request = require('supertest');
const { cleanup, connect, disconnected } = require('../src/database');
const app = require('../src/app');

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

  it('Should send 201 status code', async () => {
    const user = { email: 'jairotesg@test.com', password: 'Prueba123?' };
    const res = await request(app).post('/api/auth/local/signup').send(user);
    expect(res.statusCode).toBe(201);
  });

  it('Should to return a token', async () => {
    const user = { email: 'jairotesting@test.com', password: 'Prueba123?' };
    const res = await request(app).post('/api/auth/local/signup').send(user);
    expect(res.body.data).toMatch(/^(?:[\w-]*\.){2}[\w-]*$/);
  });

  it('Should not create a user', async () => {
    const user = { email: 'jairotestitest.com', password: 'Prueba123?' };
    const res = await request(app).post('/api/auth/local/signup').send(user);
    expect(res.statusCode).toBe(400);
  });

  it('Should to login a user', async () => {
    const user = { email: 'jairotest@test.com', password: 'Prueba123?' };
    await request(app).post('/api/auth/local/signup').send(user);
    const res = await request(app).post('/api/auth/local/signin').send(user);
    expect(res.body.data).toMatch(/^(?:[\w-]*\.){2}[\w-]*$/);
    expect(res.statusCode).toBe(200);
  });

  it('Should not login a user', async () => {
    const user = { email: 'jairot@test.com', password: 'Prueba123?' };
    const res = await request(app).post('/api/auth/local/signin').send(user);
    expect(res.statusCode).toBe(400);
  });
});
