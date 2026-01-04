import { Link } from "react-router-dom";

export default function PlaygroundPage() {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Automation Playground</h2>
        <p className="text-slate-600 mt-2">
          Explore dedicated labs to practice different facets of test automation.
          From API validation to Security testing, everything is running locally.
        </p>
      </header>

      <section className="mb-10">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Core Practice Labs</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/lab/api" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 transition group hover:-translate-y-1">
            <div className="text-4xl mb-3 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-full group-hover:bg-blue-100 transition">🔌</div>
            <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition">API Testing Lab</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Practice API automation with <b>RestAssured</b> or <b>Postman</b>.
              Includes Swagger documentation, JWT Auth flows, and Load Testing examples.
            </p>
          </Link>

          <Link to="/lab/db" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 transition group hover:-translate-y-1">
            <div className="text-4xl mb-3 bg-indigo-50 w-16 h-16 flex items-center justify-center rounded-full group-hover:bg-indigo-100 transition">🗄️</div>
            <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition">Database Lab</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Execute raw SQL queries against the H2 database. Validate schema integrity,
              practice data verification, and learn about SQL injection defenses.
            </p>
          </Link>

          <Link to="/lab/security" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 transition group hover:-translate-y-1">
            <div className="text-4xl mb-3 bg-red-50 w-16 h-16 flex items-center justify-center rounded-full group-hover:bg-red-100 transition">🛡️</div>
            <h3 className="font-bold text-lg text-slate-800 group-hover:text-red-600 transition">Security Lab</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              A safe environment to demonstrate <b>XSS</b>, <b>SQL Injection</b>,
              and Rate Limiting attacks. Great for security testing practice.
            </p>
          </Link>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-2">SVG Button</h3>
        <button
          id="svg-btn-wrapper"
          onClick={() => alert("SVG button clicked")}
          className="inline-flex items-center space-x-2 border px-3 py-2 rounded"
        >
          <svg width="20" height="20">
            <circle cx="10" cy="10" r="8" fill="#0f172a" />
          </svg>
          <span>Click SVG Button</span>
        </button>
      </section>

      <section className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-2">Shadow DOM Card</h3>
        <shadow-card></shadow-card>
      </section>

      <section className="bg-white rounded-xl shadow p-4 space-x-2">
        <h3 className="font-semibold mb-2">Alerts &amp; Confirms</h3>
        <button
          onClick={() => alert("Simple Alert")}
          className="bg-slate-900 text-white px-3 py-1 rounded"
        >
          Show Alert
        </button>
        <button
          onClick={() => {
            const ok = window.confirm("Do you confirm?");
            console.log("Confirm:", ok);
          }}
          className="bg-slate-500 text-white px-3 py-1 rounded"
        >
          Show Confirm
        </button>
      </section>
    </div>
  );
}

if (!customElements.get("shadow-card")) {
  class ShadowCard extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
        <style>
          .card {
            padding: 12px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            font-family: system-ui, sans-serif;
          }
          .title { font-weight: 600; margin-bottom: 4px; }
          .button {
            padding: 4px 10px;
            border-radius: 9999px;
            background: #0f172a;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 12px;
          }
        </style>
        <div class="card">
          <div class="title">Shadow DOM Element</div>
          <div class="desc">Great for locator & Playwright/Selenium practice.</div>
          <button class="button" id="shadow-btn">Shadow Click</button>
        </div>
      `;
      const btn = root.querySelector("#shadow-btn");
      btn.addEventListener("click", () => alert("Shadow button clicked"));
    }
  }
  customElements.define("shadow-card", ShadowCard);
}
