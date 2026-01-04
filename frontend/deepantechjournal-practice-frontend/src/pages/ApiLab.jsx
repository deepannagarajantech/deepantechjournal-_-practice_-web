import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ApiLab() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("No authentication token found. Please Login first.");
            }
            const res = await axios.get("http://localhost:8080/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setResponse(res.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">🔌 API Testing Lab</h1>
                <p className="text-slate-600 mt-2">
                    Practice REST API automation using tools like RestAssured, Postman, or
                    K6.
                </p>
            </header>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-semibold mb-4 text-slate-900">
                    Swagger Documentation
                </h2>
                <p className="text-slate-600 mb-4 text-sm">
                    Access the full API documentation via Swagger UI. This is your primary
                    reference for endpoints, request bodies, and auth schemes.
                </p>

                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">How to use Swagger:</h3>
                    <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                        <li>Login to this app first (to generate a token).</li>
                        <li>Copy the token below.</li>
                        <li>Click <b>Open Swagger UI</b>.</li>
                        <li>Click the green <b>Authorize</b> button in Swagger.</li>
                        <li>Paste your token (prefixed with Bearer) and click Authorize.</li>
                    </ol>

                    <div className="mt-4">
                        {localStorage.getItem("authToken") ? (
                            <div className="flex items-center gap-3">
                                <code className="bg-white px-3 py-2 rounded border text-xs text-slate-600 flex-1 truncate">
                                    Bearer {localStorage.getItem("authToken")}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(`Bearer ${localStorage.getItem("authToken")}`);
                                        alert("Token copied! Now paste it in Swagger's Authorize box.");
                                    }}
                                    className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition"
                                >
                                    Copy Token
                                </button>
                            </div>
                        ) : (
                            <div className="text-sm text-red-600 mt-2">
                                You are not logged in. <Link to="/login" className="underline font-bold">Login here</Link> to get a token.
                            </div>
                        )}
                    </div>
                </div>

                <a
                    href="http://localhost:8080/swagger-ui.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Open Swagger UI ↗
                </a>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-semibold mb-4 text-slate-900">
                    Quick Fetch Test
                </h2>
                <p className="text-sm text-slate-600 mb-4">
                    Test the <code>GET /api/products</code> endpoint right here to verify
                    server connectivity and auth token.
                </p>

                <button
                    onClick={fetchProducts}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition mb-4"
                >
                    {loading ? "Fetching..." : "Fetch Products"}
                </button>

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm font-mono border border-red-200 flex items-center justify-between">
                        <span>{typeof error === 'object' ? JSON.stringify(error) : error}</span>
                        {error && error.toString().includes("Login") && (
                            <Link to="/login" className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                                Login Now
                            </Link>
                        )}
                    </div>
                )}

                {response && (
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-auto max-h-96 border border-slate-700">
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-semibold mb-4 text-slate-900">
                    Load Testing
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Using JMeter</h3>
                        <p className="text-sm text-slate-600 mb-2">
                            A pre-configured JMeter test plan is available in the backend project.
                        </p>
                        <div className="bg-slate-50 p-3 rounded border text-xs font-mono text-slate-700">
                            backend/jmeter/jmeter_products.jmx
                        </div>
                        <p className="text-sm text-slate-600 mt-2">
                            Update <code>Bearer TOKEN</code> in the HTTP Header Manager inside JMeter before running.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Using K6</h3>
                        <p className="text-sm text-slate-600 mb-2">
                            Run a simple load test with K6. Save this as <code>load.js</code>:
                        </p>
                        <pre className="bg-slate-900 text-green-400 p-3 rounded text-xs font-mono overflow-auto">
                            {`import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:8080/api/products';
  // Replace YOUR_TOKEN below
  const params = {
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
    },
  };
  const res = http.get(url, params);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}`}
                        </pre>
                    </div>
                </div>
            </section>
        </div>
    );
}
