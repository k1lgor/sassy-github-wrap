import { NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github";
import { generateSassyRoast } from "@/lib/openai";

// Helper to set CORS headers
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // Or specific domain in production
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required, you void-brained developer." },
        { status: 400, headers: corsHeaders() }
      );
    }

    // 1. Fetch GitHub Data
    let stats;
    try {
      stats = await getGitHubStats(username);
    } catch (error) {
      console.error("GitHub Error:", error);
      return NextResponse.json(
        {
          error:
            "User not found. Do they even code? Or is this a hallucination?",
        },
        { status: 404, headers: corsHeaders() }
      );
    }

    // 2. Generate Roast using AI
    try {
      const roast = await generateSassyRoast(stats);

      return NextResponse.json(
        {
          user: stats,
          roast: roast,
        },
        { headers: corsHeaders() }
      );
    } catch (error) {
      console.error("OpenAI Error:", error);
      // Fallback or error
      return NextResponse.json(
        { error: "My witty circuits are frying. Try again later." },
        { status: 500, headers: corsHeaders() }
      );
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Something broke. Probably your fault." },
      { status: 500, headers: corsHeaders() }
    );
  }
}
