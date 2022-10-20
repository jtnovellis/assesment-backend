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
    expect(resList.body.data).toHaveProperty('name');
  });

  it('Should to not create a list', async () => {
    const list = { name: 'Food' };
    const res = await request(app).post('/api/lists').send(list);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/The sesion has expired by athorization/);
  });

  it('Should to get all list by user', async () => {
    const authToken = `Bearer ${token}`;
    const res = await request(app)
      .get('/api/lists')
      .set('Authorization', authToken);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
  });

  it('Should to show a list by id', async () => {
    const list = { name: 'ranche' };
    const authToken = `Bearer ${token}`;
    const res = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    const id = res.body.data._id;
    const getList = await request(app)
      .get(`/api/lists/${id}`)
      .set('Authorization', authToken);
    expect(getList.statusCode).toBe(200);
    expect(getList.body.message).toMatch(/List found/);
    expect(getList.body.data).toHaveProperty('name');
  });

  it('Should to update a list', async () => {
    const list = { name: 'rancheta' };
    const authToken = `Bearer ${token}`;
    const res = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    const id = res.body.data._id;
    const updatedList = await request(app)
      .put(`/api/lists/${id}`)
      .set('Authorization', authToken);
    expect(updatedList.statusCode).toBe(200);
    expect(updatedList.body.message).toMatch(/List updated/);
  });

  it('Should to delete a list', async () => {
    const list = { name: 'rancheta' };
    const authToken = `Bearer ${token}`;
    const res = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    const id = res.body.data._id;
    const deletedList = await request(app)
      .delete(`/api/lists/${id}`)
      .set('Authorization', authToken);
    expect(deletedList.statusCode).toBe(200);
    expect(deletedList.body.message).toMatch(/List deleted/);
  });
});
