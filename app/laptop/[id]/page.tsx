"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LaptopDetailsPage() {
  const router = useRouter();
  const [laptop, setLaptop] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedLaptop");
    if (!stored) {
      router.push("/");
      return;
    }
    setLaptop(JSON.parse(stored));
  }, []);

  if (!laptop) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto  py-16 ">
        
        <div className="flex justify-end mb-10">
          <button
            onClick={() => router.back()}
            className="group px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 font-medium text-sm whitespace-nowrap shadow-sm"
          >
            <span className="inline-flex items-center gap-2">
              <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
              Back to results
            </span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <img
              src="/laptops/single_page_laptop.webp"
              alt={laptop.name}
              className="max-h-96 object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="space-y-4">
            {laptop.badge && (
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full shadow-md">
                {laptop.badge}
              </span>
            )}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {laptop.name}
            </h1>
            <p className="text-gray-600 leading-relaxed text-base">
              {laptop.description}
            </p>

            {laptop.tags && (
              <div className="flex flex-wrap gap-2 mb-4 mt-4">
                {laptop.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

          
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 mt-2">
              Recommended Configuration
            </h2>
            <p className="text-sm text-gray-500">
              Look for a laptop from this series with at least the following specs
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 ">
            {laptop.recommendedSpecs &&
              Object.entries(laptop.recommendedSpecs).map(([key, value], index) => (
                <div
                  key={key}
                  className={`grid grid-cols-3 gap-6 px-6 py-5 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <div className="font-semibold text-gray-700 flex items-center ">
                    {key}
                  </div>
                  <div className="col-span-2 text-gray-900 flex items-center font-medium">
                    {value as string}
                  </div>
                </div>
              ))}
          </div>

          {laptop.notes && (
            <div className="mt-8 p-5 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-lg shadow-md">
              <div className="flex gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-sm text-yellow-900 leading-relaxed font-medium">
                  {laptop.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}