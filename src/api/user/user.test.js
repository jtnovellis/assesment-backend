const request = require('supertest');
const { connect, disconnected, cleanup } = require('../../database');
const app = require('../../app');

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
    const user = { email: 'jairotesting@test.com', password: 'Jairo1234?' };
    const res = await request(app).post('/api/auth/local/signup').send(user);
    expect(res.statusCode).toBe(201);
  });
});
