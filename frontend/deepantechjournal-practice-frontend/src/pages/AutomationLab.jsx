import { useState } from "react";

export default function AutomationLab() {
  const [lastKey, setLastKey] = useState("");
  const [shortcutFired, setShortcutFired] = useState(false);
  const [dragStatus, setDragStatus] = useState("Drop zone empty");
  const [sliderValue, setSliderValue] = useState(50);

  // Form State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    country: "",
    comments: "",
  });
  const [formMessage, setFormMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const newInterests = checked
          ? [...prev.interests, value]
          : prev.interests.filter((i) => i !== value);
        return { ...prev, interests: newInterests };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    setFormMessage(JSON.stringify(formData, null, 2));
    alert("Form Submitted successfully! Check the message below buttons.");
  };

  const handleReset = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      gender: "",
      interests: [],
      country: "",
      comments: "",
    });
    setFormMessage("");
  };

  const handleKeyDown = (e) => {
    setLastKey(`${e.key} (code: ${e.code})`);
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setShortcutFired(true);
      setTimeout(() => setShortcutFired(false), 1500);
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "CARD");
    setDragStatus("Dragging card…");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data === "CARD") {
      setDragStatus("Card dropped ✅");
    } else {
      setDragStatus("Unknown item dropped");
    }
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold mb-2">🧪 Automation Lab</h1>
      <p className="text-slate-600 mb-4">
        Practice locators, waits, keyboard/mouse actions, broken links, images & more.
      </p>

      {/* Broken links & images */}
      <section className="bg-white rounded-2xl shadow p-5 space-y-3">
        <h2 className="text-xl font-semibold">🔗 Broken Links & Images</h2>
        <p className="text-sm text-slate-600">
          Use this section to write scripts that detect broken links & images.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div>
            <h3 className="font-medium mb-2">Links</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noreferrer"
                  data-test="valid-link"
                >
                  Valid Link – Google
                </a>
              </li>
              <li>
                <a
                  href="https://httpstat.us/404"
                  target="_blank"
                  rel="noreferrer"
                  data-test="broken-link"
                >
                  Broken Link – 404
                </a>
              </li>
              <li>
                <a
                  href="/non-existing-page"
                  data-test="relative-broken-link"
                >
                  Broken Relative Link
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Images</h3>
            <div className="flex gap-4">
              <div className="text-xs">
                <p className="mb-1">✅ Valid Image</p>
                <img
                  src="https://picsum.photos/120/80"
                  alt="valid"
                  data-test="valid-image"
                  className="border rounded-md"
                />
              </div>
              <div className="text-xs">
                <p className="mb-1">❌ Broken Image</p>
                <img
                  src="/images/this-does-not-exist.png"
                  alt="broken"
                  data-test="broken-image"
                  className="border rounded-md"
                  onError={(e) => {
                    e.target.classList.add("opacity-40");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locator practice */}
      <section className="bg-white rounded-2xl shadow p-5 space-y-4">
        <h2 className="text-xl font-semibold">🎯 Locator Practice – Elements</h2>
        <p className="text-sm text-slate-600">
          Practice ID, name, CSS, XPath, data-test, role, text, etc.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="lp-username"
                className="block text-xs font-semibold text-slate-600"
              >
                Username (id, name)
              </label>
              <input
                id="lp-username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="locator_user"
                className="w-full border rounded px-3 py-2"
                data-test="input-username"
              />
            </div>

            <div>
              <label
                htmlFor="lp-email"
                className="block text-xs font-semibold text-slate-600"
              >
                Email (CSS by attribute)
              </label>
              <input
                id="lp-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="user@example.com"
                className="w-full border rounded px-3 py-2"
                data-test="input-email"
              />
            </div>

            <div>
              <label
                htmlFor="lp-password"
                className="block text-xs font-semibold text-slate-600"
              >
                Password (type=password)
              </label>
              <input
                id="lp-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                data-test="input-password"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Gender (radio)
              </label>
              <div className="space-x-4 text-sm">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                    data-test="radio-male"
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                    data-test="radio-female"
                  />{" "}
                  Female
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Interests (checkbox)
              </label>
              <div className="space-x-4 text-sm">
                <label>
                  <input
                    type="checkbox"
                    name="interests"
                    value="selenium"
                    checked={formData.interests.includes("selenium")}
                    onChange={handleInputChange}
                    data-test="chk-selenium"
                  />{" "}
                  Selenium
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="interests"
                    value="playwright"
                    checked={formData.interests.includes("playwright")}
                    onChange={handleInputChange}
                    data-test="chk-playwright"
                  />{" "}
                  Playwright
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="lp-country"
                className="block text-xs font-semibold text-slate-600"
              >
                Country (select)
              </label>
              <select
                id="lp-country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                data-test="select-country"
              >
                <option value="">-- Choose --</option>
                <option value="IN">India</option>
                <option value="US">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="lp-comments"
                className="block text-xs font-semibold text-slate-600"
              >
                Comments (textarea)
              </label>
              <textarea
                id="lp-comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                rows={3}
                data-test="textarea-comments"
              />
            </div>

            <div className="flex gap-3">
              <button
                id="btn-submit-form"
                onClick={handleSubmit}
                className="bg-slate-900 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 transition"
                data-test="btn-submit"
              >
                Submit Form
              </button>
              <button
                onClick={handleReset}
                className="border border-slate-400 text-slate-700 px-4 py-2 rounded text-sm hover:bg-slate-100 transition"
                data-test="btn-reset"
              >
                Reset
              </button>
              <button
                onClick={() => alert("Link styled as button clicked!")}
                className="text-blue-600 text-sm underline hover:text-blue-800"
                data-test="link-as-button"
              >
                Link Styled as Button
              </button>
            </div>

            {formMessage && (
              <div className="mt-4 p-4 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200" data-test="submit-message">
                <strong>Form Submitted!</strong>
                <pre className="text-xs mt-2 overflow-auto">{formMessage}</pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Keyboard */}
      <section className="bg-white rounded-2xl shadow p-5 space-y-3">
        <h2 className="text-xl font-semibold">⌨ Keyboard Actions Lab</h2>
        <div className="grid md:grid-cols-2 gap-4 items-start">
          <div>
            <label
              htmlFor="kb-input"
              className="block text-xs font-semibold text-slate-600 mb-1"
            >
              Type here (supports Ctrl+K shortcut)
            </label>
            <input
              id="kb-input"
              data-test="kb-input"
              onKeyDown={handleKeyDown}
              className="w-full border rounded px-3 py-2"
              placeholder="Try typing & press Ctrl+K"
            />
            <p className="mt-2 text-xs text-slate-500">
              Last key:{" "}
              <span data-test="kb-last-key" className="font-mono">
                {lastKey || "none"}
              </span>
            </p>
          </div>
          <div className="text-sm">
            <p className="font-medium mb-1">Shortcut to test:</p>
            <ul className="list-disc list-inside text-xs text-slate-600">
              <li>Press <b>Ctrl + K</b> inside the input</li>
              <li>Verify UI reacts (banner visible)</li>
            </ul>
            {shortcutFired && (
              <div
                data-test="kb-shortcut-banner"
                className="mt-3 bg-emerald-100 text-emerald-700 px-3 py-2 rounded text-xs"
              >
                Ctrl+K shortcut detected 🎉
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mouse Actions */}
      <section className="bg-white rounded-2xl shadow p-5 space-y-3">
        <h2 className="text-xl font-semibold">🖱 Mouse Actions Lab</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative">
            <div
              className="border rounded-xl p-4 hover:bg-slate-900 hover:text-white transition cursor-pointer"
              data-test="hover-card"
            >
              Hover over this card
            </div>
          </div>

          <div>
            <div
              className="inline-block bg-slate-900 text-white px-3 py-1 rounded mb-3 cursor-move"
              draggable
              onDragStart={handleDragStart}
              data-test="drag-card"
            >
              Drag Me
            </div>
            <div
              className="border-2 border-dashed border-slate-300 rounded-xl h-24 flex items-center justify-center text-xs text-slate-500"
              onDrop={handleDrop}
              onDragOver={allowDrop}
              data-test="drop-zone"
            >
              Drop zone
            </div>
            <p className="mt-2 text-xs text-slate-600" data-test="drop-status">
              {dragStatus}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="mouse-slider"
                className="block text-xs font-semibold text-slate-600 mb-1"
              >
                Slider (range)
              </label>
              <input
                id="mouse-slider"
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                data-test="range-slider"
                className="w-full"
              />
              <p className="text-xs mt-1">
                Current value:{" "}
                <span data-test="range-value" className="font-mono">
                  {sliderValue}
                </span>
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold mb-1">SVG Like Button</p>
              <button
                data-test="svg-like-button"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border"
                onClick={() => alert("SVG Like clicked")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-label="like-icon"
                >
                  <path
                    d="M12 21s-5-3.3-8-7.1C2 11.4 2 8.5 4 6.5 5.5 5 7.8 5 9.3 6.5L12 9.2l2.7-2.7C16.2 5 18.5 5 20 6.5c2 2 2 4.9 0 7.4C17 17.7 12 21 12 21z"
                    fill="#2563eb"
                  />
                </svg>
                <span className="text-xs">SVG Like</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
