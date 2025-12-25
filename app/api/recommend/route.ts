import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
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
                    parts: [{
                        text: `
You are a laptop recommendation engine.

Based on the user's requirements, recommend EXACTLY 3 laptops.

Return ONLY valid JSON.
DO NOT include explanations or markdown.
DO NOT include backticks.

The JSON format MUST be:

[
  {
    "name": "Laptop name",
    "price": 90000,
    "image": "/laptops/sample.png",
    "description": "Short, clear description",
    "tags": ["tag1", "tag2"],
    "badge": "Best Value"
  }
]

User requirements:
${prompt}
`
                    }],
                },
            ],
        });

        let data;

        try {
            data = JSON.parse(response.text);
        } catch (e) {
            console.error("JSON parse failed:", response.text);
            return NextResponse.json(
                { error: "Invalid AI response format" },
                { status: 500 }
            );
        }

        return NextResponse.json(data);


        return NextResponse.json({
            text: response.text,
        });

    } catch (err: any) {
        console.error("API ERROR:", err);
        return NextResponse.json(
            { error: err.message || "AI generation failed" },
            { status: 500 }
        );
    }
}
