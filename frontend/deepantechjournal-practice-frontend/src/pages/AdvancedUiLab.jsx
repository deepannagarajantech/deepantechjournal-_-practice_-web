import { useEffect, useMemo, useState } from "react";
import { useCallback } from "react";

const MOCK_USERS = Array.from({ length: 35 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Tester" : "Developer",
  country: ["India", "USA", "UK", "Germany"][i % 4],
}));

const AUTOCOMPLETE_ITEMS = [
  "Selenium",
  "Playwright",
  "Cypress",
  "Appium",
  "RestAssured",
  "Postman",
  "K6",
  "JMeter",
  "Docker",
  "Kubernetes",
];

export default function AdvancedUiLab() {
  const [envOpen, setEnvOpen] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState("QA");
  const [toasts, setToasts] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredAuto = useMemo(() => {
    if (!search.trim()) return [];
    return AUTOCOMPLETE_ITEMS.filter((x) =>
      x.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tableData.slice(start, start + pageSize);
  }, [page, pageSize, tableData]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(tableData.length / pageSize)),
    [tableData, pageSize]
  );

  const triggerToast = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const loadTableData = useCallback(() => {
    setLoadingTable(true);
    setTimeout(() => {
      setTableData(MOCK_USERS);
      setLoadingTable(false);
      triggerToast("success", "User table loaded from mock API");
    }, 1200);
  }, [triggerToast]);

  useEffect(() => {
    loadTableData();
  }, [loadTableData]);

  const handleOtpChange = (idx, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[idx] = value;
    setOtp(next);
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const prev = document.getElementById(`otp-box-${idx - 1}`);
      prev?.focus();
    }
    if (e.key >= "0" && e.key <= "9" && idx < otp.length - 1) {
      setTimeout(() => {
        const next = document.getElementById(`otp-box-${idx + 1}`);
        next?.focus();
      }, 0);
    }
  };

  const otpValue = otp.join("");

  return (
    <div className="space-y-8">
      <div
        aria-live="polite"
        className="fixed top-4 right-4 space-y-2 z-50"
        data-test="toast-container"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded-lg shadow text-sm text-white ${t.type === "success"
              ? "bg-emerald-600"
              : t.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
              }`}
          >
            {t.message}
          </div>
        ))}
      </div>

      <header className="mb-4">
        <h1 className="text-3xl font-semibold text-slate-900">
          🧬 Advanced UI Lab – Tech Blue
        </h1>
        <p className="text-slate-600 mt-1 text-sm">
          Mixed patterns (Material-like, AntD-like, Bootstrap-like) for
          real-world automation training.
        </p>
      </header>

      {/* Custom dropdown + toasts */}
      <section className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          🌐 Environment Selector (Custom Dropdown)
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Not a native &lt;select&gt; – behaves like modern React dropdown
          components (MUI / AntD).
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative w-64" data-test="custom-dropdown">
            <button
              type="button"
              onClick={() => setEnvOpen((o) => !o)}
              className="w-full flex justify-between items-center px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-haspopup="listbox"
            >
              <span className="text-slate-800">
                {selectedEnv || "Select Environment"}
              </span>
              <span className="text-xs text-slate-500">
                {envOpen ? "▲" : "▼"}
              </span>
            </button>

            {envOpen && (
              <ul
                className="absolute mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-20 text-sm"
                role="listbox"
              >
                {["DEV", "QA", "STAGE", "PROD"].map((env) => (
                  <li
                    key={env}
                    role="option"
                    aria-selected={selectedEnv === env}
                    onClick={() => {
                      setSelectedEnv(env);
                      setEnvOpen(false);
                      triggerToast("info", `Environment set to ${env}`);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${selectedEnv === env ? "bg-blue-100 font-semibold" : ""
                      }`}
                    data-test={`dropdown-option-${env.toLowerCase()}`}
                  >
                    {env}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-blue-700 text-white text-sm shadow hover:bg-blue-800"
              onClick={() =>
                triggerToast("success", "Sample success notification")
              }
              data-test="btn-toast-success"
            >
              Show Success Toast
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm shadow hover:bg-red-700"
              onClick={() =>
                triggerToast("error", "Sample error notification")
              }
              data-test="btn-toast-error"
            >
              Show Error Toast
            </button>
          </div>
        </div>
      </section>

      {/* Table + loader + pagination */}
      <section className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              📊 Users Table (Pagination)
            </h2>
            <p className="text-sm text-slate-600">
              Simulates AntD-like data table with paging + async load.
            </p>
          </div>
          <button
            className="px-3 py-1.5 rounded-lg border border-blue-600 text-blue-700 text-xs hover:bg-blue-50"
            onClick={loadTableData}
            data-test="btn-reload-table"
          >
            Reload Data
          </button>
        </div>

        {loadingTable ? (
          <div className="flex items-center gap-2 text-sm text-slate-600 py-6">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span data-test="table-loader">Loading users…</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-3 py-2 text-left">ID</th>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Role</th>
                    <th className="px-3 py-2 text-left">Country</th>
                  </tr>
                </thead>
                <tbody data-test="user-table-body">
                  {pagedUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t border-slate-100 even:bg-slate-50/40"
                    >
                      <td className="px-3 py-2">{u.id}</td>
                      <td className="px-3 py-2">{u.name}</td>
                      <td className="px-3 py-2">{u.role}</td>
                      <td className="px-3 py-2">{u.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-slate-600">
              <span>
                Page{" "}
                <span data-test="table-page" className="font-semibold">
                  {page}
                </span>{" "}
                of {totalPages}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2 py-1 rounded border text-xs disabled:opacity-40"
                  data-test="btn-page-prev"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-2 py-1 rounded border text-xs disabled:opacity-40"
                  data-test="btn-page-next"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* OTP + autocomplete */}
      <section className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              🔐 OTP Input (4 digits)
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              Great for focus management, sendKeys, tab navigation.
            </p>
            <div className="flex gap-2" data-test="otp-container">
              {otp.map((val, idx) => (
                <input
                  key={idx}
                  id={`otp-box-${idx}`}
                  maxLength={1}
                  inputMode="numeric"
                  className="w-12 h-12 text-center border border-slate-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={val}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  data-test={`otp-box-${idx}`}
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-600">
              Entered OTP:{" "}
              <span className="font-mono" data-test="otp-value">
                {otpValue || "----"}
              </span>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              🔍 Autocomplete Search
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              Simulates typeahead components (MUI/AntD). Test debounce, list
              visibility, and click selection.
            </p>

            <div className="relative" data-test="autocomplete">
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search tools (Selenium, Playwright...)"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 150);
                }}
                data-test="autocomplete-input"
              />
              {showSuggestions && filteredAuto.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-md text-sm z-20">
                  {filteredAuto.map((item) => (
                    <li
                      key={item}
                      className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        setSearch(item);
                        setShowSuggestions(false);
                        triggerToast("info", `Selected: ${item}`);
                      }}
                      data-test={`autocomplete-option-${item.toLowerCase()}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {showSuggestions && filteredAuto.length === 0 && search && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-md text-xs text-slate-500 px-3 py-2">
                  No matches
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Elements: Drag & Drop, Slider, Tooltip, IFrame */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">🖱️ Drag & Drop</h2>
          <p className="text-sm text-slate-600 mb-4">
            Native HTML5 Drag and Drop. Drag items between the two boxes.
          </p>
          <div className="flex gap-4">
            <div
              className="flex-1 min-h-[150px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-2"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData("text");
                const el = document.getElementById(id);
                if (el && e.currentTarget !== el.parentNode) {
                  e.currentTarget.appendChild(el);
                  triggerToast("success", `Dropped ${el.innerText}`);
                }
              }}
              data-test="drop-zone-1"
            >
              <div id="drag-1" draggable="true" onDragStart={(e) => e.dataTransfer.setData("text", "drag-1")} className="bg-white p-2 mb-2 rounded shadow cursor-grab active:cursor-grabbing border border-slate-200">Item 1</div>
              <div id="drag-2" draggable="true" onDragStart={(e) => e.dataTransfer.setData("text", "drag-2")} className="bg-white p-2 mb-2 rounded shadow cursor-grab active:cursor-grabbing border border-slate-200">Item 2</div>
            </div>

            <div
              className="flex-1 min-h-[150px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-2"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData("text");
                const el = document.getElementById(id);
                if (el && e.currentTarget !== el.parentNode) {
                  e.currentTarget.appendChild(el);
                  triggerToast("success", `Dropped ${el.innerText}`);
                }
              }}
              data-test="drop-zone-2"
            >
              <div id="drag-3" draggable="true" onDragStart={(e) => e.dataTransfer.setData("text", "drag-3")} className="bg-white p-2 mb-2 rounded shadow cursor-grab active:cursor-grabbing border border-slate-200">Item 3</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">🎚️ Sliders & Tooltips</h2>
          <p className="text-sm text-slate-600 mb-4">
            Input range for sliders and hover effects for tooltips.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">Volume Control (0-100)</label>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              onChange={(e) => {
                const val = e.target.value;
                if (val % 20 === 0) triggerToast("info", `Volume: ${val}%`);
              }}
              data-test="range-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="bg-slate-800 text-white px-3 py-1 rounded text-sm">Hover Me</button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none" data-test="tooltip">
                I am a tooltip!
              </div>
            </div>
            <div className="relative group">
              <span className="text-blue-600 border-b border-dashed border-blue-600 cursor-help">Technical Term</span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-2 bg-white border shadow-lg rounded text-xs text-slate-600 opacity-0 group-hover:opacity-100 transition z-10 pointer-events-none">
                Explanation of the technical term goes here.
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">🖼️ Nested IFrame</h2>
        <p className="text-sm text-slate-600 mb-4">
          Practice switching contexts (`driver.switchTo().frame()`). The content inside is isolated.
        </p>
        <iframe
          srcDoc={`
                <html>
                   <body style="background:#f8fafc; font-family:sans-serif; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0;">
                       <h2 style="color:#0f172a;">I am inside an IFrame</h2>
                       <button onclick="alert('Clicked inside IFrame!')" style="background:#2563eb; color:white; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">Click Me</button>
                   </body>
                </html>
            `}
          title="Practice IFrame"
          className="w-full h-48 border-2 border-slate-200 rounded-xl"
          data-test="practice-iframe"
        ></iframe>
      </section>

    </div >
  );
}
