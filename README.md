# Maniy

**Maniy** is a **web-based financial management application** built on a modern **microservices architecture**.  
It integrates **React (Frontend)**, **NestJS (API Gateway & Microservices)**, **GraphQL**, and **Docker** for deployment.  
The project supports **Progressive Web App (PWA)** capabilities and is designed to be scalable, modular, and easy to maintain.  

---

## 🏗️ Architecture

The project consists of the following major components:

1. **Frontend (React)**
   - Built with React + GraphQL  
   - Supports **Progressive Web App (PWA)** features:
     - Offline mode  
     - Install to home screen  
     - Push notifications (optional)  
   - PWA can be implemented with `workbox`, `vite-plugin-pwa`, or `create-react-app` + `serviceWorker`.  

2. **API Gateway**
   - Framework: NestJS  
   - Provides a **GraphQL endpoint**  
   - Routes requests from the frontend to the microservices  

3. **Microservice 1: Auth Service**
   - Framework: NestJS  
   - Authentication using **JWT** for sessions  
   - Optional **OAuth** for third-party login  
   - Stores sessions/tokens in **Redis**  

4. **Microservice 2: Business Logic Service**
   - Framework: Java Spring Boot (optional / hybrid setup)  
   - Connected to **Oracle DB**  
   - Handles core business logic  

5. **Microservice 3: Data Service**
   - Framework: NestJS  
   - Connected to **MongoDB**  
   - Stores unstructured data (logs, dynamic configuration, etc.)  

6. **Message Queue**
   - **RabbitMQ** for asynchronous communication between services  
   - Example: Auth Service emits events consumed by Business Service  

7. **Cache**
   - **Redis** for caching frequently used data:  
     - User data  
     - Sessions  
     - Common GraphQL queries  

8. **Deployment**
   - All services are containerized using **Docker**  
   - CI/CD powered by **GitHub Actions** (build → test → deploy)  

9. **Testing**
   - Testing framework: **Jest** for React & NestJS  

---

## ⚙️ Requirements

- Node.js v16+  
- Yarn or npm  
- Redis  
- RabbitMQ  
- MongoDB  
- Docker & Docker Compose  
- GitHub Actions (for CI/CD)  

---

## 🚀 Installation & Run

1. Clone the repository:

   ```bash
   git clone https://github.com/RayyanHermanto/Maniy.git
   cd Maniy
   ```

2. Install dependencies for each service:

   ```bash
   cd frontend
   npm install
   # or yarn install

   cd ../api-gateway
   npm install

   cd ../auth-service
   npm install

   cd ../data-service
   npm install
   ```

3. Run using **Docker Compose**:

   ```bash
   docker-compose up --build
   ```

4. Access the services:  
   - Frontend: `http://localhost:3000`  
   - API Gateway (GraphQL): `http://localhost:9000/graphql`  

---

## 📡 GraphQL Endpoints

The API Gateway exposes GraphQL endpoints for the frontend.  

Example query:

```graphql
query {
  user(id: "123") {
    id
    name
    email
  }
}
```

Example mutation:

```graphql
mutation {
  login(email: "user@email.com", password: "password") {
    accessToken
    refreshToken
  }
}
```

---

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

---

## 📄 License

© 2025 Rayyan Hermanto  
Licensed under the MIT License.
