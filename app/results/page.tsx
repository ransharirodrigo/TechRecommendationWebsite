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
      },
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-16">

        {/* Header Section - Single Row */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Recommended for You
            </h1>
            <p className="mt-3 text-base text-gray-500 font-normal">
              Based on your needs and budget
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm whitespace-nowrap"
          >
            ← Start new recommendation
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-6 right-6 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold tracking-wide">
                  {product.badge}
                </div>
              )}

              {/* Image Container */}
              <div className="h-56 flex items-center justify-center mb-8 bg-gray-50 rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Product Info */}
              <h2 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-2">
                {product.description}
              </p>

              {/* Tags */}
              {product.tags && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-block text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer - Price and Button */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
                <span className="text-2xl font-bold text-gray-900">
                  ₹ {product.price.toLocaleString()}
                </span>
                <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}