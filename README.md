# 💳 Card Validation API

[![NestJS](https://img.shields.io/badge/Framework-NestJS-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![NodeJS](https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A robust, enterprise-grade **Card Validation API** built with **NestJS**. This project demonstrates advanced backend patterns, focusing on security, scalability, and strict adherence to **SOLID** principles and **Modular Architecture**.

---

## 🚀 Key Features

- **Modular Architecture:** Designed with highly encapsulated modules for scalability and maintainability  
- **SOLID Principles:** Focus on single responsibility and interface segregation  
- **Dependency Injection:** Uses NestJS DI container for decoupled components  
- **Global Exception Handling:** Centralized `HttpApiException` filter for consistent error responses  
- **Schema Persistence:** MongoDB integration via Mongoose  
- **Hot Reloading:** Nodemon for development efficiency  
- **Automated Testing:** Unit and integration tests using Jest  

---

## 🛠️ Tech Stack

- **Framework:** NestJS (Node.js)  
- **Database:** MongoDB (Mongoose)  
- **Validation:** class-validator & class-transformer  
- **Dev Tools:** Nodemon, Postman  
- **Testing:** Jest  

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/kendrickchibueze/card-validation-api.git
cd card-validation-api
```
###  2. Install dependencies
```bash
npm install
```

###  3. Environment Setup

Create a .env file in the root directory:
```bash
PORT=3000
MONGO_URI=YOUR mongoURI
```

###  4. Run the application
```bash
npm run start:dev

The API will be live at:
👉 http://localhost:3000
 ⚡
 ```

🛰️ API Documentation & Usage
 ### 1. Validate Card (Success Path)

Endpoint:
```bash
POST /api/v1/cards/validate
```

Request Body:
```bash

{
  "cardNumber": "4111 1111 1111 1111"
}
```

Response Body:
```bash

{
  "isValid": true,
  "brand": "Visa",
  "formattedCard": "4111********1111"
}
```

### 2. Global Exception Handling (Error Path)

Demonstrates how the global HttpApiException filter handles invalid input gracefully.

Request Body:
```bash

{
  "cardNumber": "4111-PAY-FAIL-1111"
}
```
Error Response:

```bash
{
  "success": false,
  "statusCode": 400,
  "timestamp": "2026-04-29T21:07:41.368Z",
  "error": [
    "Card number contains invalid characters."
  ]
}
```