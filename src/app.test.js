/* eslint-disable no-undef */
const request = require('supertest');
const app = require('./app');

describe('App', () => {
  it('Should GET / with succes code 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/FAVS API REST/);
  });
});
