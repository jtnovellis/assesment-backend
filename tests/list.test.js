const request = require('supertest');
const { connect, disconnected, cleanup } = require('../src/database');
const app = require('../src/app');
const User = require('../src/api/user/user.model');
const jwt = require('jsonwebtoken');

describe('List', () => {
  let newUser;
  let token;
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
    const user = { email: 'jairotesasasg@test.com', password: 'Prueba123?dd' };
    newUser = await User.create(user);
    token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: 66000,
    });
  });

  afterAll(async () => {
    await disconnected();
  });

  it('Should send 201 status code', async () => {
    const list = { name: 'ranche' };
    const authToken = `Bearer ${token}`;
    const resList = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    expect(resList.statusCode).toBe(201);
  });
});
