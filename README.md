# Sassy GitHub Wrap 🤖✨

![Sassy GitHub Wrap Banner](/public/banner.png)

> **"Get roasted by a futuristic AI that judges your coding habits, tech stack, and sleep schedule."**

**Sassy GitHub Wrap** is a modern, glassmorphic web application that uses OpenAI's GPT-4o to analyze a GitHub profile and generate a "Spotify Wrapped" style experience. It mocks your tech stack, calculates your "Dev Score," and exposes your lack of social life.

---

## 🚀 Features

- **Futuristic UI**: Deep space dark mode with neon accents (Cyan/Purple/Pink) and premium glassmorphism.
- **AI Roasts**: Uses GPT-4o to generate witty, savage, and humorous commentary on your profile.
- **Deep Analysis**:
  - **Sleep Schedule**: Detects if you're a Night Owl or Early Bird based on commit timestamps.
  - **Commit Rhythm**: Judges if you code on weekends or strictly 9-5.
  - **Social Score**: Analyzes your interactions (Issues/PRs) vs. coding isolation.
- **Carousel Experience**: 5 distinct slides telling the tragic story of your developer life:
  1.  **The Identity**
  2.  **The Stack**
  3.  **The Daily Grind**
  4.  **The Social**
  5.  **The Verdict**

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4 + Framer Motion
- **AI**: OpenAI API (GPT-4o)
- **Data**: GitHub REST API (Octokit)

## 📦 Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/k1lgor/sassy-github-wrap.git
    cd sassy-github-wrap
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory:

    ```bash
    GITHUB_TOKEN=your_github_personal_access_token
    OPENAI_API_KEY=your_openai_api_key
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🚀 Deployment

### Hybrid Strategy (Vercel + GitHub Pages)

Since GitHub Pages is static and cannot host the API routes securely, we use a hybrid approach:

1.  **Backend (Vercel)**:

    - Deploy this repo to Vercel.
    - Add `GITHUB_TOKEN` and `OPENAI_API_KEY` to Vercel Project Settings.
    - This handles the `/api/analyze` route.

2.  **Frontend (GitHub Pages)**:
    - The project includes a GitHub Action (`.github/workflows/deploy.yml`) that builds the static frontend.
    - Go to your Repo Settings -> Secrets -> Actions -> Add `NEXT_PUBLIC_API_URL`.
    - Set the value to your Vercel URL (e.g., `https://your-project.vercel.app`).
    - Push to `main`, and the action will deploy the frontend to Pages.

## 📄 License

MIT © [k1lgor]
