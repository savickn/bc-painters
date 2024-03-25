
let { describe, it, expect } = global;

import request from 'supertest';

import app from '../app';
import * as db from '../config/testing/testDb';
import { signToken } from './auth.service';

import User from '../api/user/user.model';
import UserFactory from '../api/user/user.factory';


describe('POST /auth/local/', function() {
  let user;
  
  beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
  });
  beforeEach(async () => {
    user = await User.create(UserFactory.build({
      email: "test@example.com",
      password: "***test123"
    }));
  });
  afterEach(async () => {
      await db.clearDatabase();
  });
  afterAll(async () => {
      await db.closeDatabase();
  });

  // test cases

  it('should respond with 401 if no email and password are provided', async () => {
    const res = await request(app)
      .post('/auth/local/')
      .send({
        name: "hello"
      });
    expect(res.statusCode).toBe(401);
  });

  it('should respond with 401 if email does not exist', async () => {
    const res = await request(app)
      .post('/auth/local/')
      .send({
        email: 'test123@example.com', 
        password: '***test123'
      });
    expect(res.statusCode).toBe(401);
  });

  it('should respond with 401 if password is incorrect', async () => {
    const res = await request(app)
      .post('/auth/local/')
      .send({
        email: 'test@example.com', 
        password: '***test'
      });
    expect(res.statusCode).toBe(401);
  });

  it('should respond with 200 if email and password are correct', async () => {
    const res = await request(app)
      .post('/auth/local/')
      .send({
        email: 'test@example.com', 
        password: '***test123'
      });
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.token).toBeTruthy();
  });
});

