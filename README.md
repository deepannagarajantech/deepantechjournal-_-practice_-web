# DeepanTechJournal Practice Web

A comprehensive full-stack automation testing playground featuring Web UI automation, API testing, Security testing, Database operations, and Performance testing capabilities.

## 🚀 Overview

This project provides a complete testing environment with a Spring Boot backend and React frontend, designed for practicing and demonstrating various automation testing techniques and patterns.

### Technology Stack

**Backend:**
- Spring Boot 3.3.0
- Java 17
- H2 In-Memory Database
- Spring Security with JWT Authentication
- Swagger/OpenAPI Documentation
- Apache POI (Excel processing)
- Thumbnailator (Image processing)

**Frontend:**
- React 18
- Vite 5
- Tailwind CSS 3
- React Router 6
- Axios

## 📋 Prerequisites

- **Java 17** or higher
- **Maven 3.6+**
- **Node.js 16+** and npm
- Git

## 🏃 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "deepantechjournal _ practice_ web"
```

### 2. Start the Backend

```bash
cd deepantechjournal-practice-backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**API Documentation:** `http://localhost:8080/swagger-ui.html`

### 3. Start the Frontend

```bash
cd frontend/deepantechjournal-practice-frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

## ✨ Key Features

### Authentication & Authorization
- JWT-based authentication
- User registration and login
- Protected routes and endpoints
- Role-based access control

### Product Management
- Full CRUD operations for products
- Bulk CSV upload
- Bulk Excel upload
- Product image upload with automatic thumbnail generation
- Image carousel display

### Testing Labs

#### 🎯 AutomationLab
Practice UI automation with various element types:
- Buttons, inputs, checkboxes, radio buttons
- Dropdowns and multi-select
- Date pickers and sliders
- Drag and drop
- Dynamic elements

#### 🔬 AdvancedUiLab
Complex UI interactions:
- Shadow DOM elements
- iFrames
- Nested elements
- Custom keyboard shortcuts
- Mouse hover effects
- Context menus

#### 🌐 ApiLab
API testing playground:
- GET, POST, PUT, DELETE operations
- Request/response inspection
- Error handling scenarios
- Authentication testing

#### 🗄️ DbLab
Database operations:
- View all products
- Execute custom queries
- Database state inspection
- Data validation

#### 🔒 SecurityLab
Security testing scenarios:
- SQL injection testing
- XSS vulnerability testing
- CSRF protection
- Authentication bypass attempts

### Admin Features
- Add new products
- Bulk import via CSV/Excel
- Upload and manage product images
- User management

## 📚 Documentation

- [Backend Documentation](./deepantechjournal-practice-backend/README.md)
- [Frontend Documentation](./frontend/deepantechjournal-practice-frontend/README.md)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Bulk Operations
- `POST /api/products/bulk/csv` - Upload CSV
- `POST /api/products/bulk/excel` - Upload Excel

### Product Images
- `POST /api/products/images/{id}` - Upload product images
- `GET /api/products/images/{id}` - Get product images

### Security Testing
- `GET /api/security/sql-injection` - SQL injection test endpoint
- `GET /api/security/xss` - XSS test endpoint

### Database Debug
- `GET /api/debug/db/all` - Get all database records
- `GET /api/debug/db/count` - Get record count

## 🏗️ Project Structure

```
deepantechjournal _ practice_ web/
├── deepantechjournal-practice-backend/    # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/deepantechjournal/practiceweb/
│   │       ├── config/           # Security, CORS configuration
│   │       ├── controllers/      # REST controllers
│   │       ├── dto/              # Data transfer objects
│   │       ├── models/           # JPA entities
│   │       ├── repositories/     # Data repositories
│   │       └── security/         # JWT, authentication
│   └── pom.xml
│
└── frontend/deepantechjournal-practice-frontend/  # React frontend
    ├── src/
    │   ├── api/                  # API client
    │   ├── components/           # Reusable components
    │   ├── context/              # React context (Auth)
    │   ├── pages/                # Page components
    │   └── App.jsx
    └── package.json
```

## 🧪 Testing

This application is designed as a testing playground. You can:

1. **Practice UI Automation**: Use Selenium, Playwright, or Cypress with the various lab pages
2. **API Testing**: Test REST endpoints with Postman, REST Assured, or similar tools
3. **Security Testing**: Explore security vulnerabilities in a safe environment
4. **Database Testing**: Validate data integrity and query results
5. **Performance Testing**: Load test the application endpoints

## 📝 Default Credentials

For testing purposes, you can register a new user or use default credentials if seeded.

## 🤝 Contributing

This is a practice project for automation testing. Feel free to extend it with additional testing scenarios.

## 📄 License

This project is for educational and practice purposes.
