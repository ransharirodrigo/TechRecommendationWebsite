<h1>🎯 Smart Tech Finder - AI-Powered Laptop Recommendation Website</h1>

<p>A personalized laptop recommendation platform powered by <strong>Google Gemini AI</strong>. Tell us about yourself, and get AI-generated recommendations tailored to your profession, budget, and use case.</p>

<hr>

<h2>📸 Features</h2>

<h3>✨ AI-Powered Personalization</h3>
<ul>
    <li>Get customized laptop recommendations based on your profession and usage.</li>
    <li>Understand <strong>why</strong> each laptop is perfect for your specific needs.</li>
    <li>AI-generated explanations for every recommendation.</li>
    <li>Smart validation of your profession and requirements.</li>
</ul>

<h3>💰 Real-Time Price Comparison</h3>
<ul>
    <li>Compare prices across multiple retailers.</li>
    <li>See the best deals at a glance.</li>
    <li>Direct links to purchase from your preferred store.</li>
    <li>Price comparison from leading retailers.</li>
</ul>

<h3>📊 Comprehensive Product Information</h3>
<ul>
    <li>Detailed specifications (Processor, RAM, Storage, Display).</li>
    <li>Clear explanation of why each laptop suits your needs.</li>
    <li>Tags and badges like "Best Value" or "Student Pick" for easier decision-making.</li>
</ul>

<hr>

<h2>📖 Getting Started</h2>
<p>Follow these steps to set up <strong>Smart Tech Finder</strong> locally and start generating AI-powered laptop recommendations.</p>

<h3>1️⃣ Clone the repository</h3>
<pre><code>git clone https://github.com/ransharirodrigo/TechRecommendationWebsite.git
cd TechRecommendationWebsite
</code></pre>

<h3>2️⃣ Install dependencies</h3>
<p>This project uses <strong>Next.js</strong> and the <strong>Google Gemini AI SDK</strong>.</p>
<pre><code>npm install
npm install @google/genai
</code></pre>
<p>📖 Gemini SDK docs: <a href="https://ai.google.dev/gemini-api/docs/quickstart#install-gemini-library">Quickstart Guide</a></p>

<h3>3️⃣ Set up environment variables</h3>
<p>Create a <code>.env.local</code> file in the project root:</p>
<pre><code>GEMINI_API_KEY=your-google-gemini-api-key
</code></pre>
<p>⚠️ <strong>Important:</strong> Do not prefix the key with <code>NEXT_PUBLIC_</code>. It must remain server-side only.</p>
<p>Restart your dev server after adding this file:</p>
<pre><code>npm run dev
</code></pre>

<h3>4️⃣ Run the development server</h3>
<pre><code>npm run dev
</code></pre>
<p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser. Enter your profession, budget, and preferences to get AI-powered laptop recommendations.</p>

<hr>

<h2>🗂 Folder Structure Overview</h2>
<pre><code>/app
  /api/recommend/route.ts      # API route calling Gemini AI
  /page.tsx                    # Home page with prompt input
  /results/page.tsx            # Results page rendering recommendations
/public
  /laptops                     # Laptop images
.env.local                      # Your Gemini API key
</code></pre>

<hr>

<h2>💡 Tips & Recommendations</h2>
<ul>
    <li>Keep your prompt concise (~500 characters) for best results.</li>
    <li>Ensure <code>GEMINI_API_KEY</code> is valid and has API access.</li>
    <li>You can customize AI response formatting in <code>route.ts</code> for different data shapes.</li>
    <li>For production deployment (Vercel, Netlify, etc.), add the API key in <strong>Environment Variables</strong>.</li>
</ul>

<hr>

<h2>📞 Contact / Support</h2>
<p>For issues or questions, feel free to:</p>
<ul>
    <li>Open an issue in this repository</li>
    <li>Email: <a href="mailto:ransharirodrigo@example.com">ransharirodrigo@example.com</a></li>
</ul>

<hr>

<h2>🚀 Enjoy using Smart Tech Finder!</h2>
<p>Get <strong>AI-powered laptop recommendations</strong> that save you time and money, while ensuring you get a laptop perfectly suited to your needs.</p>
