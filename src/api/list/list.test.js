/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');
const { connect, disconnected, cleanup } = require('../../database');

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

  it('Should resopond with status code 400', async () => {
    const mockUser = { email: 'jairtfgtr@test.com', password: 'Fg346782?fs5' };
    const resUser = await request(app)
      .post('/api/auth/local/signup')
      .send(mockUser);
    const { token } = resUser.body.data;
    const list = { name: 'music' };
    const res = await request(app)
      .post('/api/lists')
      .set('Authorization', `Bearer ${token}`)
      .send(list);
    expect(res.statusCode).toBe(400);
  });

  it('Should to create the list', async () => {
    const mockUser = {
      email: 'jairotety@test.com',
      password: 'Fg3gg6534?s5',
    };
    const resUser = await request(app)
      .post('/api/auth/local/signup')
      .send(mockUser);
    const { token, user } = resUser.body.data;
    const list = { name: 'musicdsongss', user: user._id };
    const res = await request(app)
      .post('/api/lists')
      .set('Authorization', `Bearer ${token}`)
      .send(list);
    expect(res.statusCode).toBe(201);
  });

  it('Should to show one list by id', async () => {
    const mockUser = {
      email: 'jaidsfreeos@test.com',
      password: 'Fg3ggg32565eree4?s5',
    };
    const resUser = await request(app)
      .post('/api/auth/local/signup')
      .send(mockUser);
    const { token, user } = resUser.body.data;
    const list = { name: 'favsofgsfdgs', user: user._id };
    const resList = await request(app)
      .post('/api/lists')
      .set('Authorization', `Bearer ${token}`)
      .send(list);
    const res = await request(app)
      .get(`/api/lists/${resList.body.data._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.data).toHaveProperty('name');
    expect(res.statusCode).toBe(200);
  });
});
