const LEGACY_CLUSTER_HOST = 'cluster0.t4ao1fy.mongodb.net';

function getMongoUri(env = process.env) {
  if (env.MONGODB_URI) {
    return env.MONGODB_URI;
  }
  const { DB_USERNAME, DB_PASSWORD, DB_NAME = '' } = env;
  if (DB_USERNAME && DB_PASSWORD) {
    return `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${LEGACY_CLUSTER_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
  }
  throw new Error(
    'MongoDB is not configured: set MONGODB_URI (or the legacy DB_USERNAME, DB_PASSWORD and DB_NAME).'
  );
}

module.exports = { getMongoUri };
