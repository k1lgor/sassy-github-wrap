import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not defined");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSassyRoast(stats: any) {
  const prompt = `
    You are a Sassy, Futuristic AI from the year 3000. Your job is to analyze a GitHub profile and create a "Spotify Wrapped" style experience (Carousel) that roasts them.

    Style: Glassmorphic-chic, futuristic slang, mean but funny.

    Data:
    ${JSON.stringify(stats, null, 2)}

    Output JSON format (strictly valid JSON):
    {
      "slides": [
        {
            "title": "The Identity",
            "subtitle": "Who you think you are",
            "content": "A short, biting description of their bio, avatar, and general vibe.",
            "stat": "A specific number (e.g., '0 Followers')"
        },
        {
            "title": "The Stack",
            "subtitle": "Your trash toolbelt",
            "content": "Roast their top languages. Are they a JS Andy? A Rust Evangelist? Mock them.",
            "stat": "Top Language"
        },
        {
            "title": "The Daily Grind",
            "subtitle": "Your coding rhythm",
            "content": "Analyze their 'sleep_schedule' and 'commit_rhythm'. Mock their work-life balance or lack thereof.",
            "stat": "Daily Habits"
        },
         {
            "title": "The Social",
            "subtitle": "Friends or Bots?",
            "content": "Look at their social stats (issues, PRs, comments). are they a ghost or a keyboard warrior?",
            "stat": "Social Score"
        },
        {
            "title": "The Final Verdict",
            "subtitle": "Your Dev Score",
            "content": "The ultimate summary. Give them a nickname.",
            "stat": "0/100",
            "extra": "Spirit Emoji"
        }
      ]
    }
  `;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a sassy, futuristic AI. Output strictly valid JSON.",
      },
      { role: "user", content: prompt },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}
