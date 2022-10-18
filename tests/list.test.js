const request = require('supertest');
const { cleanup, connect, disconnected } = require('../src/database');
const app = require('../src/app');

describe('List', () => {
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
    const user = { email: 'jairotestinng@test.com', password: 'Prueba123?dd' };
    const resUser = await request(app)
      .post('/api/auth/local/signup')
      .send(user);
    const list = { name: 'ranchera' };
    const token = `Bearer ${resUser.body.data}`;
    const resList = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', token);
    expect(resList.statusCode).toBe(201);
  });
});
