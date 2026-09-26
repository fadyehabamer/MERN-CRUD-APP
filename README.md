## MERN CRUD App

[![CI](https://github.com/fadyehabamer/MERN-CRUD-APP/actions/workflows/ci.yml/badge.svg)](https://github.com/fadyehabamer/MERN-CRUD-APP/actions/workflows/ci.yml)

> This is a simple MERN stack CRUD application that allows users to perform basic CRUD operations on a list of users.

### Technologies used
- ExpressJS (Backend)
- MongoDB (Database)
- ReactJS (Frontend)
- Vite (Frontend bundler)
- Render (Backend hosting)
- Vercel (Frontend hosting)

### API Endpoints
> The following API endpoints are available for interacting with the application:

```
GET /users - Retrieves a list of all users in the database.
POST /users/createuser - Creates a new user in the database.
DELETE /users/deleteuser/:id - Deletes a specific user from the database, where :id is the ID of the user to be deleted.
PUT /users/updateuser/:id - Updates data for a specific user in the database, where :id is the ID of the user to be updated.
```

User documents have `name` (string), `email` (string) and `age` (number, >= 0), all required.
Invalid ids or input return `400`, and unknown ids return `404`.

### Running the Application

#### Prerequisites
- Node.js 22.x
- A MongoDB database (for example a MongoDB Atlas cluster)

#### Backend
Create a `.env` file in the repository root (it is git-ignored):

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority
# optional, defaults to 3001
PORT=3001
```

The older `DB_USERNAME`, `DB_PASSWORD` and `DB_NAME` variables are still
supported when `MONGODB_URI` is not set: they are combined into a connection
string for the original Atlas cluster (`cluster0.t4ao1fy.mongodb.net`). New
setups should use `MONGODB_URI`, which takes precedence when both are present.

Then, from the root directory:
```
npm install
npm run dev   # loads .env and restarts on changes (nodemon)
```

`npm start` runs `node server.js` without loading `.env`; use it where the
environment variables are provided by the host (e.g. Render).

#### Tests
```
npm test
```

The API tests (`test/`) use Node's built-in test runner with
[mongodb-memory-server](https://github.com/typegoose/mongodb-memory-server), so
they need no database or `.env`. The first run downloads a MongoDB binary.

#### Frontend
From the `client` directory:
```
npm install
npm run dev     # start the Vite dev server
npm run build   # production build into client/dist
```

By default the client talks to the deployed backend. To use your local server,
create `client/.env.local` with:
```
VITE_API_URL=http://localhost:3001
```

### Deployment
> The backend is hosted on Render, and the frontend is hosted on Vercel.

- To deploy the backend, follow the instructions in the [Render Documentation](https://render.com/docs).
- To deploy the frontend, follow the instructions in the [Vercel Documentation](https://vercel.com/docs).
  With the Vercel project's root directory set to `client`, `client/vercel.json` rewrites every path to `index.html` so routes such as `/update/:id` load on refresh.
