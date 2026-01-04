import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function DbLab() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sql, setSql] = useState("SELECT * FROM users");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const executeSql = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.post(
                "http://localhost:8080/api/debug/db/execute",
                { sql },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResult(res.data);
        } catch (err) {
            if (err.response && (err.response.status === 403 || err.response.status === 401)) {
                setError("Session expired or invalid (Server restarted). Please Logout and Login again.");
            } else {
                setError(err.response?.data?.error || err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Authentication Required</h2>
                <p className="text-slate-600 mb-6">
                    You must be logged in to access the Database Lab.
                </p>
                <Link
                    to="/login"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Login to Continue
                </Link>
            </div>
        );
    }

    if (user.role !== "ADMIN") {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
                <p className="text-slate-600">
                    Only ADMIN users can access the Database Lab.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">🗄️ Database Lab</h1>
                <p className="text-slate-600 mt-2">
                    Practice Database Testing. Validate data integrity, schema verify, and
                    practice SQL injection defense (safe mode).
                </p>
            </header>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold mb-2">Schema Reference</h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                    <div className="p-3 bg-slate-50 rounded border">
                        <h3 className="font-bold text-slate-800 mb-1">users</h3>
                        <p>id (int), username (varchar), email (varchar), role (varchar)</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border">
                        <h3 className="font-bold text-slate-800 mb-1">products</h3>
                        <p>id (int), name (varchar), price (double), description (text)</p>
                    </div>
                </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold mb-3">SQL Playground</h2>
                <textarea
                    className="w-full h-32 p-4 font-mono text-sm bg-slate-900 text-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sql}
                    onChange={(e) => setSql(e.target.value)}
                    spellCheck="false"
                />
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={executeSql}
                        disabled={loading}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium transition"
                    >
                        {loading ? "Running..." : "Run Query"}
                    </button>
                </div>
            </section>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg font-mono text-sm flex items-center justify-between">
                    <div>
                        <strong>Error:</strong> {error}
                    </div>
                    {error.includes("Session expired") && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition shadow ml-4"
                        >
                            Logout Now
                        </button>
                    )}
                </div>
            )}

            {result && (
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                        Query Results
                    </h3>
                    {Array.isArray(result) ? (
                        result.length > 0 ? (
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-700 font-semibold">
                                    <tr>
                                        {Object.keys(result[0]).map((key) => (
                                            <th key={key} className="px-4 py-3 border-b">
                                                {key}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {result.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50">
                                            {Object.values(row).map((val, j) => (
                                                <td key={j} className="px-4 py-3 text-slate-600">
                                                    {String(val)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-slate-500 italic">No rows returned.</p>
                        )
                    ) : (
                        <div className="bg-green-50 text-green-800 p-3 rounded font-mono">
                            {JSON.stringify(result, null, 2)}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}
