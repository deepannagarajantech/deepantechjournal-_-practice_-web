import { useState, useEffect } from "react";

export default function LocatorLab() {
    const [dynamicId, setDynamicId] = useState(1);
    const [showDynamic, setShowDynamic] = useState(true);
    const [tableData] = useState([
        { id: 1, name: "Alice Johnson", role: "QA Engineer", status: "Active" },
        { id: 2, name: "Bob Smith", role: "Developer", status: "Inactive" },
        { id: 3, name: "Charlie Brown", role: "Manager", status: "Active" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDynamicId((prev) => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 max-w-7xl">
            <div>
                <h1 className="text-3xl font-bold mb-2">🎯 Locator Practice Lab</h1>
                <p className="text-slate-600">
                    Comprehensive playground for practicing XPath, CSS Selectors, and various locator strategies
                    for Selenium and Playwright automation testing.
                </p>
            </div>

            {/* XPath Axes Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">📍 XPath Axes Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice: child::, parent::, ancestor::, descendant::, following::, preceding::,
                    following-sibling::, preceding-sibling::
                </p>

                <div className="border-2 border-blue-200 rounded-lg p-4" id="axes-root" data-test="axes-root">
                    <div className="grandparent" data-level="grandparent">
                        <h3 className="font-semibold mb-2">Grandparent Level</h3>
                        <div className="parent" data-level="parent" id="parent-1">
                            <p className="mb-2">Parent 1</p>
                            <div className="child" data-level="child" id="child-1-1">
                                <span className="text-sm">Child 1.1</span>
                            </div>
                            <div className="child" data-level="child" id="child-1-2">
                                <span className="text-sm">Child 1.2</span>
                            </div>
                        </div>
                        <div className="parent" data-level="parent" id="parent-2">
                            <p className="mb-2">Parent 2</p>
                            <div className="child" data-level="child" id="child-2-1">
                                <span className="text-sm">Child 2.1</span>
                            </div>
                            <div className="child" data-level="child" id="child-2-2">
                                <span className="text-sm">Child 2.2</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>XPath Examples:</strong></p>
                    <p>• //div[@id='child-1-1']/parent::div - Get parent of child-1-1</p>
                    <p>• //div[@id='child-1-1']/ancestor::div[@class='grandparent'] - Get grandparent</p>
                    <p>• //div[@id='parent-1']/child::div - Get all child divs</p>
                    <p>• //div[@id='child-1-1']/following-sibling::div - Get next sibling</p>
                    <p>• //div[@id='child-1-2']/preceding-sibling::div - Get previous sibling</p>
                </div>
            </section>

            {/* XPath Functions Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">🔧 XPath Functions Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice: text(), contains(), starts-with(), normalize-space(), concat(), substring(),
                    string-length(), count(), position(), last()
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="border rounded p-3">
                            <button
                                id="exact-text-btn"
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                data-test="exact-text"
                            >
                                Click Me
                            </button>
                        </div>

                        <div className="border rounded p-3">
                            <button
                                id="partial-text-btn"
                                className="bg-green-600 text-white px-4 py-2 rounded"
                                data-test="partial-text"
                            >
                                Submit Form Data
                            </button>
                        </div>

                        <div className="border rounded p-3">
                            <button
                                id="whitespace-btn"
                                className="bg-purple-600 text-white px-4 py-2 rounded"
                                data-test="whitespace-text"
                            >
                                {`   Normalize   Space   `}
                            </button>
                        </div>

                        <div className="border rounded p-3">
                            <span id="starts-with-text" data-prefix="auto">automation-element-123</span>
                        </div>

                        <div className="border rounded p-3">
                            <span id="substring-text" data-value="SELENIUM">SELENIUM_WEBDRIVER_JAVA</span>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                        <p><strong>XPath Function Examples:</strong></p>
                        <p>• //button[text()='Click Me'] - Exact text match</p>
                        <p>• //button[contains(text(),'Submit')] - Partial text</p>
                        <p>• //button[normalize-space()='Normalize Space'] - Trim whitespace</p>
                        <p>• //span[starts-with(@id,'starts')] - Starts with</p>
                        <p>• //span[starts-with(text(),'SELENIUM')] - Text starts with</p>
                        <p>• //span[string-length(text())&gt;10] - String length check</p>
                        <p>• //div[@class='parent'][1] - First element</p>
                        <p>• //div[@class='parent'][last()] - Last element</p>
                        <p>• //div[@class='parent'][position()=2] - Second element</p>
                        <p>• count(//div[@class='child']) - Count elements</p>
                    </div>
                </div>
            </section>

            {/* XPath Predicates Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">🎲 XPath Predicates Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice attribute predicates, index predicates, multiple conditions, NOT conditions
                </p>

                <div className="space-y-3">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            id="pred-input-1"
                            className="border rounded px-3 py-2"
                            placeholder="Input 1"
                            data-automation="input-field"
                            data-index="1"
                        />
                        <input
                            type="text"
                            id="pred-input-2"
                            className="border rounded px-3 py-2"
                            placeholder="Input 2"
                            data-automation="input-field"
                            data-index="2"
                        />
                        <input
                            type="text"
                            id="pred-input-3"
                            className="border rounded px-3 py-2"
                            placeholder="Input 3"
                            data-automation="input-field"
                            data-index="3"
                            disabled
                        />
                    </div>

                    <div className="flex gap-3">
                        <button className="btn-primary bg-blue-600 text-white px-4 py-2 rounded" data-role="submit">
                            Submit
                        </button>
                        <button className="btn-secondary bg-gray-600 text-white px-4 py-2 rounded" data-role="cancel">
                            Cancel
                        </button>
                        <button className="btn-danger bg-red-600 text-white px-4 py-2 rounded" data-role="delete" disabled>
                            Delete
                        </button>
                    </div>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>XPath Predicate Examples:</strong></p>
                    <p>• //input[@id='pred-input-1'] - By ID</p>
                    <p>• //input[@data-automation='input-field'] - By data attribute</p>
                    <p>• //input[@data-automation='input-field'][1] - First match</p>
                    <p>• //input[@data-automation='input-field'][last()] - Last match</p>
                    <p>• //input[@data-automation and @data-index='2'] - Multiple conditions</p>
                    <p>• //input[not(@disabled)] - NOT disabled</p>
                    <p>• //button[@data-role and not(@disabled)] - Enabled buttons with role</p>
                </div>
            </section>

            {/* CSS Selector Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">🎨 CSS Selector Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice: ID, class, attribute selectors, pseudo-classes, combinators
                </p>

                <div className="space-y-4">
                    <div className="css-container" id="css-root">
                        <div className="box primary-box" data-category="important" data-priority="high">
                            <p className="box-title">Primary Box</p>
                            <span className="box-content">Content 1</span>
                        </div>
                        <div className="box secondary-box" data-category="normal" data-priority="medium">
                            <p className="box-title">Secondary Box</p>
                            <span className="box-content">Content 2</span>
                        </div>
                        <div className="box tertiary-box" data-category="optional" data-priority="low">
                            <p className="box-title">Tertiary Box</p>
                            <span className="box-content">Content 3</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="text" name="username" className="form-input" placeholder="Username" />
                        <input type="email" name="email" className="form-input" placeholder="Email" />
                        <input type="password" name="password" className="form-input" placeholder="Password" />
                    </div>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>CSS Selector Examples:</strong></p>
                    <p>• #css-root - By ID</p>
                    <p>• .primary-box - By class</p>
                    <p>• [data-category='important'] - Attribute equals</p>
                    <p>• [data-priority^='h'] - Attribute starts with 'h'</p>
                    <p>• [data-priority$='gh'] - Attribute ends with 'gh'</p>
                    <p>• [data-category*='opt'] - Attribute contains 'opt'</p>
                    <p>• .box:first-child - First child</p>
                    <p>• .box:last-child - Last child</p>
                    <p>• .box:nth-child(2) - Second child</p>
                    <p>• input[type='email'] - Input by type</p>
                    <p>• #css-root &gt; .box - Direct child</p>
                    <p>• .box + .box - Adjacent sibling</p>
                    <p>• .primary-box ~ .box - General sibling</p>
                    <p>• input:not([type='password']) - NOT password</p>
                </div>
            </section>

            {/* Complex DOM Structures */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">🏗️ Complex DOM Structures</h2>
                <p className="text-sm text-slate-600">
                    Practice navigating deeply nested elements and complex hierarchies
                </p>

                <div className="border-2 border-purple-200 rounded-lg p-4">
                    <div className="level-1" data-depth="1">
                        <div className="level-2" data-depth="2">
                            <div className="level-3" data-depth="3">
                                <div className="level-4" data-depth="4">
                                    <div className="level-5" data-depth="5">
                                        <button
                                            id="deep-nested-btn"
                                            className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
                                            data-test="deeply-nested"
                                        >
                                            Deeply Nested Button
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>Complex Navigation Examples:</strong></p>
                    <p>• //div[@data-depth='1']//button - Descendant</p>
                    <p>• //div[@data-depth='5']/button - Direct child</p>
                    <p>• //button[@id='deep-nested-btn']/ancestor::div[@data-depth='1'] - Ancestor</p>
                    <p>• CSS: .level-1 .level-5 button - Descendant selector</p>
                    <p>• CSS: [data-depth='5'] &gt; button - Direct child</p>
                </div>
            </section>

            {/* Table Structure Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">📊 Table Structure Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice locating table headers, rows, cells, and navigating table data
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300" id="practice-table" data-test="user-table">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="border border-slate-300 px-4 py-2" data-column="id">ID</th>
                                <th className="border border-slate-300 px-4 py-2" data-column="name">Name</th>
                                <th className="border border-slate-300 px-4 py-2" data-column="role">Role</th>
                                <th className="border border-slate-300 px-4 py-2" data-column="status">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={row.id} data-row-id={row.id} data-row-index={index} className="hover:bg-slate-50">
                                    <td className="border border-slate-300 px-4 py-2" data-cell="id">{row.id}</td>
                                    <td className="border border-slate-300 px-4 py-2" data-cell="name">{row.name}</td>
                                    <td className="border border-slate-300 px-4 py-2" data-cell="role">{row.role}</td>
                                    <td className="border border-slate-300 px-4 py-2" data-cell="status">
                                        <span className={`px-2 py-1 rounded text-xs ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>Table XPath Examples:</strong></p>
                    <p>• //table[@id='practice-table']//th[@data-column='name'] - Header by column</p>
                    <p>• //tr[@data-row-id='2'] - Row by ID</p>
                    <p>• //tr[@data-row-id='2']/td[@data-cell='name'] - Specific cell</p>
                    <p>• //tr[@data-row-index='0']/td[2] - Cell by position</p>
                    <p>• //td[text()='Alice Johnson']/parent::tr - Row containing text</p>
                    <p>• //span[text()='Active']/ancestor::tr - Row with active status</p>
                    <p><strong>Table CSS Examples:</strong></p>
                    <p>• table#practice-table th[data-column='role'] - Header</p>
                    <p>• tr[data-row-id='3'] td[data-cell='status'] - Specific cell</p>
                    <p>• tbody tr:nth-child(2) - Second row</p>
                </div>
            </section>

            {/* Form Elements Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">📝 Form Elements Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice various input types, labels, checkboxes, radio buttons, selects
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="form-name" className="block text-sm font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="form-name"
                                name="fullName"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter your name"
                                data-testid="name-input"
                                data-validation="required"
                            />
                        </div>

                        <div>
                            <label htmlFor="form-email" className="block text-sm font-medium mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="form-email"
                                name="emailAddress"
                                className="w-full border rounded px-3 py-2"
                                placeholder="user@example.com"
                                data-testid="email-input"
                                data-validation="email"
                            />
                        </div>

                        <div>
                            <label htmlFor="form-phone" className="block text-sm font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="form-phone"
                                name="phoneNumber"
                                className="w-full border rounded px-3 py-2"
                                placeholder="+1234567890"
                                data-testid="phone-input"
                                pattern="[0-9+]+"
                            />
                        </div>

                        <div>
                            <label htmlFor="form-date" className="block text-sm font-medium mb-1">
                                Birth Date
                            </label>
                            <input
                                type="date"
                                id="form-date"
                                name="birthDate"
                                className="w-full border rounded px-3 py-2"
                                data-testid="date-input"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Subscription Type
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="subscription"
                                        value="free"
                                        data-testid="radio-free"
                                        data-plan="free"
                                    />
                                    <span>Free Plan</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="subscription"
                                        value="premium"
                                        data-testid="radio-premium"
                                        data-plan="premium"
                                    />
                                    <span>Premium Plan</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="subscription"
                                        value="enterprise"
                                        data-testid="radio-enterprise"
                                        data-plan="enterprise"
                                    />
                                    <span>Enterprise Plan</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Interests
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="interests"
                                        value="selenium"
                                        data-testid="check-selenium"
                                        data-category="automation"
                                    />
                                    <span>Selenium</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="interests"
                                        value="playwright"
                                        data-testid="check-playwright"
                                        data-category="automation"
                                    />
                                    <span>Playwright</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="interests"
                                        value="cypress"
                                        data-testid="check-cypress"
                                        data-category="automation"
                                    />
                                    <span>Cypress</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="form-country" className="block text-sm font-medium mb-1">
                                Country
                            </label>
                            <select
                                id="form-country"
                                name="country"
                                className="w-full border rounded px-3 py-2"
                                data-testid="select-country"
                            >
                                <option value="">-- Select Country --</option>
                                <option value="us">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="in">India</option>
                                <option value="ca">Canada</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>Form Element Examples:</strong></p>
                    <p>• //input[@data-testid='name-input'] - By test ID</p>
                    <p>• //input[@type='email'] - By input type</p>
                    <p>• //label[text()='Full Name']/following-sibling::input - Input after label</p>
                    <p>• //input[@name='subscription'][@value='premium'] - Radio by value</p>
                    <p>• //input[@type='checkbox'][@data-category='automation'] - Checkboxes by category</p>
                    <p>• //select[@id='form-country']/option[@value='in'] - Select option</p>
                    <p>• CSS: input[data-validation='required'] - Required inputs</p>
                    <p>• CSS: input[type='radio'][data-plan='enterprise'] - Specific radio</p>
                </div>
            </section>

            {/* SVG Elements Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">🎭 SVG Elements Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice locating SVG elements and their nested structures
                </p>

                <div className="flex gap-6 items-center">
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded" data-action="like">
                        <svg width="24" height="24" viewBox="0 0 24 24" data-icon="heart" className="svg-icon">
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="currentColor"
                                data-svg-part="heart-path"
                            />
                        </svg>
                        <span>Like</span>
                    </button>

                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded" data-action="share">
                        <svg width="24" height="24" viewBox="0 0 24 24" data-icon="share" className="svg-icon">
                            <circle cx="18" cy="5" r="3" fill="currentColor" data-svg-part="circle-1" />
                            <circle cx="6" cy="12" r="3" fill="currentColor" data-svg-part="circle-2" />
                            <circle cx="18" cy="19" r="3" fill="currentColor" data-svg-part="circle-3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="2" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span>Share</span>
                    </button>

                    <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded" data-action="delete">
                        <svg width="24" height="24" viewBox="0 0 24 24" data-icon="trash" className="svg-icon">
                            <path
                                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                fill="currentColor"
                                data-svg-part="trash-path"
                            />
                        </svg>
                        <span>Delete</span>
                    </button>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>SVG XPath Examples:</strong></p>
                    <p>• //*[name()='svg'][@data-icon='heart'] - SVG by data attribute</p>
                    <p>• //*[name()='path'][@data-svg-part='heart-path'] - SVG path element</p>
                    <p>• //button[@data-action='like']//*[name()='svg'] - SVG inside button</p>
                    <p>• //*[name()='circle'][@data-svg-part='circle-1'] - SVG circle</p>
                    <p><strong>SVG CSS Examples:</strong></p>
                    <p>• svg[data-icon='share'] - SVG by attribute</p>
                    <p>• button[data-action='delete'] svg - SVG inside button</p>
                    <p>• .svg-icon - SVG by class</p>
                </div>
            </section>

            {/* Dynamic Elements Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">⚡ Dynamic Elements Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice handling elements with changing IDs, appearing/disappearing elements
                </p>

                <div className="space-y-4">
                    <div className="border rounded p-4">
                        <p className="text-sm mb-2">Dynamic ID (changes every 3 seconds):</p>
                        <button
                            id={`dynamic-btn-${dynamicId}`}
                            className="bg-orange-600 text-white px-4 py-2 rounded"
                            data-testid="dynamic-button"
                            data-type="dynamic"
                        >
                            Dynamic Button (ID: {dynamicId})
                        </button>
                    </div>

                    <div className="border rounded p-4">
                        <button
                            onClick={() => setShowDynamic(!showDynamic)}
                            className="bg-purple-600 text-white px-4 py-2 rounded mb-3"
                        >
                            Toggle Element
                        </button>
                        {showDynamic && (
                            <div
                                id="toggleable-element"
                                className="bg-green-100 p-3 rounded"
                                data-testid="toggleable"
                                data-state="visible"
                            >
                                This element appears and disappears
                            </div>
                        )}
                    </div>

                    <div className="border rounded p-4">
                        <div className="space-y-2">
                            <div className="item" data-item-id="item-001" data-timestamp={Date.now()}>
                                Item with timestamp attribute
                            </div>
                            <div className="item" data-item-id="item-002" data-random={Math.random()}>
                                Item with random attribute
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>Dynamic Element Strategies:</strong></p>
                    <p>• //button[@data-testid='dynamic-button'] - Use stable test ID</p>
                    <p>• //button[@data-type='dynamic'] - Use stable data attribute</p>
                    <p>• //button[starts-with(@id,'dynamic-btn-')] - Partial ID match</p>
                    <p>• //div[@data-testid='toggleable'] - Locate toggleable element</p>
                    <p>• //div[starts-with(@data-item-id,'item-')] - Partial attribute match</p>
                    <p>• CSS: button[data-testid='dynamic-button'] - Stable selector</p>
                    <p>• CSS: button[id^='dynamic-btn-'] - ID starts with</p>
                </div>
            </section>

            {/* Data Attributes Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">🏷️ Data Attributes Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice using data-testid, data-automation-id, and custom data attributes
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        data-testid="submit-btn"
                        data-automation-id="auto-submit"
                        data-action="submit"
                        data-priority="high"
                    >
                        Submit
                    </button>

                    <button
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                        data-testid="cancel-btn"
                        data-automation-id="auto-cancel"
                        data-action="cancel"
                        data-priority="medium"
                    >
                        Cancel
                    </button>

                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        data-testid="delete-btn"
                        data-automation-id="auto-delete"
                        data-action="delete"
                        data-priority="high"
                    >
                        Delete
                    </button>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>Data Attribute Examples:</strong></p>
                    <p>• //button[@data-testid='submit-btn'] - By test ID</p>
                    <p>• //button[@data-automation-id='auto-cancel'] - By automation ID</p>
                    <p>• //button[@data-action='delete'] - By custom data attribute</p>
                    <p>• //button[@data-priority='high'] - By priority</p>
                    <p>• //button[@data-action='submit' and @data-priority='high'] - Multiple data attrs</p>
                    <p>• CSS: button[data-testid='delete-btn'] - CSS by test ID</p>
                    <p>• CSS: button[data-priority='high'] - CSS by priority</p>
                </div>
            </section>

            {/* Shadow DOM Practice */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">🌑 Shadow DOM Practice</h2>
                <p className="text-sm text-slate-600">
                    Practice locating elements inside Shadow DOM (requires special handling in Selenium/Playwright)
                </p>

                <div className="border-2 border-indigo-200 rounded-lg p-4">
                    <div id="shadow-host" data-test="shadow-host" className="bg-indigo-50 p-4 rounded">
                        <p className="text-sm mb-2">Shadow Host Element</p>
                        <div className="shadow-content">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded" id="shadow-button">
                                Shadow DOM Button (Simulated)
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs font-mono space-y-1">
                    <p><strong>Shadow DOM Access (Selenium):</strong></p>
                    <p>• WebElement shadowHost = driver.findElement(By.id("shadow-host"));</p>
                    <p>• SearchContext shadowRoot = shadowHost.getShadowRoot();</p>
                    <p>• shadowRoot.findElement(By.id("shadow-button"));</p>
                    <p><strong>Shadow DOM Access (Playwright):</strong></p>
                    <p>• await page.locator('#shadow-host').locator('#shadow-button')</p>
                    <p>• Playwright automatically pierces shadow DOM</p>
                </div>
            </section>

            {/* Cheat Sheet */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800">📚 Quick Reference Cheat Sheet</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4">
                        <h3 className="font-semibold mb-3 text-blue-700">XPath Axes</h3>
                        <ul className="text-xs space-y-1 font-mono">
                            <li>• child:: - Direct children</li>
                            <li>• parent:: - Parent element</li>
                            <li>• ancestor:: - All ancestors</li>
                            <li>• descendant:: - All descendants</li>
                            <li>• following:: - All following nodes</li>
                            <li>• preceding:: - All preceding nodes</li>
                            <li>• following-sibling:: - Next siblings</li>
                            <li>• preceding-sibling:: - Previous siblings</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <h3 className="font-semibold mb-3 text-purple-700">XPath Functions</h3>
                        <ul className="text-xs space-y-1 font-mono">
                            <li>• text() - Element text</li>
                            <li>• contains(a, b) - String contains</li>
                            <li>• starts-with(a, b) - String starts with</li>
                            <li>• normalize-space() - Trim whitespace</li>
                            <li>• concat(a, b, ...) - Concatenate strings</li>
                            <li>• substring(s, start, len) - Substring</li>
                            <li>• string-length(s) - String length</li>
                            <li>• count(nodes) - Count nodes</li>
                            <li>• position() - Node position</li>
                            <li>• last() - Last node</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <h3 className="font-semibold mb-3 text-green-700">CSS Selectors</h3>
                        <ul className="text-xs space-y-1 font-mono">
                            <li>• #id - By ID</li>
                            <li>• .class - By class</li>
                            <li>• [attr] - Has attribute</li>
                            <li>• [attr='val'] - Attribute equals</li>
                            <li>• [attr^='val'] - Starts with</li>
                            <li>• [attr$='val'] - Ends with</li>
                            <li>• [attr*='val'] - Contains</li>
                            <li>• :first-child - First child</li>
                            <li>• :last-child - Last child</li>
                            <li>• :nth-child(n) - Nth child</li>
                            <li>• :not(selector) - NOT selector</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <h3 className="font-semibold mb-3 text-orange-700">Best Practices</h3>
                        <ul className="text-xs space-y-1">
                            <li>✓ Use data-testid for stable locators</li>
                            <li>✓ Prefer ID over XPath when available</li>
                            <li>✓ Avoid absolute XPath paths</li>
                            <li>✓ Use contains() for dynamic IDs</li>
                            <li>✓ Combine multiple attributes for uniqueness</li>
                            <li>✓ Test locators in browser DevTools</li>
                            <li>✓ Keep locators simple and readable</li>
                            <li>✓ Use CSS for better performance</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
