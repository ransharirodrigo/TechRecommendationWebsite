"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const examples = [
    "I'm a frontend developer with a budget of 90,000 LKR for React projects",
    "Student, budget around 70k, mainly coding and YouTube",
    "Video editor, need a powerful laptop under 150k",
  ];

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError("Please describe your needs");
      return;
    }

    setLoading(true);
    setError("");

    try {
      router.push("/results");
      // const response = await fetch("/api/recommend", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ prompt }),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   setError(data.error || "Something went wrong");
      //   setLoading(false);
      //   return;
      // }

      // sessionStorage.setItem("prompt", prompt);
      // sessionStorage.setItem("results", JSON.stringify(data));
      // router.push("/results");
    } catch (err) {
      // setError("Failed to connect to server");
      // setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Smart Tech Finder
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Describe your needs — our AI will recommend the best laptop for you
          </p>
        </div>

        {/* Prompt container */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl blur opacity-20 group-focus-within:opacity-60 transition"></div>

          <div className="relative bg-white rounded-2xl border border-gray-200">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: I'm a frontend developer, budget around 90,000 LKR, mostly working with React and design tools."
              rows={6}
              className="w-full resize-none rounded-2xl p-6 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
            />

            {/* Footer inside prompt */}
            <div className="flex items-center justify-between px-6 pb-4 text-sm text-gray-400">
              <span>💡 Be natural — write like you talk</span>
              <span>{prompt.length}/500</span>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">Try one of these:</p>
          <div className="flex flex-wrap gap-3">
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => setPrompt(ex)}
                className="px-4 py-2 text-sm rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl">
            {error}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-10 py-4 rounded-xl text-lg font-semibold text-white
         bg-blue-500 hover:bg-blue-600
          hover:shadow-lg hover:shadow-blue-200
          transition-all"
        >
          {loading ? "AI is thinking..." : "Get AI Recommendations"}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-10">
          Zeeloop Global &copy; 2026. All rights reserved.
        </p>

      </div>
    </div>
  );

}
