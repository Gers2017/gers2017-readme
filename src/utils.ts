import { getStats, getUserRepos } from "src/fetch";
import { defaultTheme, themes } from "src/colors";

export class ParamError extends Error {
  constructor(param: string) {
    let message = `Missing parameter "${param}"`;
    super(message);
  }
}

export function clamp(value: number, min: number, max: number) {
  if (value <= min) value = min;
  if (value >= max) value = max;
  return value;
}

export async function getMostUsedLanguage(username: string) {
  const userRepos = await getUserRepos(username);

  const { nodes } = userRepos.data.user.repositories;

  const langsMap = nodes
    .filter((node) => Boolean(node.primaryLanguage))
    .reduce((map, node) => {
      const { name } = node.primaryLanguage;

      if (map[name]) {
        map[name] += 1;
      } else {
        map[name] = 1;
      }

      return map;
    }, {});

  const tuples: [string, number][] = Object.keys(langsMap).map((key) => [
    key,
    langsMap[key],
  ]);
  const sorted = tuples.sort((a, b) => b[1] - a[1]);
  const [language] = sorted[0];
  return language;
}

export async function getGithubStatsForCard(username: string) {
  const stats = await getStats(username);
  const user = stats.data.user;

  return {
    totalCommits:
      user.contributionsCollection.totalCommitContributions +
      user.contributionsCollection.restrictedContributionsCount,
    totalIssues: user.contributionsCollection.totalIssueContributions,
    totalPRs: user.pullRequests.totalCount,
    contributedTo: user.repositoriesContributedTo.totalCount,
  };
}

const languageExtensions: Record<string, string> = {
  typescript: "ts",
  javascript: "js",
  rust: "rs",
  haskell: "hs",
  elixir: "ex",
  julia: "jl",
};

export function getLanguageExtension(language: string) {
  if (language in languageExtensions) {
    return languageExtensions[language].toUpperCase();
  }
  return language.slice(0, 2).toUpperCase();
}

export function getTheme(themeName: string) {
  if (!(themeName in themes)) return defaultTheme;
  return themes[themeName];
}
