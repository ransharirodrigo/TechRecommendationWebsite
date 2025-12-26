<h1>🏗️ Smart Tech Finder - Architecture Overview</h1>

<p>This document explains the architecture and design decisions behind <strong>Smart Tech Finder</strong>, an AI-powered laptop recommendation platform.</p>

<hr>

<h2>🌐 Project Overview</h2>
<p>Smart Tech Finder allows users to receive personalized laptop recommendations based on profession, usage, and budget. The backend leverages <strong>Google Gemini AI</strong> to generate recommendations.</p>

<hr>

<h2>🗂 Folder Structure</h2>
<pre><code>/app
  /api/recommend/route.ts      # API route calling Gemini AI
  /page.tsx                    # Home page with user prompt form
  /results/page.tsx            # Page displaying AI recommendations
/__tests__
  /api/recommend.test.ts       # Jest tests for API logic
/public
  /laptops                     # Laptop images
.env.local                      # Environment variables
</code></pre>

<hr>

<h2>⚙️ Backend Architecture</h2>
<ul>
    <li><strong>API Route:</strong> <code>/api/recommend</code> handles POST requests, validates prompts, calls Gemini AI, and returns structured JSON.</li>
    <li><strong>AI Integration:</strong> Uses <code>@google/genai</code> SDK to query Google Gemini models.</li>
    <li><strong>Error Handling:</strong> Covers empty prompts, non-tech prompts, and invalid AI responses.</li>
    <li><strong>Testing:</strong> Jest tests mock the AI calls and validate API logic for all edge cases.</li>
</ul>

<hr>

<h2>💻 Frontend Architecture</h2>
<ul>
    <li><strong>Home Page:</strong> Input form for profession, budget, and usage.</li>
    <li><strong>Results Page:</strong> Displays laptops returned by AI along with images, specs, tags, and badges.</li>
    <li><strong>State Management:</strong> Basic React state to store user input and AI response.</li>
</ul>

<hr>

<h2>🧩 Data Flow</h2>
<ol>
    <li>User submits prompt on the home page.</li>
    <li>Frontend sends POST request to <code>/api/recommend</code>.</li>
    <li>API validates input and calls Gemini AI.</li>
    <li>AI response is parsed; errors handled if necessary.</li>
    <li>Valid recommendations returned to frontend in JSON format.</li>
    <li>Frontend renders recommendations with images, badges, and tags.</li>
</ol>

<hr>

<h2>🛠 Key Technologies</h2>
<ul>
    <li>Next.js (App Router)</li>
    <li>TypeScript</li>
    <li>React 18+</li>
    <li>Google Gemini AI SDK (@google/genai)</li>
    <li>Tailwind CSS</li>
    <li>Jest for testing</li>
</ul>

<hr>

<h2>💡 Design Considerations</h2>
<ul>
    <li>API-first design to separate frontend and AI logic.</li>
    <li>Mocking AI in tests to avoid unnecessary API calls.</li>
    <li>Structured JSON response to simplify frontend rendering.</li>
    <li>Scalable architecture to add new AI features or recommendation categories.</li>
</ul>

<hr>

<h2>📈 Future Enhancements</h2>
<ul>
    <li>Integrate real-time price comparison APIs.</li>
    <li>Add user accounts and save preferences.</li>
    <li>Implement caching to reduce AI API calls.</li>
    <li>Add CI/CD pipeline with automated test runs on GitHub Actions.</li>
</ul>

<hr>

<h2>📞 Contact / Support</h2>
<p>For architecture questions or suggestions, contact: <a href="mailto:ransharirodrigo@gmail.com">ransharirodrigo@gmail.com</a></p>
