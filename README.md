# Maniy

**Maniy** adalah proyek aplikasi modern berbasis microservices yang menggabungkan **React (Frontend)**, **NestJS (API Gateway dan Microservices)**, **GraphQL**, serta **Docker** untuk deployment. Proyek ini mendukung **PWA (Progressive Web App)** dan dirancang untuk scalable, modular, dan mudah di-maintain.

---

## 🏗️ Arsitektur

Proyek ini terdiri dari beberapa komponen utama:

1. **Frontend (React)**
   - Framework: React + GraphQL
   - Mendukung **Progressive Web App (PWA)**:
     - Offline mode
     - Install ke home screen
     - Push notification (opsional)
   - PWA dapat diimplementasikan dengan `workbox`, `vite-plugin-pwa`, atau `create-react-app` + `serviceWorker`.

2. **API Gateway**
   - Framework: NestJS
   - Menyediakan endpoint **GraphQL**
   - Meneruskan request dari frontend ke microservices

3. **Microservice 1: Auth Service**
   - Framework: NestJS
   - Autentikasi menggunakan **JWT** untuk session
   - Mendukung **OAuth** untuk login pihak ketiga (opsional)
   - Menyimpan session/token di **Redis**

4. **Microservice 2: Business Logic Service**
   - Framework: Java Spring Boot (opsional atau hybrid)
   - Terhubung ke **Oracle DB**
   - Menangani logic bisnis inti

5. **Microservice 3: Data Service**
   - Framework: NestJS
   - Terhubung ke **MongoDB**
   - Menyimpan data tidak terstruktur (log, konfigurasi dinamis, dll)

6. **Message Queue**
   - **RabbitMQ** untuk komunikasi asynchronous antar microservices
   - Contoh: Auth Service mengirim event ke Business Service

7. **Cache**
   - **Redis** untuk caching:
     - Data user
     - Session
     - Query GraphQL yang sering dipakai

8. **Deployment**
   - Semua layanan dikontainerisasi dengan **Docker**
   - CI/CD menggunakan **GitHub Actions** (build → test → deploy otomatis)

9. **Testing**
   - Framework testing: **Jest** untuk React & NestJS

---

## ⚙️ Persyaratan

- Node.js v16+
- Yarn atau npm
- Redis
- RabbitMQ
- MongoDB
- Docker & Docker Compose
- GitHub Actions (untuk CI/CD)

---

## 🚀 Instalasi & Menjalankan

1. Kloning repositori:

   ```bash
   git clone https://github.com/RayyanHermanto/Maniy.git
   cd Maniy
   ```

2. Setup dependency di masing-masing service:

   ```bash
   cd frontend
   npm install
   # atau yarn install

   cd ../api-gateway
   npm install

   cd ../auth-service
   npm install

   cd ../data-service
   npm install
   ```

3. Jalankan menggunakan **Docker Compose**:

   ```bash
   docker-compose up --build
   ```

4. Akses layanan:
   - Frontend: `http://localhost:3000`
   - API Gateway (GraphQL): `http://localhost:9000/graphql`

---

## 📡 Endpoints GraphQL

API Gateway menyajikan endpoint GraphQL untuk frontend. Contoh query:

```graphql
query {
  user(id: "123") {
    id
    name
    email
  }
}
```

Contoh mutation:

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

Menjalankan unit test:

```bash
npm run test
```

---


## 📄 Lisensi

© 2025 Rayyan Hermanto  
Licensed under the MIT License.
