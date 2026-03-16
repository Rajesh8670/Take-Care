# TakeCare Application

This document provides instructions on how to run and deploy the TakeCare application.

The application consists of a frontend and a backend. For deployment, the frontend should call the hosted backend instead of `localhost`.

## Deployed URLs

- Frontend: `https://take-care-frontend.onrender.com`
- Backend: `https://take-care-backend.onrender.com`

## Frontend Environment

Set this in the frontend environment before building:

```sh
VITE_API_BASE_URL=https://take-care-backend.onrender.com
```

For Render, add the same variable in the frontend service environment settings.

## Backend Environment

Set this in the backend environment so CORS allows the deployed frontend:

```sh
FRONTEND_URL=https://take-care-frontend.onrender.com
```

## Running the Backend

The backend server is responsible for handling data and API requests.

1.  Open a terminal.
2.  Navigate to the backend directory:
    ```sh
    cd d:\project\TakeCare\Backend
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  Start the server:
    ```sh
    npm start
    ```
    The server will start on `http://localhost:5000` locally, or on `process.env.PORT` when deployed.

**Note:** The backend server needs to connect to a MongoDB database. Make sure your database is running and the connection string in `app.js` is correct. If the server fails to start, check the console for database connection errors.

## Running the Frontend

The frontend is a React application built with Vite.

1.  Open another terminal.
2.  Navigate to the frontend directory:
    ```sh
    cd d:\project\TakeCare\Frontend\takecare-frontend
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  Start the development server:
    ```sh
    npm run dev
    ```
    The application will be available at the URL provided in the terminal (usually on a port like 5173).

By following these instructions and ensuring both servers are running, the `net::ERR_CONNECTION_REFUSED` error will be resolved.
