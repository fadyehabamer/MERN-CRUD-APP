const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const app = require('../app');
const UsersModel = require('../models/Users');

let mongod;

before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

after(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

beforeEach(async () => {
  await UsersModel.deleteMany({});
});

const alice = { name: 'Alice', email: 'alice@example.com', age: 30 };

test('GET /users returns an empty list', async () => {
  const res = await request(app).get('/users').expect(200);
  assert.deepEqual(res.body, []);
});

test('POST /users/createuser creates a user', async () => {
  const res = await request(app).post('/users/createuser').send(alice).expect(200);
  assert.equal(res.body.name, 'Alice');
  assert.ok(res.body._id);
  const list = await request(app).get('/users').expect(200);
  assert.equal(list.body.length, 1);
  assert.equal(list.body[0].email, 'alice@example.com');
});

test('POST /users/createuser ignores fields outside the schema', async () => {
  const _id = new mongoose.Types.ObjectId().toString();
  const res = await request(app)
    .post('/users/createuser')
    .send({ ...alice, _id, isAdmin: true })
    .expect(200);
  assert.notEqual(res.body._id, _id);
  assert.equal(res.body.isAdmin, undefined);
});

test('POST /users/createuser rejects invalid input with 400', async () => {
  await request(app).post('/users/createuser').send({ name: 'Bob' }).expect(400);
  await request(app).post('/users/createuser').send({ ...alice, email: 'nope' }).expect(400);
  await request(app).post('/users/createuser').send({ ...alice, age: -1 }).expect(400);
});

test('PUT /users/updateuser/:id applies a partial update', async () => {
  const user = await UsersModel.create(alice);
  const res = await request(app).put(`/users/updateuser/${user.id}`).send({ age: 31 }).expect(200);
  assert.deepEqual(res.body, { message: 'User updated' });
  const updated = await UsersModel.findById(user.id).lean();
  assert.equal(updated.age, 31);
  assert.equal(updated.name, 'Alice');
});

test('PUT /users/updateuser/:id validates, rejects bad ids and reports missing users', async () => {
  const user = await UsersModel.create(alice);
  await request(app).put(`/users/updateuser/${user.id}`).send({ age: -5 }).expect(400);
  await request(app).put('/users/updateuser/not-an-id').send({ age: 1 }).expect(400);
  const missing = new mongoose.Types.ObjectId();
  await request(app).put(`/users/updateuser/${missing}`).send({ age: 1 }).expect(404);
});

test('DELETE /users/deleteuser/:id deletes a user', async () => {
  const user = await UsersModel.create(alice);
  const res = await request(app).delete(`/users/deleteuser/${user.id}`).expect(200);
  assert.deepEqual(res.body, { message: 'User deleted' });
  assert.equal(await UsersModel.countDocuments(), 0);
  await request(app).delete(`/users/deleteuser/${user.id}`).expect(404);
  await request(app).delete('/users/deleteuser/not-an-id').expect(400);
});
