# Reflection

This submission dockerises the ILFS group project using Docker Compose, running frontend, backend, and MongoDB together. I chose Docker Compose because it provides a simple multi-container setup that matches the task requirement for a fully containerised end-to-end application. Each service is defined in `docker-compose.yml`, with backend and MongoDB connected by an internal Docker network and the frontend configured to reach the backend at `http://backend:5000`.

I handled dependencies by using the official Node images and installing packages inside the container build steps. The backend uses `dotenv` for runtime configuration, and Docker Compose injects the MongoDB URI and JWT secret into the backend container. The frontend is configured with `REACT_APP_API_URL=http://backend:5000`, allowing the React app to talk to the backend service inside Docker.

During containerisation, the main issue was ensuring the frontend could resolve the backend service name inside Docker. I fixed this by using the Docker Compose service hostname rather than `localhost`. I also ensured `.env` files are not committed to the public repo and created `.env.example` placeholders so anyone can recreate the required configuration.

