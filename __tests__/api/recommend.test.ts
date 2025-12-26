jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: jest.fn(),
    },
  })),
}));

import { POST } from "@/app/api/recommend/route";
import { NextRequest } from "next/server";

// -------------------
// Test 1: Empty prompt
// -------------------
test("returns error when prompt is missing", async () => {
  const req = new NextRequest("http://localhost/api/recommend", {
    method: "POST",
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
  });

  const res = await POST(req);
  const data = await res.json();

  expect(res.status).toBe(400);
  expect(data.error).toBeDefined();
});

// -------------------
// Test 2: Non-tech prompt
// -------------------
test("blocks non-tech prompts", async () => {
  const { GoogleGenAI } = require("@google/genai");
  GoogleGenAI.mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({
        text: JSON.stringify({ error: "NOT_TECH_RELATED" }),
      }),
    },
  }));

  const req = new NextRequest("http://localhost/api/recommend", {
    method: "POST",
    body: JSON.stringify({ prompt: "places to visit sri lanka" }),
    headers: { "Content-Type": "application/json" },
  });

  const res = await POST(req);
  const data = await res.json();

  expect(res.status).toBe(400);
  expect(data.error).toMatch(/tech-related/i);
});

// -------------------
// Test 3: Valid tech prompt
// -------------------
test("returns laptop recommendations for tech prompt", async () => {
  const { GoogleGenAI } = require("@google/genai");
  GoogleGenAI.mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({
        text: JSON.stringify([
          {
            name: "Dell Inspiron",
            price: 90000,
            description: "Good for coding",
            tags: ["coding"],
            badge: "Best Value",
          },
        ]),
      }),
    },
  }));

  const req = new NextRequest("http://localhost/api/recommend", {
    method: "POST",
    body: JSON.stringify({ prompt: "coding laptop under 100k" }),
    headers: { "Content-Type": "application/json" },
  });

  const res = await POST(req);
  const data = await res.json();

  expect(res.status).toBe(200);
  expect(Array.isArray(data)).toBe(true);
  expect(data[0].name).toBeDefined();
});

// -------------------
// Test 4: Invalid AI JSON
// -------------------
test("handles invalid AI JSON safely", async () => {
  const { GoogleGenAI } = require("@google/genai");
  GoogleGenAI.mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({
        text: "INVALID_JSON",
      }),
    },
  }));

  const req = new NextRequest("http://localhost/api/recommend", {
    method: "POST",
    body: JSON.stringify({ prompt: "coding laptop" }),
    headers: { "Content-Type": "application/json" },
  });

  const res = await POST(req);
  const data = await res.json();

  expect(res.status).toBe(500);
  expect(data.error).toBeDefined();
});