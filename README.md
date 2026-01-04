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

#### 🎯 LocatorLab (NEW!)
Comprehensive locator practice playground for Selenium and Playwright:

**XPath Practice:**
- **Axes**: child, parent, ancestor, descendant, following, preceding, siblings
- **Functions**: text(), contains(), starts-with(), normalize-space(), concat(), substring(), string-length(), count(), position(), last()
- **Predicates**: Attribute predicates, index predicates, multiple conditions, NOT conditions

**CSS Selector Practice:**
- ID selectors (`#id`)
- Class selectors (`.class`)
- Attribute selectors (`[attr='value']`, `[attr^='prefix']`, `[attr$='suffix']`, `[attr*='contains']`)
- Pseudo-classes (`:first-child`, `:last-child`, `:nth-child()`, `:not()`)
- Combinators (descendant, child `>`, adjacent sibling `+`, general sibling `~`)

**Practice Elements:**
- Complex DOM structures (5-level nesting)
- Table navigation (headers, rows, cells)
- Form elements (all input types, radio, checkbox, select)
- SVG elements with nested structures
- Dynamic elements (changing IDs, toggleable visibility)
- Data attributes (`data-testid`, `data-automation-id`)
- Shadow DOM elements

**Features:**
- 11 dedicated practice sections
- 100+ elements with various attributes
- Inline XPath and CSS examples
- Code snippets for Selenium and Playwright
- Quick reference cheat sheet
- Best practices guide

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

### 🎯 Locator Practice Lab - Quick Start Guide

The **Locator Lab** (`http://localhost:5173/lab/locators`) provides comprehensive practice for mastering locator strategies.

#### For Selenium Users

**XPath Examples:**
```java
// XPath Axes - Navigate DOM hierarchy
WebElement parent = driver.findElement(By.xpath("//div[@id='child-1-1']/parent::div"));
WebElement grandparent = driver.findElement(By.xpath("//div[@id='child-1-1']/ancestor::div[@class='grandparent']"));
WebElement nextSibling = driver.findElement(By.xpath("//div[@id='child-1-1']/following-sibling::div"));

// XPath Functions - Text and attribute matching
WebElement exactText = driver.findElement(By.xpath("//button[text()='Click Me']"));
WebElement partialText = driver.findElement(By.xpath("//button[contains(text(),'Submit')]"));
WebElement normalized = driver.findElement(By.xpath("//button[normalize-space()='Normalize Space']"));
WebElement startsWithId = driver.findElement(By.xpath("//button[starts-with(@id,'dynamic-btn-')]"));

// XPath Predicates - Complex conditions
WebElement firstInput = driver.findElement(By.xpath("//input[@data-automation='input-field'][1]"));
WebElement lastInput = driver.findElement(By.xpath("//input[@data-automation='input-field'][last()]"));
WebElement notDisabled = driver.findElement(By.xpath("//button[not(@disabled)]"));
WebElement multiCondition = driver.findElement(By.xpath("//button[@data-action='submit' and @data-priority='high']"));

// Table Navigation
WebElement tableCell = driver.findElement(By.xpath("//tr[@data-row-id='2']/td[@data-cell='name']"));
WebElement rowByText = driver.findElement(By.xpath("//td[text()='Alice Johnson']/parent::tr"));
WebElement activeRow = driver.findElement(By.xpath("//span[text()='Active']/ancestor::tr"));

// SVG Elements
WebElement svgIcon = driver.findElement(By.xpath("//*[name()='svg'][@data-icon='heart']"));
WebElement svgPath = driver.findElement(By.xpath("//*[name()='path'][@data-svg-part='heart-path']"));

// Dynamic Elements - Use stable attributes
WebElement dynamicBtn = driver.findElement(By.xpath("//button[@data-testid='dynamic-button']"));
WebElement partialId = driver.findElement(By.xpath("//button[starts-with(@id,'dynamic-btn-')]"));
```

**CSS Selector Examples:**
```java
// Basic Selectors
WebElement byId = driver.findElement(By.cssSelector("#css-root"));
WebElement byClass = driver.findElement(By.cssSelector(".primary-box"));

// Attribute Selectors
WebElement attrEquals = driver.findElement(By.cssSelector("[data-category='important']"));
WebElement attrStartsWith = driver.findElement(By.cssSelector("[data-priority^='h']"));
WebElement attrEndsWith = driver.findElement(By.cssSelector("[data-priority$='gh']"));
WebElement attrContains = driver.findElement(By.cssSelector("[data-category*='opt']"));

// Pseudo-classes
WebElement firstChild = driver.findElement(By.cssSelector(".box:first-child"));
WebElement lastChild = driver.findElement(By.cssSelector(".box:last-child"));
WebElement nthChild = driver.findElement(By.cssSelector(".box:nth-child(2)"));
WebElement notPassword = driver.findElement(By.cssSelector("input:not([type='password'])"));

// Combinators
WebElement directChild = driver.findElement(By.cssSelector("#css-root > .box"));
WebElement adjacentSibling = driver.findElement(By.cssSelector(".box + .box"));
WebElement generalSibling = driver.findElement(By.cssSelector(".primary-box ~ .box"));

// Data Attributes - Best Practice
WebElement testId = driver.findElement(By.cssSelector("[data-testid='submit-btn']"));
WebElement automationId = driver.findElement(By.cssSelector("[data-automation-id='auto-cancel']"));
```

#### For Playwright Users

**XPath Examples:**
```javascript
// XPath Axes
const parent = await page.locator("//div[@id='child-1-1']/parent::div");
const grandparent = await page.locator("//div[@id='child-1-1']/ancestor::div[@class='grandparent']");

// XPath Functions
const exactText = await page.locator("//button[text()='Click Me']");
const partialText = await page.locator("//button[contains(text(),'Submit')]");
const normalized = await page.locator("//button[normalize-space()='Normalize Space']");

// Table Navigation
const tableCell = await page.locator("//tr[@data-row-id='2']/td[@data-cell='name']");
const rowByText = await page.locator("//td[text()='Alice Johnson']/parent::tr");

// Dynamic Elements
const dynamicBtn = await page.locator("[data-testid='dynamic-button']");
const partialId = await page.locator("button[id^='dynamic-btn-']");
```

**CSS Selector Examples:**
```javascript
// Basic Selectors
const byId = await page.locator("#css-root");
const byClass = await page.locator(".primary-box");

// Attribute Selectors
const attrEquals = await page.locator("[data-category='important']");
const attrStartsWith = await page.locator("[data-priority^='h']");
const attrContains = await page.locator("[data-category*='opt']");

// Pseudo-classes and Combinators
const firstChild = await page.locator(".box:first-child");
const directChild = await page.locator("#css-root > .box");

// Data Attributes - Recommended
const testId = await page.locator("[data-testid='submit-btn']");
```

#### Testing Locators in Browser DevTools

**Test XPath:**
```javascript
// In browser console
$x("//button[text()='Click Me']")
$x("//tr[@data-row-id='2']/td[@data-cell='name']")
```

**Test CSS:**
```javascript
// In browser console
$$("button[data-testid='submit-btn']")
$$(".box:first-child")
```

#### Best Practices for Locators

✅ **DO:**
- Use `data-testid` or `data-automation-id` for stable locators
- Prefer ID over XPath when available
- Use CSS selectors for better performance
- Combine multiple attributes for uniqueness
- Test locators in DevTools before coding
- Keep locators simple and readable

❌ **DON'T:**
- Use absolute XPath paths (e.g., `/html/body/div[1]/div[2]`)
- Rely on index-based selection unless necessary
- Use overly complex locators
- Depend on text that might change with localization
- Use fragile selectors that break with UI changes

## 📝 Default Credentials

For testing purposes, you can register a new user or use default credentials if seeded.

## 🤝 Contributing

This is a practice project for automation testing. Feel free to extend it with additional testing scenarios.

## 📄 License

This project is for educational and practice purposes.
