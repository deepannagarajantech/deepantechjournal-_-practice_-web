import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function SecurityLab() {
    const [activeTab, setActiveTab] = useState("xss");

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">🛡️ Security Lab</h1>
                <p className="text-slate-600 mt-2">
                    Safe environment to practice OWASP Top 10 vulnerabilities like XSS, SQLi, and more.
                </p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-200">
                    {["xss", "sqli", "ratelimit", "csrf"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-4 text-sm font-medium transition ${activeTab === tab
                                    ? "bg-slate-50 text-blue-600 border-b-2 border-blue-600"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            {tab === "xss" && "XSS Reflected"}
                            {tab === "sqli" && "SQL Injection"}
                            {tab === "ratelimit" && "Rate Limiting"}
                            {tab === "csrf" && "CSRF"}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {activeTab === "xss" && <XssTab />}
                    {activeTab === "sqli" && <SqliTab />}
                    {activeTab === "ratelimit" && <RateLimitTab />}
                    {activeTab === "csrf" && <CsrfTab />}
                </div>
            </div>
        </div>
    );
}

function XssTab() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const testXss = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/security/xss-test", { text: input });
            setResponse(res.data.received);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Reflected XSS</h3>
            <p className="text-sm text-slate-600">
                The server reflects input without sanitization. Try injecting a script tag:
                <code className="bg-slate-100 px-1 rounded ml-1">&lt;script&gt;alert(1)&lt;/script&gt;</code>
            </p>
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border p-2 rounded"
                    placeholder="Enter text..."
                />
                <button onClick={testXss} className="bg-blue-600 text-white px-4 py-2 rounded">Test</button>
            </div>
            {response && (
                <div className="mt-4 p-4 border bg-yellow-50 rounded">
                    <p className="text-xs text-slate-500 mb-1">Rendered Output:</p>
                    <div dangerouslySetInnerHTML={{ __html: response }} />
                </div>
            )}
        </div>
    );
}

function SqliTab() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);

    const testSqli = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/security/sql-test", { query });
            setResult(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">SQL Injection</h3>
            <p className="text-sm text-slate-600">
                Simulated vulnerable parameter. Try bypassing logic with
                <code className="bg-slate-100 px-1 rounded ml-1">' OR '1'='1</code>
            </p>
            <div className="flex gap-2">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border p-2 rounded"
                    placeholder="Enter search term..."
                />
                <button onClick={testSqli} className="bg-red-600 text-white px-4 py-2 rounded">Check</button>
            </div>
            {result && (
                <div className="mt-4 bg-slate-900 p-4 rounded text-green-400 font-mono text-sm">
                    {JSON.stringify(result, null, 2)}
                </div>
            )}
        </div>
    );
}

function RateLimitTab() {
    const [status, setStatus] = useState(null);
    const [count, setCount] = useState(0);

    const hitEndpoint = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/security/rate-limit");
            setStatus(res.data);
            setCount(c => c + 1);
        } catch (err) {
            setStatus(err.response?.data);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">API Rate Limiting</h3>
            <p className="text-sm text-slate-600">
                This endpoint allows 5 requests per server restart/session. Spam the button to trigger 429.
            </p>
            <button onClick={hitEndpoint} className="bg-orange-600 text-white px-6 py-2 rounded">
                Hit Endpoint (Clicks: {count})
            </button>
            {status && (
                <div className="mt-4 bg-slate-100 p-4 rounded text-sm font-mono">
                    {JSON.stringify(status, null, 2)}
                </div>
            )}
        </div>
    );
}

function CsrfTab() {
    const { user } = useAuth();

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">CSRF (Cross-Site Request Forgery)</h3>
            <p className="text-sm text-slate-600">
                This application uses stateless JWT authentication, which is generally immune to CSRF if tokens are not stored in cookies.
                However, if you store tokens in cookies without `SameSite` attributes, you are vulnerable.
            </p>
            <div className="bg-blue-50 p-4 rounded text-blue-800 text-sm">
                <strong>Current Status:</strong> {user ? "Authenticated via JWT header" : "Not Logged In"} <br />
                CSRF attacks typically require session enforcement via cookies.
            </div>
        </div>
    );
}
