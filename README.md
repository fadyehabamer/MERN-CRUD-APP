## MERN CRUD App
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

### Running the Application
> Before running the application, make sure to set up the environment variables for the backend in .env file:

```
DB_NAME=xxx
DB_USERNAME=xxx
DB_PASSWORD=xxx
```


> To start the backend server, navigate to the root directory and run:
```
npm install
npm start
```

> To start the frontend server, navigate to the client directory and run:
```
npm install
npm run dev
```

### Deployment
> The backend is hosted on Render, and the frontend is hosted on Vercel.

- To deploy the backend, follow the instructions in the [Render Documentation](https://render.com/docs).
- To deploy the frontend, follow the instructions in the [Vercel Documentation](https://vercel.com/docs).
