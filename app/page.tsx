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
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      console.log(data);
      sessionStorage.setItem("results", JSON.stringify(data));

      router.push("/results");

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to get AI recommendations");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Smart Tech Finder
          </h1>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Describe your needs — our AI will recommend the best laptop for you
          </p>
        </div>

        {/* Input & Examples Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {/* Textarea - Left Side (takes 2 columns on lg) */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Describe your requirements
            </label>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: I'm a frontend developer, budget around 90,000 LKR, mostly working with React and design tools."
                rows={8}
                className="flex-1 resize-none p-6 text-base text-gray-900 placeholder-gray-500 focus:outline-none font-normal leading-relaxed"
              />

              {/* Footer inside card */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-600">
                <span>Be natural — write like you talk</span>
                <span>{prompt.length}/500</span>
              </div>
            </div>
          </div>

          {/* Examples Section - Right Side */}
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Example prompts
            </p>
            <div className="space-y-3 flex flex-col h-full">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(ex)}
                  className="text-left px-4 py-3 text-xs text-gray-700 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors font-normal leading-snug"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 px-6 bg-gray-900 text-white font-semibold text-base rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "AI is thinking..." : "Get AI Recommendations"}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-12">
          Zeeloop Global &copy; 2026. All rights reserved.
        </p>

      </div>
    </div>
  );

}