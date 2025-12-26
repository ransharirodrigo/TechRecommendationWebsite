<h1>🧪 Smart Tech Finder - Testing Documentation</h1>

<p>This document outlines the <strong>testing strategy</strong> and <strong>test cases</strong> for the Smart Tech Finder project. It covers how to run tests, mock external dependencies, and validate API behavior.</p>

<hr>

<h2>1️⃣ Overview</h2>

<p>Smart Tech Finder uses <strong>Next.js</strong> and <strong>Google Gemini AI</strong> for AI-powered laptop recommendations. Testing focuses on:</p>

<ul>
  <li>✅ API route <code>/api/recommend</code></li>
  <li>✅ Input validation and error handling</li>
  <li>✅ Safe handling of AI responses (mocked)</li>
  <li>❌ External AI logic is <strong>not tested</strong> (Gemini API calls are mocked)</li>
</ul>

<hr>

<h2>2️⃣ Testing Tools</h2>

<p>The project uses the following <strong>dev dependencies</strong>:</p>

<table>
  <tr>
    <th>Tool</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td>jest</td>
    <td>Test runner</td>
  </tr>
  <tr>
    <td>ts-jest</td>
    <td>TypeScript support for Jest</td>
  </tr>
  <tr>
    <td>@types/jest</td>
    <td>Type definitions for Jest</td>
  </tr>
  <tr>
    <td>node-mocks-http</td>
    <td>Mock HTTP requests & responses</td>
  </tr>
</table>

<p>Install dependencies:</p>
<pre><code>npm install --save-dev jest ts-jest @types/jest node-mocks-http</code></pre>

<hr>

<h2>3️⃣ Jest Configuration</h2>

<p>Create a <code>jest.config.js</code> in the project root:</p>
<pre><code>module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  modulePathIgnorePatterns: ["<rootDir>/.next/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};</code></pre>

<hr>

<h2>4️⃣ Folder Structure for Tests</h2>

<pre><code>src/
  app/
    api/
      recommend/
        route.ts            # API route calling Gemini AI

__tests__/
  api/
    recommend.test.ts      # Test cases for API route
</code></pre>

<hr>

<h2>5️⃣ Mocking Gemini AI</h2>

<p>Tests do <strong>not call the real API</strong>. Mocking is required:</p>
<pre><code>jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: { generateContent: jest.fn() },
  })),
}));</code></pre>

<hr>

<h2>6️⃣ Test Cases</h2>

<h3>6.1 Empty Prompt</h3>
<ul>
  <li><strong>Input:</strong> <code>{}</code></li>
  <li><strong>Expected:</strong> HTTP 400, error <code>"Prompt is required"</code></li>
</ul>

<h3>6.2 Non-Tech Prompt</h3>
<ul>
  <li><strong>Input:</strong> <code>{ prompt: "places to visit in Sri Lanka" }</code></li>
  <li><strong>Expected:</strong> HTTP 400, error <code>"Please enter a tech-related prompt"</code></li>
</ul>

<h3>6.3 Valid Tech Prompt</h3>
<ul>
  <li><strong>Input:</strong> <code>{ prompt: "coding laptop under 100k" }</code></li>
  <li><strong>Expected:</strong> HTTP 200, returns an array of laptops with <code>name</code>, <code>price</code>, <code>description</code>, <code>tags</code>, and <code>badge</code></li>
</ul>

<h3>6.4 Invalid AI JSON</h3>
<ul>
  <li><strong>Input:</strong> <code>{ prompt: "coding laptop" }</code> (mock AI returns invalid JSON)</li>
  <li><strong>Expected:</strong> HTTP 500, error <code>"Invalid AI response format"</code></li>
</ul>

<hr>

<h2>7️⃣ Running Tests</h2>

<p>Add a test script in <code>package.json</code>:</p>
<pre><code>"scripts": {
  "test": "jest"
}</code></pre>

<p>Run tests:</p>
<pre><code>npm test</code></pre>

<p>✅ All tests should pass if mocking and API route logic are correct.</p>

<hr>

<h2>8️⃣ Tips</h2>

<ul>
  <li>Mock <strong>external dependencies</strong> to isolate your API logic.</li>
  <li>Tests ensure that AI responses, errors, and edge cases are handled <strong>safely</strong>.</li>
  <li>Include test files in GitHub to improve <strong>project professionalism</strong> and <strong>CI/CD readiness</strong>.</li>
</ul>

<hr>

<h2>9️⃣ References</h2>

<ul>
  <li><a href="https://jestjs.io/docs/getting-started">Jest Docs</a></li>
  <li><a href="https://kulshekhar.github.io/ts-jest/">ts-jest Docs</a></li>
  <li><a href="https://nextjs.org/docs/api-routes/introduction">Next.js API Routes</a></li>
</ul>
