# Backend Setup

## Environment Variables
Copy `.env.example` to `.env` and update values as needed.

Required variables:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JSON Web Token secret
- `PORT`: server port (default `5000`)

## Running locally
1. Create `backend/.env` from `backend/.env.example`.
2. Start MongoDB locally or via Docker.
3. Run `npm install` in `backend`.
4. Run `npm start`.

> Do not copy `.env` values into PDFs or text fields. Paste corruption and hidden characters are common causes of runtime failures. Share the file directly via a secure link instead.

## Running with Docker Compose
Docker Compose already injects backend config from `docker-compose.yml`.
The frontend is configured to call the backend at `http://localhost:5000` from the browser.
