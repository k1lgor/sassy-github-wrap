import { NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github";
import { generateSassyRoast } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required, you void-brained developer." },
        { status: 400 }
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
        { status: 404 }
      );
    }

    // 2. Generate Roast using AI
    try {
      const roast = await generateSassyRoast(stats);

      return NextResponse.json({
        user: stats,
        roast: roast,
      });
    } catch (error) {
      console.error("OpenAI Error:", error);
      // Fallback or error
      return NextResponse.json(
        { error: "My witty circuits are frying. Try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Something broke. Probably your fault." },
      { status: 500 }
    );
  }
}
