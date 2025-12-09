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

The app is optimized for deployment on **Vercel** (creators of Next.js).

1.  Push your code to a GitHub repository.
2.  Import the project into [Vercel](https://vercel.com/new).
3.  Add the required Environment Variables in the Vercel Project Settings:
    - `GITHUB_TOKEN`
    - `OPENAI_API_KEY`
4.  Click **Deploy**.

Vercel will automatically build the app and configure the API routes as serverless functions.

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

&copy; [k1lgor](https://github.com/k1lgor)
