import { Octokit } from "octokit";

if (!process.env.GITHUB_TOKEN) {
  console.warn("GITHUB_TOKEN is not defined");
}

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface GitHubStats {
  username: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  top_languages: Record<string, number>;
  total_stars: number;
  total_forks: number;
  recent_activity: string[];
  habits: {
    commit_rhythm: "Weekends" | "Weekdays" | "Everyday Slave";
    sleep_schedule: "Night Owl" | "Early Bird" | "Chaos";
    most_active_hour: number;
  };
  social: {
    issues_opened: number;
    pr_created: number;
    comments_made: number;
  };
}

export async function getGitHubStats(username: string): Promise<GitHubStats> {
  // 1. Get User Data
  const { data: user } = await octokit.rest.users.getByUsername({
    username,
  });

  // 2. Get Repos
  const { data: repos } = await octokit.rest.repos.listForUser({
    username,
    sort: "updated",
    per_page: 50,
  });

  // 3. Aggregate Languages, Stars, Forks
  const languages: Record<string, number> = {};
  let stars = 0;
  let forks = 0;

  for (const repo of repos) {
    stars += repo.stargazers_count ?? 0;
    forks += repo.forks_count ?? 0; // Check forks
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  }

  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

  // 4. Detailed Activity Analysis (100 events)
  const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
    username,
    per_page: 100,
  });

  // Social Stats
  let issues_opened = 0;
  let pr_created = 0;
  let comments_made = 0;

  // Timing Stats where 0-23
  const commit_hours: number[] = [];
  const commit_days: number[] = []; // 0=Sun, 6=Sat

  events.forEach((e) => {
    if (!e.created_at) return;
    const date = new Date(e.created_at);

    if (e.type === "PushEvent") {
      commit_hours.push(date.getHours());
      commit_days.push(date.getDay());
    }
    if (e.type === "IssuesEvent" && e.payload?.action === "opened")
      issues_opened++;
    if (e.type === "PullRequestEvent" && e.payload?.action === "opened")
      pr_created++;
    if (
      e.type === "IssueCommentEvent" ||
      e.type === "PullRequestReviewCommentEvent"
    )
      comments_made++;
  });

  // Calculate Habits
  const isWeekend = (d: number) => d === 0 || d === 6;
  const weekend_commits = commit_days.filter(isWeekend).length;
  const weekday_commits = commit_days.length - weekend_commits;

  let commit_rhythm: GitHubStats["habits"]["commit_rhythm"] = "Weekdays";
  if (weekend_commits > weekday_commits) commit_rhythm = "Weekends";
  if (weekend_commits > 10 && weekday_commits > 10)
    commit_rhythm = "Everyday Slave";

  const night_commits = commit_hours.filter((h) => h >= 22 || h < 5).length;
  const morning_commits = commit_hours.filter((h) => h >= 5 && h < 12).length;

  let sleep_schedule: GitHubStats["habits"]["sleep_schedule"] = "Chaos";
  if (night_commits > morning_commits) sleep_schedule = "Night Owl";
  if (morning_commits > night_commits) sleep_schedule = "Early Bird";

  // Recent Activity Strings (Top 5)
  const recent_activity = events
    .filter((e) =>
      ["PushEvent", "PullRequestEvent", "IssuesEvent", "CreateEvent"].includes(
        e.type || ""
      )
    )
    .slice(0, 5)
    .map((e) => {
      const repo = e.repo.name;
      if (e.type === "PushEvent") return `Pushed code to ${repo}`;
      if (e.type === "PullRequestEvent") return `Opened PR in ${repo}`;
      if (e.type === "IssuesEvent") return `Opened issue in ${repo}`;
      if (e.type === "CreateEvent") return `Created ${repo}`;
      return `Active in ${repo}`;
    });

  return {
    username: user.login,
    name: user.name || user.login,
    avatar_url: user.avatar_url,
    bio: user.bio || "No bio found",
    followers: user.followers,
    following: user.following,
    public_repos: user.public_repos,
    top_languages: sortedLanguages,
    total_stars: stars,
    total_forks: forks,
    recent_activity,
    habits: {
      commit_rhythm,
      sleep_schedule,
      most_active_hour:
        commit_hours
          .sort(
            (a, b) =>
              commit_hours.filter((v) => v === a).length -
              commit_hours.filter((v) => v === b).length
          )
          .pop() || 12,
    },
    social: {
      issues_opened,
      pr_created,
      comments_made,
    },
  };
}
