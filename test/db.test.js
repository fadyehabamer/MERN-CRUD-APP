const test = require('node:test');
const assert = require('node:assert/strict');
const { getMongoUri } = require('../db');

test('uses MONGODB_URI when it is set', () => {
  assert.equal(
    getMongoUri({ MONGODB_URI: 'mongodb://localhost:27017/crud', DB_USERNAME: 'u', DB_PASSWORD: 'p' }),
    'mongodb://localhost:27017/crud'
  );
});

test('builds the legacy Atlas URI from DB_* variables', () => {
  assert.equal(
    getMongoUri({ DB_USERNAME: 'user', DB_PASSWORD: 'pass', DB_NAME: 'crud' }),
    'mongodb+srv://user:pass@cluster0.t4ao1fy.mongodb.net/crud?retryWrites=true&w=majority'
  );
});

test('throws when no connection settings are provided', () => {
  assert.throws(() => getMongoUri({}), /MONGODB_URI/);
});
