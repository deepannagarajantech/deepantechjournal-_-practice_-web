# DeepanTechJournal Practice Web - Backend

Spring Boot 3 backend providing REST APIs for authentication, product management, file uploads, and testing labs.

## 🏗️ Technology Stack

- **Spring Boot**: 3.3.0
- **Java**: 17
- **Database**: H2 (in-memory)
- **Security**: Spring Security + JWT (jjwt 0.11.5)
- **API Documentation**: Swagger/OpenAPI (springdoc 2.5.0)
- **File Processing**: Apache POI 5.2.5 (Excel)
- **Image Processing**: Thumbnailator 0.4.20
- **Build Tool**: Maven

## 📁 Project Structure

```
src/main/java/com/deepantechjournal/practiceweb/
├── DeepanTechJournalApplication.java    # Main application class
├── config/
│   ├── CorsConfig.java                  # CORS configuration
│   ├── JwtAuthenticationFilter.java     # JWT filter
│   ├── SecurityConfig.java              # Security configuration
│   └── SwaggerConfig.java               # Swagger/OpenAPI config
├── controllers/
│   ├── AuthController.java              # Authentication endpoints
│   ├── ProductController.java           # Product CRUD
│   ├── ProductBulkController.java       # CSV/Excel bulk upload
│   ├── ProductImageController.java      # Image upload/management
│   ├── UserController.java              # User management
│   ├── SecurityController.java          # Security testing endpoints
│   ├── DebugDBController.java           # Database debug endpoints
│   └── FileController.java              # File operations
├── dto/
│   ├── LoginRequest.java                # Login DTO
│   ├── RegisterRequest.java             # Registration DTO
│   └── AuthResponse.java                # Auth response DTO
├── models/
│   ├── User.java                        # User entity
│   ├── Product.java                     # Product entity
│   ├── ProductImage.java                # Product image entity
│   └── Role.java                        # Role enum
├── repositories/
│   ├── UserRepository.java              # User data access
│   ├── ProductRepository.java           # Product data access
│   ├── ProductImageRepository.java      # Image data access
│   └── RoleRepository.java              # Role data access
└── security/
    ├── JwtTokenProvider.java            # JWT token generation/validation
    ├── UserDetailsServiceImpl.java      # User details service
    └── SecurityUtils.java               # Security utilities
```

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Installation & Running

```bash
# Navigate to backend directory
cd deepantechjournal-practice-backend

# Run the application
mvn spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/practice-web-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

### Access Swagger UI

Open `http://localhost:8080/swagger-ui.html` for interactive API documentation.

### H2 Database Console

Access the H2 console at `http://localhost:8080/h2-console` (if enabled in configuration)

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user, returns JWT | No |
| GET | `/api/auth/me` | Get current user info | Yes |

**Register Request:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Login Request:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "username": "testuser",
  "email": "test@example.com"
}
```

### Products (`/api/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/{id}` | Get product by ID | No |
| POST | `/api/products` | Create new product | Yes |
| PUT | `/api/products/{id}` | Update product | Yes |
| DELETE | `/api/products/{id}` | Delete product | Yes |

**Product Model:**
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 100,
  "sku": "PROD-001"
}
```

### Bulk Operations (`/api/products/bulk`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/products/bulk/csv` | Upload CSV file | Yes |
| POST | `/api/products/bulk/excel` | Upload Excel file | Yes |

**CSV Format:**
```csv
name,description,price,category,stock,sku
Product 1,Description 1,99.99,Electronics,100,SKU001
Product 2,Description 2,149.99,Books,50,SKU002
```

**Excel Format:** Same columns as CSV, supports .xlsx files

### Product Images (`/api/products/images`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/products/images/{id}` | Upload product images | Yes |
| GET | `/api/products/images/{id}` | Get product images | No |

- Supports multiple image upload
- Automatically generates thumbnails
- Returns image URLs for display

### Users (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/me` | Get current user | Yes |

### Security Testing (`/api/security`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/security/sql-injection?input={value}` | SQL injection test | No |
| GET | `/api/security/xss?input={value}` | XSS vulnerability test | No |

⚠️ **Warning:** These endpoints are intentionally vulnerable for testing purposes only.

### Database Debug (`/api/debug/db`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/debug/db/all` | Get all database records | No |
| GET | `/api/debug/db/count` | Get record counts | No |

## 🔐 Security

### JWT Authentication

- JWT tokens are issued upon successful login
- Tokens expire after 24 hours (configurable)
- Include token in Authorization header: `Bearer <token>`

### CORS Configuration

- Configured to allow requests from `http://localhost:5173` (frontend)
- Supports credentials
- Allows common HTTP methods

### Password Encoding

- Passwords are hashed using BCrypt
- Never stored in plain text

## 🗄️ Database Schema

### User Table
- `id` (Long, Primary Key)
- `username` (String, Unique)
- `email` (String, Unique)
- `password` (String, Encrypted)
- `roles` (Set<Role>)

### Product Table
- `id` (Long, Primary Key)
- `name` (String)
- `description` (String)
- `price` (Double)
- `category` (String)
- `stock` (Integer)
- `sku` (String, Unique)

### ProductImage Table
- `id` (Long, Primary Key)
- `productId` (Long, Foreign Key)
- `imageUrl` (String)
- `thumbnailUrl` (String)
- `isPrimary` (Boolean)

## 🧪 Testing

### Manual Testing with Swagger

1. Start the application
2. Open `http://localhost:8080/swagger-ui.html`
3. Test endpoints interactively

### Testing with Postman

Import the Postman collection from `postman/` directory (if available).

### Automated Testing

```bash
# Run unit tests
mvn test

# Run with coverage
mvn clean test jacoco:report
```

## 🛠️ Configuration

Configuration is handled through Spring Boot's application properties (if present) or defaults.

**Key Configurations:**
- Server Port: `8080`
- Database: H2 in-memory
- JWT Secret: Configured in `JwtTokenProvider`
- File Upload: Max size and location

## 📦 Dependencies

Key dependencies from `pom.xml`:

- `spring-boot-starter-web` - REST API support
- `spring-boot-starter-data-jpa` - Database access
- `spring-boot-starter-security` - Security framework
- `h2` - In-memory database
- `jjwt-*` - JWT token handling
- `springdoc-openapi-starter-webmvc-ui` - Swagger documentation
- `poi-ooxml` - Excel file processing
- `thumbnailator` - Image thumbnail generation
- `lombok` - Reduce boilerplate code

## 🚧 Development

### Adding New Endpoints

1. Create controller in `controllers/` package
2. Define request/response DTOs in `dto/` package
3. Add service logic if needed
4. Update security configuration if endpoint requires authentication

### Database Changes

Since using H2 in-memory database:
- Data is reset on application restart
- Schema is auto-generated from JPA entities
- For persistent data, switch to PostgreSQL/MySQL

## 📝 Notes

- This is a practice/testing application
- Security endpoints are intentionally vulnerable for testing
- H2 database data is not persisted between restarts
- Uploaded files are stored in memory or temporary directory

## 🤝 Contributing

This is an educational project. Feel free to extend with additional features and testing scenarios.
