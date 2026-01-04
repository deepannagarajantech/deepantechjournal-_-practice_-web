# Automation Practice Roadmap & Guide

Welcome to the **TestCraft Hub** practice roadmap. This guide outlines how to use this application to master your automation skills across Web UI, API, Database, and Security testing.

## 1. Web UI Automation (Selenium / Playwright)
**Goal:** Master locators, synchronization, and complex interactions.

### Beginner
- **Login/Register**: Practice handling inputs, buttons, and form submission.
- **Products Page**: Practice iterating over lists/tables, extracting text, and clicking dynamic elements.

### Intermediate (Automation Lab)
- **Form Controls**: Checkboxes, radio buttons, dropdowns.
- **Waits**: Handle hidden elements, delayed text appearance, and spinner verification.
- **Alerts**: Handle JS alerts and confirmation dialogs.

### Advanced (Advanced UI Lab)
- **Shadow DOM**: Use specific locators (e.g., `shadow-root`) to access encapsulated elements.
- **IFrames**: Switch context to interact with elements inside frames.
- **Drag & Drop**: Simulate complex mouse actions.
- **Custom Components**: Interact with non-standard dropdowns (div-based) and sliders.

---

## 2. API Automation (RestAssured / Postman)
**Goal:** Verify JSON responses, status codes, and auth headers.

### Labs
- Visit `http://localhost:8080/swagger-ui.html` for full specs.
- **Endpoints**:
    - `GET /api/products`: Public, returns list. Verify JSON schema.
    - `POST /api/auth/login`: Returns JWT. Extract `token` for subsequent calls.
    - `POST /api/products`: Admin only. Requires `Authorization: Bearer <token>`.

### Challenges
1. **Auth Flow**: Write a script to login, get token, and then fetch user details (`/api/auth/me`).
2. **Schema Validation**: Verify that every product has an `id`, `name`, and `price`.
3. **Negative Testing**: Send invalid token and verify 403 Forbidden.

---

## 3. Database Testing (JDBC / SQL)
**Goal:** Verify data integrity and backend logic.

### Labs
- Use **DB Lab** (Admin only) to execute queries.
- **Tables**: `users`, `products`.

### Challenges
1. **Data Verification**: Create a user via UI, then query `SELECT * FROM users WHERE username='...'` to verify insertion.
2. **State Validation**: Update a product price via API, then verify the change in DB.
3. **Cleanup**: Write a script to delete test data after execution.

---

## 4. Security Testing (DAST)
**Goal:** Identify common vulnerabilities (OWASP Top 10).

### Labs
- **XSS (Reflected)**: Enter `<script>alert('pwned')</script>` in the XSS Lab. If valid, the alert pops up.
- **SQL Injection**: Try `' OR '1'='1` in the SQLi Lab. See if it bypasses logic or dumps data.
- **Rate Limiting**: Fire 10+ requests rapidly to the Rate Limit endpoint. Verify `429 Too Many Requests`.

---

## Recommended Tools
- **UI**: Selenium WebDriver, Playwright, Cypress.
- **API**: RestAssured (Java), Supertest (JS), Postman.
- **Load**: JMeter, K6.
- **Security**: OWASP ZAP, Burp Suite.

Happy Testing! 🚀
