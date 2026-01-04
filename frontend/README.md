# DeepanTechJournal Practice Web – Frontend

A modern **React-based frontend** built for practicing **UI automation, API testing, and full-stack testing workflows**.
This frontend works together with the Spring Boot backend to form a complete automation testing playground.

---

## 🚀 Overview

The frontend application provides:

* Interactive UI labs for automation practice
* Authentication-based navigation
* Admin & user flows
* Realistic DOM structures for Selenium, Playwright, and Cypress testing

Built using **React 18 + Vite + Tailwind CSS** for speed, simplicity, and scalability.

---

## 🧱 Technology Stack

* **React 18**
* **Vite 5**
* **Tailwind CSS 3**
* **React Router v6**
* **Axios**
* **JWT-based authentication**
* **Modern ES6+ JavaScript**

---

## 📋 Prerequisites

* Node.js **16+**
* npm **8+**
* Backend service running (Spring Boot)

---

## 🏃 Getting Started

### 1️⃣ Navigate to Frontend Folder

```bash
cd frontend/deepantechjournal-practice-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

* App URL: **[http://localhost:5173](http://localhost:5173)**
* Backend should be running on: **[http://localhost:8080](http://localhost:8080)**

---

## 🔐 Authentication Flow

* User registration & login
* JWT stored securely
* Protected routes using React Router
* Role-based UI rendering (Admin / User)

---

## ✨ Key UI Modules

### 🏠 Dashboard

* Central navigation hub
* Quick access to all testing labs

---

### 🎯 AutomationLab

UI elements for automation practice:

* Inputs, buttons, checkboxes
* Radio buttons
* Dropdowns & multi-select
* Date pickers & sliders
* Drag & drop
* Dynamic elements

---

### 🔬 AdvancedUiLab

Advanced automation challenges:

* Shadow DOM
* iFrames
* Nested DOM elements
* Keyboard shortcuts
* Mouse hover interactions
* Context menus

---

### 🎯 LocatorLab (Core Learning Module)

Dedicated playground for **XPath & CSS selector mastery**

**Includes:**

* 100+ uniquely structured elements
* Deep DOM nesting
* Tables, forms, SVGs
* Dynamic IDs & visibility toggles
* `data-testid` & automation-friendly attributes

**Ideal for:**

* Selenium
* Playwright
* Cypress

---

### 🌐 ApiLab

* Trigger API calls from UI
* Inspect responses
* Validate auth & error handling

---

### 🗄️ DbLab

* View backend database records
* Validate UI vs DB data consistency

---

### 🔒 SecurityLab

Safe environment to:

* Test XSS scenarios
* Observe SQL injection attempts
* Validate frontend security handling

---

## 🛠 Admin Features

* Product management UI
* Bulk upload (CSV / Excel)
* Image upload with preview
* Role-based access control

---

## 📁 Project Structure

```
src/
├── api/                # Axios API clients
├── components/         # Reusable UI components
├── context/            # Auth context & providers
├── pages/              # Page-level components
├── routes/             # Protected & public routes
├── utils/              # Helpers & constants
├── App.jsx             # App entry
└── main.jsx            # Vite bootstrap
```

---

## 🧪 Automation-Friendly Design

This frontend is intentionally built with:

* Stable locators
* Predictable DOM patterns
* Dynamic & edge-case elements
* Real-world UI complexity

Perfect for:

* Framework building
* Interview prep
* Automation demos
* Practice labs

---

## 🔗 Backend Dependency

This frontend depends on the backend running at:

```
http://localhost:8080
```

Make sure backend services are started before using protected features.

---

## 🚧 Status

🟡 Actively evolving
🧪 Built for learning, experimentation, and automation mastery

---
