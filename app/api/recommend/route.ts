import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is missing" },
      { status: 500 }
    );
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const body = await req.json();
    const prompt: string | undefined = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are an AI assistant for a laptop recommendation website.

STEP 1:
Determine whether the user's prompt is related to:
- buying a laptop
- choosing a computer
- tech usage (coding, gaming, editing, studying)
- budget for laptops or PCs

STEP 2:
IF the prompt is NOT related to technology or laptops:
Return ONLY this JSON and NOTHING else:

{
  "error": "NOT_TECH_RELATED"
}

STEP 3:
IF the prompt IS tech-related:
Recommend a reasonable number of laptops based on the user's needs and budget.
Do NOT force a fixed number.

Return ONLY valid JSON.
NO explanations.
NO markdown.
NO backticks.

JSON format MUST be:

[
  {
    "name": "Laptop name",
    "price": 90000,
    "image": "/laptops/sample.png",
    "description": "Short, clear description",
    "tags": ["tag1", "tag2"],
    "badge": "Best Value",
    "recommendedSpecs": {
      "RAM": "Recommendation",
      "Storage": "Recommendation",
      "CPU": "Recommendation",
      "GPU": "Recommendation",
      "Display": "Recommendation",
      "Battery": "Recommendation",
      "Ports": "Recommendation",
      "Upgradeability": "Recommendation"
    },
    "notes": "Optional buying advice"
  }
]

User prompt:
${prompt}
`,
            },
          ],
        },
      ],
    });

    const text = response.text;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 }
      );
    }

    if (data?.error === "NOT_TECH_RELATED") {
      return NextResponse.json(
        {
          error:
            "Please enter a tech-related prompt (example: laptop for coding, budget 90,000 LKR)",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("API ERROR:", err);

    const message =
      err instanceof Error ? err.message : "AI generation failed";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
