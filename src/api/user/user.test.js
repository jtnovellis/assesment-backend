/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');

describe('User', () => {
  it('Should resopond with status code 201', async () => {
    const user = { email: 'jairo.testing@test.com', password: 'Jairo1234?' };
    const res = await request(app).post('/api/auth/local/signup').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
  /*  it('Should not create user when there is no email', async () => {
    const user = { password: 'Fg3432634?s5' };
    const res = await request(app).post('/api/auth/local/signup').send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch('User could not be created');
  }); */
  /*  it('Should not create user when email is invalid', async () => {
    const user = { email: 'jairo.t', password: 'Fg3432634?s5' };
    const res = await request(app).post('/api/auth/local/signup').send(user);
    expect(res.statusCode).toBe(400);
  }); */
  /*  it('Should not create user when email already exists', async () => {
    const user = { email: 'jairo.test@test.com', password: 'Fg3432634?s5' };
    await request(app).post('/api/auth/local/signup').send(user);
    const res = await request(app).post('/api/auth/local/signup').send(user);
    expect(res.statusCode).toBe(400);
  }); */
  /* it('Should signin user correctly', async () => {
    const user = { email: 'jairo.test@test.com', password: 'Fg3432634?s5' };
    await request(app).post('/api/auth/local/signup').send(user);
    const res = await request(app).post('/api/auth/local/signin').send(user);
    expect(res.statusCode).toBe(201);
  }); */
  /*   it('Should not login whether incorrect password', async () => {
    const user = { email: 'jairo.test@test.com', password: 'Fg3432634?s5' };
    await request(app).post('/api/auth/local/signup').send(user);
    const res = await request(app)
      .post('/api/auth/local/signin')
      .send({ ...user, password: '13423' });
    expect(res.statusCode).toBe(400);
  }); */
  /*   it('Should not login user whether email does not exist', async () => {
    const user = { email: 'jairo.test@test.com', password: 'Fg3432634?s5' };
    const res = await request(app).post('/api/auth/local/signin').send(user);
    expect(res.statusCode).toBe(400);
  }); */
});
