"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const dummyResults = [
      {
        name: "Dell Inspiron 15",
        price: 89000,
        image: "/laptops/dell-inspiron.png",
        description: "15.6-inch laptop with Intel i5, 16GB RAM, ideal for development and daily tasks.",
        tags: ["Web Development", "Intel i5", "16GB RAM"],
        badge: "Best Value"
      },
      {
        name: "HP Pavilion",
        price: 76000,
        image: "/laptops/hp-pavilion.png",
        description: "Affordable laptop suitable for students and general use.",
        tags: ["Student", "General Use"],
        badge: "Student Pick"
      },
      {
        name: "MacBook Air M2",
        price: 150000,
        image: "/laptops/macbook-air.png",
        description: "Lightweight MacBook with excellent battery and performance for developers.",
        tags: ["UI Design", "Lightweight", "Apple"],
        badge: "Premium"
      }
    ];

    setResults(dummyResults);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Recommended for You
          </h1>
          <p className="mt-3 text-gray-600">
            Based on your needs and budget
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                  {product.badge}
                </div>
              )}

              {/* Image */}
              <div className="h-48 flex items-center justify-center mb-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain rounded-xl"
                />
              </div>

              {/* Info */}
              <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {product.description}
              </p>

              {/* Tags */}
              {product.tags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-6">
                <span className="text-xl font-extrabold text-blue-600">
                  ₹ {product.price.toLocaleString()}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold"
          >
            ← Start a new recommendation
          </button>
        </div>

      </div>
    </div>
  );
}
