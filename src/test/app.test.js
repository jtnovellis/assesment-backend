/* eslint-disable no-undef */
const req = require('supertest');
const app = require('../app');

describe('App', () => {
  it('Should GET / with succes code 200', async () => {
    const res = await req(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/FAVS API REST/);
  });
});
