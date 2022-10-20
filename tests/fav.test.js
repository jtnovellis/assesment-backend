const request = require('supertest');
const { connect, disconnected, cleanup } = require('../src/database');
const app = require('../src/app');
const User = require('../src/api/user/user.model');
const jwt = require('jsonwebtoken');

describe('Fav', () => {
  let newUser;
  let token;

  beforeAll(async () => {
    await connect();
  });
  beforeEach(async () => {
    await cleanup();
    const user = { email: 'jairoasasg@test.com', password: 'Prueba123?dd' };
    newUser = await User.create(user);
    token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: 66000,
    });
  });
  afterAll(async () => {
    await disconnected();
  });

  it('Should to create a fav', async () => {
    const list = { name: 'ranche' };
    const authToken = `Bearer ${token}`;
    const resList = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    const listId = resList.body.data._id;
    const res = await request(app)
      .post(`/api/favs/${listId}`)
      .send({
        title: 'salchicha',
        description: 'potatos',
        link: 'this is a link',
      })
      .set('Authorization', authToken);
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.data).toHaveProperty('description');
    expect(res.body.data).toHaveProperty('link');
  });

  it('Should to return a status code 400 and not created a fav', async () => {
    const list = { name: 'ranche' };
    const authToken = `Bearer ${token}`;
    const resList = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    const listId = resList.body.data._id;
    const res = await request(app)
      .post(`/api/favs/${listId}tre`)
      .send({
        title: 'salchicha',
        description: 'potatos',
        link: 'this is a link',
      })
      .set('Authorization', authToken);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/fav not created/);
  });

  it('Should to show all favs', async () => {
    const list = { name: 'ranche' };
    const authToken = `Bearer ${token}`;
    const resList = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    const listId = resList.body.data._id;
    const res = await request(app)
      .get(`/api/favs/${listId}`)
      .set('Authorization', authToken);
    expect(res.statusCode).toBe(200);
  });

  it('Should to show a fav with ID', async () => {
    const list = { name: 'ranche' };
    const authToken = `Bearer ${token}`;
    const resList = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    const listId = resList.body.data._id;
    const resFav = await request(app)
      .post(`/api/favs/${listId}`)
      .send({
        title: 'salchicha',
        description: 'potatos',
        link: 'this is a link',
      })
      .set('Authorization', authToken);
    const favId = resFav.body.data._id;
    const res = await request(app)
      .get(`/api/favs/${favId}`)
      .set('Authorization', authToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/favs found/i);
  });

  it('Should to updated a fav', async () => {
    const list = { name: 'rancheras' };
    const authToken = `Bearer ${token}`;
    const resList = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    const listId = resList.body.data._id;
    const resFav = await request(app)
      .post(`/api/favs/${listId}`)
      .send({
        title: 'salchicha',
        description: 'potatos',
        link: 'this is a link',
      })
      .set('Authorization', authToken);
    const favId = resFav.body.data._id;
    const res = await request(app)
      .put(`/api/favs/${favId}`)
      .send({
        title: 'thid is the title',
        description: 'potatos',
        link: 'this is a link',
      })
      .set('Authorization', authToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/fav updated/i);
  });

  it('Should to destroy a fav', async () => {
    const list = { name: 'ranchetas' };
    const authToken = `Bearer ${token}`;
    const resList = await request(app)
      .post('/api/lists')
      .send(list)
      .set('Authorization', authToken);
    const listId = resList.body.data._id;
    const resFav = await request(app)
      .post(`/api/favs/${listId}`)
      .send({
        title: 'salchicha',
        description: 'potatos',
        link: 'this is a link',
      })
      .set('Authorization', authToken);
    const favId = resFav.body.data._id;
    const res = await request(app)
      .delete(`/api/favs/${favId}`)
      .set('Authorization', authToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/fav deleted/i);
  });
});
